import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoansLentComponent } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { LanguageResolver } from 'src/app/resolvers';

@NgModule({
  declarations: [
    LoansLentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: LoansLentComponent,
      data: {
        languagePath: 'profile/loans/lent'
      },
      resolve: {
        translations: LanguageResolver,
      },
      children: [
        {
          path: '',
          redirectTo: 'portfolio',
          pathMatch: 'full'
        },
        {
          path: 'portfolio',
          loadChildren: () => import('./portfolio').then(m => m.LoansLentPortfolioModule),
          data: {
            preload: true
          },
        }
      ]
    }]),
    LazyImageModule
  ]
})

export class LoansLentModule { }
