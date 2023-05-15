import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoansBorrowComponent } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { LanguageResolver } from 'src/app/resolvers';

@NgModule({
  declarations: [
    LoansBorrowComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: LoansBorrowComponent,
      data: {
        languagePath: 'profile/loans/borrow'
      },
      resolve: {
        translations: LanguageResolver,
      },
      children: [
        {
          path: '',
          redirectTo: 'active',
          pathMatch: 'full'
        },
        {
          path: 'active',
          loadChildren: () => import('./active').then(m => m.LoansBorrowActiveModule),
          data: {
            preload: true
          },
        }
      ]
    }]),
    LazyImageModule
  ]
})

export class LoansBorrowModule { }
