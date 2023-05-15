import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { UserProvider } from '../../providers';
import { ConfirmDialog } from '../confirm-dialog/component';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { Environment } from 'src/globals/config';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'reset-password-component',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ResetPasswordComponent {

  api_url = this.sanitizer.bypassSecurityTrustResourceUrl(Environment.api_url);
  isSubmit = false;

  form = new UntypedFormGroup({
    password: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(255)
    ]),
    passwordConfirm: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(255)
    ])
  });

  translations: { [key: string]: string | Function | any } = this.ActivatedRoute.snapshot.data.translations;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private UserProvider: UserProvider,
    private ActivatedRoute: ActivatedRoute,
    private ChangeDetectorRef: ChangeDetectorRef,
  ) { }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmit = true;

      const { password } = this.form.value;
      const { token } = this.ActivatedRoute.snapshot.params;

      this.UserProvider.changePassword({
        password,
        token
      }).subscribe(({ result, errors }) => {
        this.isSubmit = false;

        if (errors) {
          for (let key in errors) {
            const parsedErrors = errors[key].map((item: string) => {
              return this.translations[item];
            })
            this.form.controls[key].setErrors({ 'incorrect': parsedErrors });
          }
        }

        if (result) {
          this.form.reset();

          for (let key in this.form.controls) {
            const control = this.form.controls[key];
            control.setErrors(null);
          }

          this.dialog.open(ConfirmDialog, {
            autoFocus: false,
            data: {
              title: this.translations['dialog-title'],
              message: this.translations['dialog-message'],
              buttons: [
                {
                  label: this.translations['dialog-accept']
                }
              ]
            }
          }).afterClosed().subscribe(() => {
            this.router.navigateByUrl('/authentication/login');
          });
        }

        return this.ChangeDetectorRef.markForCheck();

      });
    }
  }

  trackByKey(index: number, item: IObjectKeys) {
    return item.key;
  }

}
