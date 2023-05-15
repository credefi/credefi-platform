import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { UserProvider } from '../../providers';
import { validateEmail } from 'src/app/helpers/emailValidator';
import { ConfirmDialog } from '../confirm-dialog/component';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { Environment } from 'src/globals/config';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'login-component',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginComponent implements OnInit{

  api_url = this.sanitizer.bypassSecurityTrustResourceUrl(Environment.api_url);
  isSubmit = false;

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

  @Output('login') login = new EventEmitter();
  translations: { [key: string]: string | Function | any } = this.ActivatedRoute.snapshot.data.translations;

  constructor(
    private dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private UserProvider: UserProvider,
    private ActivatedRoute: ActivatedRoute,
    private ChangeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(){
    const { url } = this.ActivatedRoute.snapshot.queryParams;

    if(url){
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
          return this.ChangeDetectorRef.markForCheck();
        }

        this.login.emit(result);

      });
    }
  }

  trackByKey(index: number, item: IObjectKeys) {
    return item.key;
  }

}
