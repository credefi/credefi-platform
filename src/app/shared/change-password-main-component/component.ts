import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { UserProvider } from 'src/app/providers';
import { ConfirmDialog } from 'src/app/shared/confirm-dialog/component';
import { passwordMatchValidator } from 'src/app/helpers/passwordConfirmValidator';

@Component({
  selector: 'change-password-component',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ChangePasswordComponent {

  isSubmit = false;

  form = new UntypedFormGroup({
    currentPassword: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(255)
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
  }, passwordMatchValidator('password', 'passwordConfirm'));

  translations: { [key: string]: string | Function | any } = this.ActivatedRoute.snapshot.data.translations;

  constructor(
    private MatDialog: MatDialog,
    private UserProvider: UserProvider,
    private ActivatedRoute: ActivatedRoute,
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
          this.form.reset();
          for (let key in this.form.controls) {
            const control = this.form.controls[key];
            control.setErrors(null);
          }
          this.MatDialog.open(ConfirmDialog, {
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
          });
        }

        return this.ChangeDetectorRef.markForCheck();

      });
    }
  }

}
