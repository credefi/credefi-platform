import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { IObjectKeys } from 'src/app/helpers/interfaces';

@Component({
  selector: 'authenticate-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AuthenticatePage {

  constructor(private Router: Router){}
  
  onSubmit(user: IObjectKeys){
    return this.Router.navigateByUrl('/profile');
  }

}
