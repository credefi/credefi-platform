import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { IObjectKeys } from 'src/app/helpers/interfaces';

@Component({
  selector: 'login-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginPage {

  constructor(private Router: Router) { }

  onSubmit(data: IObjectKeys) {
    if(data.gaEnabled){
      return this.Router.navigate(['/authentication/2fa'], {
        queryParamsHandling: 'merge'
      });
    }
    return this.Router.navigate(['/authentication/token'], {
      queryParamsHandling: 'merge'
    });
  }

}
