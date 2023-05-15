import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardLendComponent } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { LanguageResolver } from 'src/app/resolvers';
import { ErrorComponentModule } from 'src/app/profile/shared/error-component';
import { AccountsResolver, ConfigurationResolver, LendingStatusResolver, NextPaymentResolver, PaymentStatusResolver, TVLResolver } from 'src/app/profile/resolvers';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    DashboardLendComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: DashboardLendComponent,
      data: {
        languagePath: 'profile/dashboard/lend'
      },
      resolve: {
        translations: LanguageResolver,
        status: LendingStatusResolver,
        accounts: AccountsResolver,
        next: NextPaymentResolver,
        configuration: ConfigurationResolver,
        userStatus: PaymentStatusResolver,
        tvl: TVLResolver
      },
      children: [
        {
          path: 'referral',
          loadChildren: () => import('../../../shared/referral-dialog').then(m => m.ReferralDialogModule),
          data: {
            preload: true
          },
        },
      ]
    }]),
    LazyImageModule,
    ErrorComponentModule,
    MatTooltipModule
  ],
  providers: [
    DecimalPipe
  ]
})

export class DashboardLendModule { }
