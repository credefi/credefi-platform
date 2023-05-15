import { Route } from '@angular/router';
import { AdminPanelPage } from './component';
import { LanguageResolver } from 'src/app/resolvers';
import { ConfigurationResolver } from './resolvers';

export const MODULE_ROUTES: Route[] = [
  {
    path: '',
    component: AdminPanelPage,
    data: {
      languagePath: 'admin/panel'
    },
    resolve: {
      translations: LanguageResolver
    },
    children: [
      // {
      //   path: 'token-configuration',
      //   loadChildren: () => import('./token-configuration').then(m => m.AdminTokenConfigurationModule),
      //   data: {
      //     preload: true
      //   },
      // },
      {
        path: 'configuration',
        loadChildren: () => import('./configuration').then(m => m.AdminConfigurationModule),
        resolve: {
          configuration: ConfigurationResolver
        },
        data: {
          preload: true
        },
      },
      {
        path: 'lent-loan-requests',
        loadChildren: () => import('./lent-loan-requests').then(m => m.AdminLentLoanRequestsModule),
        data: {
          preload: true
        },
      },
      {
        path: 'loan-requests',
        loadChildren: () => import('./loan-requests').then(m => m.AdminLoanRequestsModule),
        data: {
          preload: true
        },
      },
      {
        path: 'users',
        loadChildren: () => import('./users').then(m => m.AdminUsersModule),
      },
      {
        path: 'change-password',
        loadChildren: () => import('./change-password').then(m => m.ChangePasswordPageModule),
      },
      {
        path: 'loan',
        loadChildren: () => import('./loan').then(m => m.AdminLoanModule),
      },
      // {
      //   path: 'wallet',
      //   loadChildren: () => import('./wallet').then(m => m.AdminWalletModule),
      // },
      {
        path: '',
        redirectTo: '/admin/panel/configuration',
        pathMatch: 'full'
      },
    ]
  }
];

export const MODULE_COMPONENTS = [
  AdminPanelPage
];
