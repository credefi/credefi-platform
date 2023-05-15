import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { AuthenticationProvider } from '../providers';
import { ConfirmDialog } from 'src/app/shared/confirm-dialog/component';

@Component({
  selector: 'authentication-activation-page',
  templateUrl: './index.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AuthenticationActivationPage implements OnInit {

  translations: { [key: string]: string | Function | any } = this.active.snapshot.data.translations;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private active: ActivatedRoute,
    private AuthenticationProvider: AuthenticationProvider,
  ) { }

  ngOnInit() {

    const { token } = this.active.snapshot.params;

    this.AuthenticationProvider.postActivation(token).subscribe(({ result, error }) => {

      if (error) {
        console.log(error)
        this.dialog.open(ConfirmDialog, {
          autoFocus: false,
          data: {
            title: this.translations['error-title'],
            message: this.translations[(error as string)],
            buttons: [
              {
                label: this.translations['error-accept']
              }
            ]
          }
        });

      }

      if (result) {
        this.dialog.open(ConfirmDialog, {
          autoFocus: false,
          data: {
            title: this.translations['hello'],
            message: this.translations['success'],
            buttons: [
              {
                label: this.translations['accept']
              }
            ]
          }
        });
      }

      this.router.navigateByUrl('/');
      return false;

    });
  }

}
