import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { passwordMatchValidator } from 'src/app/helpers/passwordConfirmValidator';
import { strongPasswordValidator } from 'src/app/helpers/strongPasswordValidator';
import { BasicUser } from 'src/app/model';
import { FileApiProvider } from 'src/app/profile/providers';
import { AuthneticatorCodeDialog } from 'src/app/profile/shared/authneticator-code-dialog/component';
import { AuthneticatorDialog } from 'src/app/profile/shared/authneticator-dialog/component';
import { MapProvider, UserProvider } from 'src/app/providers';
import { ConfirmDialog } from 'src/app/shared/confirm-dialog';

@Component({
  selector: 'security-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})

export class SecurityComponent {

  user = this.mapProvider.get(MapProvider.USER);
  isSubmit = false;
  translations: { [key: string]: string | Function | any } = this.activateRoute.snapshot.data.translations;

  form = new UntypedFormGroup({
    currentPassword: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(255)
    ]),
    password: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(255),
      strongPasswordValidator
    ]),
    passwordConfirm: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(255)
    ]),
  }, passwordMatchValidator('password', 'passwordConfirm'));

  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;

  constructor(
    private MatDialog: MatDialog,
    private mapProvider: MapProvider,
    private UserProvider: UserProvider,
    private activateRoute: ActivatedRoute,
    private FileApiProvider: FileApiProvider,
    private ChangeDetectorRef: ChangeDetectorRef
  ) { }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmit = true;
      this.ChangeDetectorRef.markForCheck();
      this.UserProvider.updatePassword(this.form.value).subscribe(({ result, errors }) => {
        this.isSubmit = false;

        if (errors) {
          for (let key in errors) {
            const parsedErrors = errors[key].map((item: string) => {
              return this.translations[item];
            });
            this.form.controls[key].setErrors({ 'incorrect': parsedErrors });
          }
        }

        if (result) {
          this.formDirective.resetForm();

          for (let key in this.form.controls) {
            const control = this.form.controls[key];
            control.setErrors(null);
          }
          this.MatDialog.open(ConfirmDialog, {
            autoFocus: false,
            scrollStrategy: new NoopScrollStrategy(),
            data: {
              title: this.translations['dialog-title'],
              message: this.translations['dialog-message'],
              buttons: [
                {
                  label: this.translations['dialog-accept']
                }
              ]
            }
          });
        }

        return this.ChangeDetectorRef.markForCheck();

      });
    }
  }

  openAuthneticatorDialog() {

    this.FileApiProvider.get('user/qrcode').subscribe((data) => {
      this.MatDialog.open(AuthneticatorDialog, {
        autoFocus: false,
        scrollStrategy: new NoopScrollStrategy(),
        data: {
          translations: this.activateRoute.snapshot.data.sharedTranslations.authneticatorDialog,
          qrCode: data
        }
      }).afterClosed().subscribe((code) => {
        if (code) {
          this.MatDialog.open(AuthneticatorCodeDialog, {
            autoFocus: false,
            scrollStrategy: new NoopScrollStrategy(),
            data: {
              translations: this.activateRoute.snapshot.data.sharedTranslations.authneticatorCodeDialog,
              code: code
            }
          }).afterClosed().subscribe(() => {
            this.user.gaEnabled = true;
            this.mapProvider.set(MapProvider.USER, new BasicUser(this.user));
            this.ChangeDetectorRef.markForCheck();
          });
        }
      });
    })

  }

  disable2fa() {
    this.MatDialog.open(ConfirmDialog, {
      autoFocus: false,
      scrollStrategy: new NoopScrollStrategy(),
      data: {
        title: this.translations['dialog-deactivate-title'],
        message: this.translations['dialog-deactivate-message'],
        buttons: [
          {
            label: this.translations['dialog-deactivate-cancel']
          },
          {
            label: this.translations['dialog-deactivate-accept'],
            handler: () => {
              this.UserProvider.gaDeactivate().subscribe(({result}) => {
                if(result){
                  this.user.gaEnabled = false;
                  this.mapProvider.set(MapProvider.USER, new BasicUser(this.user));
                  this.ChangeDetectorRef.markForCheck();
                }
              });
            }
          }
        ]
      }
    });
  }

}
