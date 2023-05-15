import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';

import { TransactionsComponent } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { LanguageResolver } from 'src/app/resolvers';
import { ErrorComponentModule } from 'src/app/profile/shared/error-component';
import { TransactionsResolver } from 'src/app/profile/resolvers';
import { CopyModule } from 'src/app/directives/copy';
import { VirtualScrollerModule } from 'src/app/modules/virtual-scroll';

@NgModule({
  declarations: [
    TransactionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: TransactionsComponent,
      data: {
        languagePath: 'profile/wallet/dashboard/transactions'
      },
      resolve: {
        translations: LanguageResolver,
        transactions: TransactionsResolver,
      },
    }]),
    LazyImageModule,
    MatRippleModule,
    ErrorComponentModule,
    CopyModule,
    VirtualScrollerModule
  ]
})

export class TransactionsModule { }
