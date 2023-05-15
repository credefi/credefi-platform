import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

import { AuthenticationActivationPage } from './component';
import { LanguageResolver } from 'src/app/resolvers';
import { ConfirmDialogModule } from 'src/app/shared/confirm-dialog';

@NgModule({
  declarations: [
    AuthenticationActivationPage,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ 
      path: '', 
      component: AuthenticationActivationPage,
      data: {
        languagePath: 'authentication/activation'
      },
      resolve: {
        translations: LanguageResolver
      },
    }]),
    MatDialogModule,
    ConfirmDialogModule
  ]
})

export class AuthenticationActivationModule { }
