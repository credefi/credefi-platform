import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginPage } from './component';
import { LoginComponentModule } from 'src/app/shared/login-component';
import { LanguageResolver } from 'src/app/resolvers';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ 
      path: '', 
      component: LoginPage,
      data: {
        languagePath: 'authentication/login'
      },
      resolve: {
        translations: LanguageResolver
      },
    }]),
    LoginComponentModule
  ]
})

export class LoginModule { }
