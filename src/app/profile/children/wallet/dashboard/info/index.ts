import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';

import { InfoComponent } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { LanguageResolver, SharedLanguageResolver } from 'src/app/resolvers';
import { AccountsResolver } from 'src/app/profile/resolvers';
import { WalletModule } from '../../../../shared/wallet-component';
import { ErrorComponentModule } from 'src/app/profile/shared/error-component';
import { VirtualScrollerModule } from 'src/app/modules/virtual-scroll';

@NgModule({
  declarations: [
    InfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: InfoComponent,
      data: {
        languagePath: 'profile/wallet/dashboard/info',
        sharedLanguagePaths: {
          walletComponent: 'shared/wallet-component',
          keyStoreDialog: 'shared/keystore-dialog',
          privateKeyDialog: 'shared/private-key-dialog',
          sendDialog: 'shared/send-dialog'
        }
      },
      resolve: {
        translations: LanguageResolver,
        accounts: AccountsResolver,
        sharedTranslations: SharedLanguageResolver
      },
    }]),
    LazyImageModule,
    MatRippleModule,
    WalletModule,
    ErrorComponentModule,
    VirtualScrollerModule
  ]
})

export class InfoModule { }
