import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SecurityComponent } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { LanguageResolver, SharedLanguageResolver } from 'src/app/resolvers';
import { ErrorComponentModule } from 'src/app/profile/shared/error-component';
import { ConfirmDialogModule } from 'src/app/shared/confirm-dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserMenuComponentModule } from 'src/app/profile/shared/user-menu';
import { InputModule } from 'src/app/shared/input-component';
import { MatRippleModule } from '@angular/material/core';
import { SafeHTMLModule } from 'src/app/pipes/safe-html';
import { AuthneticatorDialogModule } from 'src/app/profile/shared/authneticator-dialog';
import { AuthneticatorCodeDialogModule } from 'src/app/profile/shared/authneticator-code-dialog';

@NgModule({
  declarations: [
    SecurityComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{
      path: '',
      component: SecurityComponent,
      data: {
        languagePath: 'profile/information/security',
        sharedLanguagePaths: {
          userMenu: 'shared/user-menu',
          authneticatorDialog: 'shared/authneticator-dialog',
          authneticatorCodeDialog: 'shared/authneticator-code-dialog',
        }
      },
      resolve: {
        translations: LanguageResolver,
        sharedTranslations: SharedLanguageResolver
      },
    }]),
    LazyImageModule,
    ErrorComponentModule,
    ConfirmDialogModule,
    MatDialogModule,
    MatButtonModule,
    UserMenuComponentModule,
    InputModule,
    MatRippleModule,
    SafeHTMLModule,
    AuthneticatorDialogModule,
    AuthneticatorCodeDialogModule
  ]
})

export class SecurityModule { }
