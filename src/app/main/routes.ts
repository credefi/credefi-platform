import { Route } from '@angular/router';
import { LanguageResolver } from '../resolvers';
import { MainPage } from './component';

export const MODULE_ROUTES: Route[] = [
  {
    path: '',
    component: MainPage,
    data: {
      languagePath: 'main'
    },
    resolve: {
      translations: LanguageResolver
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./home').then(m => m.HomeModule),
        data: {
          preload: true
        },
      },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      },
    ]
  }
];

export const MODULE_COMPONENTS = [MainPage];