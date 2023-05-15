import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';

import { WalletActionComponent } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { LanguageResolver } from 'src/app/resolvers';

@NgModule({
  declarations: [
    WalletActionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: WalletActionComponent,
      data: {
        languagePath: 'profile/wallet/actions'
      },
      resolve: {
        translations: LanguageResolver,
      },
      children: [
        {
          path: '',
          redirectTo: 'create',
          pathMatch: 'full'
        },
        {
          path: 'create',
          loadChildren: () => import('./create').then(m => m.WalletCreateModule),
          data: {
            preload: true
          },
        },
        {
          path: 'import',
          loadChildren: () => import('./import').then(m => m.WalletImportModule),
          data: {
            preload: true
          },
        },
      ]
    }]),
    LazyImageModule,
    MatRippleModule
  ]
})

export class WalletActionsModule { }
