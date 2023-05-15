import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';

import { WalletComponent } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { LanguageResolver, SharedLanguageResolver } from 'src/app/resolvers';
import { UserMenuComponentModule } from '../../shared/user-menu';

@NgModule({
  declarations: [
    WalletComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: WalletComponent,
      data: {
        languagePath: 'profile/wallet',
        sharedLanguagePaths: {
          userMenu: 'shared/user-menu'
        }
      },
      resolve: {
        translations: LanguageResolver,
        sharedTranslations: SharedLanguageResolver,
      },
      children: [
        {
          path: '',
          loadChildren: () => import('./dashboard').then(m => m.WalletModule),
          data: {
            preload: true
          },
        },
        {
          path: 'actions',
          loadChildren: () => import('./actions').then(m => m.WalletActionsModule),
          data: {
            preload: true
          },
        },
      ]
    }]),
    LazyImageModule,
    MatRippleModule,
    UserMenuComponentModule
  ]
})

export class WalletModule { }
