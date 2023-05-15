import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

import { AuthenticationGooglePage } from './component';
import { LanguageResolver } from 'src/app/resolvers';
import { ConfirmDialogModule } from 'src/app/shared/confirm-dialog';

@NgModule({
  declarations: [
    AuthenticationGooglePage,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ 
      path: '', 
      component: AuthenticationGooglePage,
      data: {
        languagePath: 'authentication/google'
      },
      resolve: {
        translations: LanguageResolver
      },
    }]),
    MatDialogModule,
    ConfirmDialogModule
  ]
})

export class AuthenticationGoogleModule { }
