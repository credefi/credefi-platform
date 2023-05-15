import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { AuthenticationProvider } from '../providers';
import { ConfirmDialog } from 'src/app/shared/confirm-dialog/component';
import { IObjectKeys } from 'src/app/helpers/interfaces';

@Component({
  selector: 'Authentication-facebook-page',
  templateUrl: './index.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AuthenticationFacebookPage implements OnInit {

  readonly state = 'application'
  translations: { [key: string]: string | Function | any } = this.active.snapshot.data.translations;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private active: ActivatedRoute,
    private AuthenticationProvider: AuthenticationProvider,
  ) { }

  ngOnInit() {

    const { code } = this.active.snapshot.queryParams;

    const params: { [key: string]: any } = this.parseState(this.active.snapshot.queryParams.state);

    if (params.param != this.state) {
      this.alert();
      return false;
    }

    return this.AuthenticationProvider.facebookAuth(code).then(({ result }) => {

      if (params.redirect) {
        return this.router.navigateByUrl(params.redirect);
      }

      this.router.navigateByUrl('/'); 

      return false;

    }).catch((e) => {
      this.alert();
      return false;
    });
  }

  alert() {
    this.dialog.open(ConfirmDialog, {
      autoFocus: false,
      data: {
        title: this.translations['error-title'],
        message: this.translations['error-message'],
        buttons: [
          {
            label: this.translations['error-accept']
          }
        ]
      }
    });
    this.router.navigateByUrl('/authentication/registration');
  }

  parseState(state: String) {
    return state.split(',').reduce((accumulator: IObjectKeys, currentValue) => {
      const data = currentValue.split('==');
      accumulator[data[0]] = data[1];
      return accumulator;
    }, {});
  }

}
