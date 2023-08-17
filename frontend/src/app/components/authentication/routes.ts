import { Routes } from '@angular/router';
import { LanguageResolver } from 'src/app/resolvers';

export const routes: Routes = [
    {
        path: 'registration',
        loadComponent: () => import('./registration').then(m => m.RegistrationComponent),
        title: 'Registration',
        data: {
            languagePath: 'authentication/registration',
        },
        resolve: {
            translations: LanguageResolver
        },
    },
    {
        path: 'login',
        title: 'Login',
        loadComponent: () => import('./login').then(m => m.LoginComponent),
        data: {
            languagePath: 'authentication/login',
        },
        resolve: {
            translations: LanguageResolver
        },
    },
    {
        path: 'token',
        title: 'Login',
        loadComponent: () => import('./token').then(m => m.TokenComponent),
        data: {
            languagePath: 'authentication/authenticate'
        },
        resolve: {
            translations: LanguageResolver
        },
    },
    {
        path: 'forgotten-password',
        title: 'Forgotten password',
        loadComponent: () => import('./forgotten-password').then(m => m.ForgottenPasswordComponent)
    },
    {
        path: 'reset-password/:token',
        title: 'Reset password',
        loadComponent: () => import('./reset-password').then(m => m.ResetPasswordComponent)
    },
    {
        path: 'verify',
        title: 'Registration',
        loadComponent: () => import('./verify').then(m => m.VerifyComponent)
    },
    {
        path: 'activation/:token',
        title: 'Registration',
        loadComponent: () => import('./activation').then(m => m.ActivationComponent)
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];
