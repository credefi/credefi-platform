import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';

import { WalletDashboardComponent } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { LanguageResolver } from 'src/app/resolvers';

@NgModule({
  declarations: [
    WalletDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: WalletDashboardComponent,
      data: {
        languagePath: 'profile/wallet/dashboard'
      },
      resolve: {
        translations: LanguageResolver
      },
      children: [
        {
          path: '',
          redirectTo: 'info',
          pathMatch: 'full'
        },
        {
          path: 'info',
          loadChildren: () => import('./info').then(m => m.InfoModule),
          data: {
            preload: true
          },
        },
        {
          path: 'transactions',
          loadChildren: () => import('./transactions').then(m => m.TransactionsModule),
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

export class WalletModule { }
