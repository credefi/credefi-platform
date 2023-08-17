import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, Routes } from '@angular/router';
import { AuthenticationProvider } from './components/authentication/providers';
import { inject } from '@angular/core';
import { UserProvider } from './providers';
import { map } from 'rxjs';
import { AccountProvider, GeckoProvider, KycProvider } from './components/main/providers';

export const routes: Routes = [
  {
    path: 'authentication',
    loadChildren: () => import('./components/authentication/routes').then(m => m.routes),
    providers: [AuthenticationProvider]
  },
  {
    path: '',
    loadComponent: () => import('./components/main').then(m => m.ActiveSessionsComponent),
    loadChildren: () => import('./components/main/routes').then(m => m.routes),
    providers: [
      AccountProvider, GeckoProvider, KycProvider
    ],
    canActivate: [
      (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ) => {
        const userProvider = inject(UserProvider);
        const router = inject(Router);

        return userProvider.get().pipe(map(({ result, error }) => {

          if (result) {
            return true;
          }

          const { url } = state;

          router.navigate(['/authentication/login'], {
            queryParams: {
              url
            }
          });

          return false;

        }));

      }
    ],
    
  },
  { path: '**', loadComponent: () => import('./components/main/not-found').then(m => m.NotFoundComponent) },
];
