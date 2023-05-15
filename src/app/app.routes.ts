import { Route } from '@angular/router';
import { AppComponent } from './app.component';
import { LanguageResolver } from './resolvers';

export const MODULE_ROUTES: Route[] = [
  {
    path: '',
    component: AppComponent,
    resolve: {
      translations: LanguageResolver,
    },
    data: {
      languagePath: ''
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./main/module').then(m => m.MainModule)
      },
      {
        path: 'authentication',
        loadChildren: () => import('./authentication/module').then(m => m.AuthenticationModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/module').then(m => m.AdminModule)
      },
      {
        path: 'l',
        loadChildren: () => import('./lend/module').then(m => m.RedirectLendModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/module').then(m => m.ProfileModule),
        data: {
          preload: true
        },
      },
      {
        path: 'error',
        loadChildren: () => import('./error').then(m => m.ErrorPageModule),
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  },
];

export const MODULE_COMPONENTS = [AppComponent];
