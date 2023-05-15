import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoansLentPortfolioComponent } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { LanguageResolver } from 'src/app/resolvers';
import { LendingsResolver } from 'src/app/profile/resolvers';
import { VirtualScrollerModule } from 'src/app/modules/virtual-scroll';

@NgModule({
  declarations: [
    LoansLentPortfolioComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: LoansLentPortfolioComponent,
      data: {
        languagePath: 'profile/loans/lent/portfolio'
      },
      resolve: {
        translations: LanguageResolver,
        list: LendingsResolver
      },
    }]),
    LazyImageModule,
    VirtualScrollerModule
  ]
})

export class LoansLentPortfolioModule { }
