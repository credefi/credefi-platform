import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';

import { DashboardComponent } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { LanguageResolver, SharedLanguageResolver } from 'src/app/resolvers';
import { UserMenuComponentModule } from '../../shared/user-menu';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: DashboardComponent,
      data: {
        languagePath: 'profile/dashboard',
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
          redirectTo: 'lend',
          pathMatch: 'full'
        },
        {
          path: 'lend',
          loadChildren: () => import('./lend').then(m => m.DashboardLendModule),
          data: {
            preload: true
          },
        },
        {
          path: 'borrow',
          loadChildren: () => import('./borrow').then(m => m.DashboardBorrowModule),
          data: {
            preload: true
          },
        },
        {
          path: 'stake',
          loadChildren: () => import('./stake').then(m => m.DashboardStakeModule),
          data: {
            preload: true
          },
        },
      ]
    }]),
    LazyImageModule,
    MatRippleModule,
    UserMenuComponentModule
  ]
})

export class DashboardModule { }
