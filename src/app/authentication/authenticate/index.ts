import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthenticatePage } from './component';
import { AuthenticateComponentModule } from 'src/app/shared/authenticate-component';
import { LanguageResolver } from 'src/app/resolvers';

@NgModule({
  declarations: [
    AuthenticatePage,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ 
      path: '', 
      component: AuthenticatePage,
      data: {
        languagePath: 'authentication/authenticate'
      },
      resolve: {
        translations: LanguageResolver
      },
    }]),
    AuthenticateComponentModule
  ]
})

export class LoginModule { }
