import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { UserProvider } from 'src/app/providers';
import { ConfirmDialog } from 'src/app/shared/confirm-dialog/component';
import { validateEmail } from 'src/app/helpers/emailValidator';
import { passwordMatchValidator } from 'src/app/helpers/passwordConfirmValidator';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { Environment } from 'src/globals/config';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'registration-component',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RegistrationComponent {

  isSubmit = false;
  site = Environment.api_url;
  api_url = this.sanitizer.bypassSecurityTrustResourceUrl(Environment.api_url);

  form = new UntypedFormGroup({
    email: new UntypedFormControl('', [
      Validators.required,
      Validators.maxLength(255),
      validateEmail
    ]),
    password: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(255)
    ]),
    passwordConfirm: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(255)
    ]),
    terms: new UntypedFormControl(false, [
      Validators.requiredTrue
    ]),
    policy: new UntypedFormControl(false, [
      Validators.requiredTrue
    ]),
  }, passwordMatchValidator('password', 'passwordConfirm'));

  translations: { [key: string]: string | Function | any } = this.ActivatedRoute.snapshot.data.translations;

  constructor(
    private MatDialog: MatDialog,
    private sanitizer: DomSanitizer,
    private UserProvider: UserProvider,
    private ActivatedRoute: ActivatedRoute,
    private ChangeDetectorRef: ChangeDetectorRef
  ) { }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmit = true;
      this.ChangeDetectorRef.markForCheck();
      this.UserProvider.post(this.form.value).subscribe(({ result, errors }) => {
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
          this.MatDialog.open(ConfirmDialog, {
            autoFocus: false,
            data: {
              title: this.translations['hello'],
              message: this.translations['hello-message'],
              buttons: [
                {
                  label: this.translations['hello-accept']
                }
              ]
            }
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
