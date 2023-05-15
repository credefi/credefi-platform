import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ForgottenPasswordPage } from './component';
import { ForgottenPasswordModule } from 'src/app/shared/forgotten-password';
import { LanguageResolver } from 'src/app/resolvers';

@NgModule({
  declarations: [
    ForgottenPasswordPage,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ 
      path: '', 
      component: ForgottenPasswordPage,
      data: {
        languagePath: 'authentication/forgotten-password'
      },
      resolve: {
        translations: LanguageResolver
      },
    }]),
    ForgottenPasswordModule
  ]
})

export class ForgottenPasswordPageModule { }
