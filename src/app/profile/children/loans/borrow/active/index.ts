import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoansBorrowActiveComponent } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { LanguageResolver } from 'src/app/resolvers';
import { LoansResolver } from 'src/app/profile/resolvers';

@NgModule({
  declarations: [
    LoansBorrowActiveComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: LoansBorrowActiveComponent,
      data: {
        languagePath: 'profile/loans/borrow/active'
      },
      resolve: {
        translations: LanguageResolver,
        list: LoansResolver
      },
    }]),
    LazyImageModule
  ]
})

export class LoansBorrowActiveModule { }
