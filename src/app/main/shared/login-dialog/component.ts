import { Component, ChangeDetectionStrategy, Inject, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { validateEmail } from 'src/app/helpers/emailValidator';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { UserProvider } from 'src/app/providers';
import { ConfirmDialog } from 'src/app/shared/confirm-dialog';
import { Environment } from 'src/globals/config';

@Component({
  selector: 'login-dialog',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginDialog implements OnDestroy {

  isSubmit = false;
  api_url = Environment.api_url;
  translations: { [key: string]: string | Function | any } = this.data.translations;

  form = new UntypedFormGroup({
    email: new UntypedFormControl('', [
      Validators.required,
      Validators.maxLength(255),
      validateEmail,
    ]),
    password: new UntypedFormControl('', [
      Validators.required,
      Validators.maxLength(255),
      Validators.minLength(6)
    ])
  });

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private change: ChangeDetectorRef,
    private UserProvider: UserProvider,
    private activatedRoute: ActivatedRoute,
    private MatDialogRef: MatDialogRef<LoginDialog>,
    @Inject(MAT_DIALOG_DATA) private data: IObjectKeys
  ) { }

  ngOnDestroy() {
    const { url } = this.activatedRoute.snapshot.queryParams;
    this.router.navigate(['.'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        url
      }
    })
  }

  ngOnInit() {
    const { url } = this.activatedRoute.snapshot.queryParams;

    if (url) {
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
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmit = true;
      this.UserProvider.authenticate(this.form.value).subscribe(({ result, errors }) => {
        this.isSubmit = false;

        if (errors) {
          for (let key in errors) {
            const parsedErrors = errors[key].map((item: string) => {
              return this.translations[item];
            })
            this.form.controls[key].setErrors({ 'incorrect': parsedErrors });
          }
          return this.change.markForCheck();
        }

        this.close();

      });
    }
  }

  openValidation(){
    
  }

  close() {
    this.MatDialogRef.close();
  }

}
