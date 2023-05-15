import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardBorrowComponent } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { LanguageResolver } from 'src/app/resolvers';
import { ErrorComponentModule } from 'src/app/profile/shared/error-component';

@NgModule({
  declarations: [
    DashboardBorrowComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: DashboardBorrowComponent,
      data: {
        languagePath: 'profile/dashboard/borrow'
      },
      resolve: {
        translations: LanguageResolver,
      },
    }]),
    LazyImageModule,
    ErrorComponentModule
  ]
})

export class DashboardBorrowModule { }
