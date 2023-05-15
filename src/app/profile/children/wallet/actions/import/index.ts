import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';

import { WalletImportComponent } from './component';
import { LanguageResolver, SharedLanguageResolver } from 'src/app/resolvers';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { ImportPrivateKeyDialogModule } from 'src/app/profile/shared/import-privatekey-dialog';
import { ExistingAccountDialogModule } from 'src/app/profile/shared/existing-account-dialog';

@NgModule({
  declarations: [
    WalletImportComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: WalletImportComponent,
      data: {
        languagePath: 'profile/wallet/actions/import',
        sharedLanguagePaths: {
          walletComponent: 'shared/wallet-component',
          importPrivateKeyDialog: 'shared/import-privatekey-dialog',
          existingKeyDialog: 'shared/existing-account-dialog',
        }
      },
      resolve: {
        translations: LanguageResolver,
        sharedTranslations: SharedLanguageResolver
      },
    }]),
    LazyImageModule,
    MatRippleModule,
    MatDialogModule,
    ImportPrivateKeyDialogModule,
    ExistingAccountDialogModule
  ]
})

export class WalletImportModule { }
