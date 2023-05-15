import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UserProvider } from '../../providers';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { Environment } from 'src/globals/config';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'authenticate-component',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AuthenticateComponent{

  api_url = this.sanitizer.bypassSecurityTrustResourceUrl(Environment.api_url);
  isSubmit = false;

  form = new UntypedFormGroup({
    token: new UntypedFormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
  });

  @Output('login') login = new EventEmitter();
  translations: { [key: string]: string | Function | any } = this.ActivatedRoute.snapshot.data.translations;

  constructor(
    private Router: Router,
    private sanitizer: DomSanitizer,
    private UserProvider: UserProvider,
    private ActivatedRoute: ActivatedRoute,
    private ChangeDetectorRef: ChangeDetectorRef,
  ) { }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmit = true;
      this.UserProvider.validateToken(this.form.value).subscribe(({ result, errors }) => {
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

        const { user } = result;
        const { url } = this.ActivatedRoute.snapshot.queryParams;

        if (url) {
          return this.Router.navigateByUrl(url);
        }

        return this.login.emit(user);

      });
    }
  }

  trackByKey(index: number, item: IObjectKeys) {
    return item.key;
  }

}
