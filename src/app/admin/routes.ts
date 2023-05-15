import { Route } from '@angular/router';
import { AdminGuardProvider } from './guards/AdminGuard';

export const MODULE_ROUTES: Route[] = [
  {
    path: 'panel',
    loadChildren: () => import('./panel/module').then(m => m.AdminPanelModule),
    canActivate: [AdminGuardProvider],
    data: {
      preload: true
    },
  },
  {
    path: '',
    redirectTo: '/admin/panel/configuration',
    pathMatch: 'full'
  },
];