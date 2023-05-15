import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'
import { MatRippleModule } from '@angular/material/core';

import { InputModule } from 'src/app/shared/input-component';
import { ReferralDialogEntryComponent } from './entry';
import { RouterModule } from '@angular/router';
import { SharedLanguageResolver } from 'src/app/resolvers';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReferralDialog } from './component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfigurationResolver } from '../../resolvers';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: ReferralDialogEntryComponent,
      resolve: {
        sharedTranslations: SharedLanguageResolver,
        configuration: ConfigurationResolver
      },
      data: {
        sharedLanguagePaths: {
          referralDialog: 'shared/referral-dialog'
        }
      },
    }]),
    MatButtonModule,
    InputModule,
    MatRippleModule,
    LazyImageModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  declarations: [
    ReferralDialog,
    ReferralDialogEntryComponent
  ]
})

class ReferralDialogModule { }

export {
  ReferralDialogModule
}