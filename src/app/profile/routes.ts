import { Route } from '@angular/router';
import { LanguageResolver } from '../resolvers';

import { ProfilePage } from './component';
import { AuthGuard } from './guards';

export const MODULE_ROUTES: Route[] = [
  {
    path: '',
    component: ProfilePage,
    data: {
      languagePath: 'profile'
    },
    resolve: {
      translations: LanguageResolver
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./children/dashboard').then(m => m.DashboardModule),
        data: {
          preload: true
        },
      },
      {
        path: 'lend',
        loadChildren: () => import('./children/lend').then(m => m.LendModule),
        data: {
          preload: true
        },
      },
      {
        path: 'borrow',
        loadChildren: () => import('./children/borrow').then(m => m.BorrowModule),
        data: {
          preload: true
        },
      },
      {
        path: 'module-x',
        loadChildren: () => import('./children/modulex').then(m => m.ModuleXModule),
        data: {
          preload: true
        },
      },
      {
        path: 'loans',
        loadChildren: () => import('./children/loans').then(m => m.LoansModule),
        data: {
          preload: true
        },
      },
      {
        path: 'wallet',
        loadChildren: () => import('./children/wallet').then(m => m.WalletModule),
        data: {
          preload: true
        },
      },
      {
        path: 'information',
        loadChildren: () => import('./children/profile').then(m => m.ProfileModule),
        data: {
          preload: true
        },
      },
      {
        path: 'help',
        loadChildren: () => import('./children/help').then(m => m.HelpModule),
        data: {
          preload: true
        },
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
    ]
  }
];

export const MODULE_COMPONENTS = [
  ProfilePage
];
