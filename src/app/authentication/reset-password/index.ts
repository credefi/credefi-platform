import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ResetPasswordPage } from './component';
import { ResetPasswordModule } from 'src/app/shared/reset-password';
import { LanguageResolver } from 'src/app/resolvers';

@NgModule({
  declarations: [
    ResetPasswordPage,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ 
      path: '', 
      component: ResetPasswordPage,
      data: {
        languagePath: 'authentication/reset-password'
      },
      resolve: {
        translations: LanguageResolver
      },
    }]),
    ResetPasswordModule
  ]
})

export class ResetPasswordPageModule { }
