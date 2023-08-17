import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'password', loadComponent: () => import('./forgotten-password/password').then(m => m.PasswordComponent) },
    { path: 'password02', loadComponent: () => import('./forgotten-password/password02').then(m => m.Password02Component) },
    { path: 'password03', loadComponent: () => import('./forgotten-password/password03').then(m => m.Password03Component) },
    { path: 'password04', loadComponent: () => import('./forgotten-password/password04').then(m => m.Password04Component) },

    {
        path: 'earn',
        loadChildren: () => import('./earn/routes').then(m => m.routes),
        title: 'Autonomous earning',
    },
    {
        path: 'stake',
        loadComponent: () => import('./steaking-catalogue').then(m => m.SteakingCatalogueComponent),
        title: 'Stake',
    },
    { 
        path: 'stake03', 
        loadComponent: () => import('./stake03').then(m => m.Stake03Component),
        title: 'Stake03',
    },
    {
        path: 'wallet',
        loadComponent: () => import('./wallet').then((m) => m.WalletComponent),
        title: 'Wallet',
    },
    {
        path: 'transactions',
        loadComponent: () => import('./all-transactions').then(m => m.AllTransactionsComponent),
        title: 'All transactions',
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard').then(m => m.DashboardComponent),
        title: 'Dashboard',
    },
    {
        path: 'shared/header-open-mobile',
        loadComponent: () => import('./shared/header-open-mobile').then(m => m.HeaderOpenMobileComponent),
        title: 'Dashboard',
    },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
