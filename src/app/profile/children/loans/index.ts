import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';

import { LoansComponent } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { LanguageResolver, SharedLanguageResolver } from 'src/app/resolvers';
import { UserMenuComponentModule } from '../../shared/user-menu';

@NgModule({
  declarations: [
    LoansComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: LoansComponent,
      data: {
        languagePath: 'profile/loans',
        sharedLanguagePaths: {
          userMenu: 'shared/user-menu'
        }
      },
      resolve: {
        translations: LanguageResolver,
        sharedTranslations: SharedLanguageResolver
      },
      children: [
        {
          path: '',
          loadChildren: () => import('./actions').then(m => m.LoansActionsModule),
          data: {
            preload: true
          },
        },
        {
          path: 'borrow',
          loadChildren: () => import('./borrow').then(m => m.LoansBorrowModule),
          data: {
            preload: true
          },
        },
        {
          path: 'lent',
          loadChildren: () => import('./lent').then(m => m.LoansLentModule),
          data: {
            preload: true
          },
        }
      ]
    }]),
    LazyImageModule,
    MatRippleModule,
    UserMenuComponentModule
  ]
})

export class LoansModule { }
