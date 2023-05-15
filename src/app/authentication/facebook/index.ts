import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

import { AuthenticationFacebookPage } from './component';
import { LanguageResolver } from 'src/app/resolvers';
import { ConfirmDialogModule } from 'src/app/shared/confirm-dialog';

@NgModule({
  declarations: [
    AuthenticationFacebookPage,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ 
      path: '', 
      component: AuthenticationFacebookPage,
      data: {
        languagePath: 'authentication/facebook'
      },
      resolve: {
        translations: LanguageResolver
      },
    }]),
    MatDialogModule,
    ConfirmDialogModule
  ]
})

export class AuthenticationFacebookModule { }
