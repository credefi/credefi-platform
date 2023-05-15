import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ChangePasswordPage } from './component';
import { LanguageResolver } from 'src/app/resolvers';
import { ChangePasswordModule } from 'src/app/shared/change-password-component'

@NgModule({
  declarations: [
    ChangePasswordPage,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: ChangePasswordPage,
      data: {
        languagePath: 'admin/panel/change-password'
      },
      resolve: {
        translations: LanguageResolver
      },
    }]),
    ChangePasswordModule
  ],
})

export class ChangePasswordPageModule { }
