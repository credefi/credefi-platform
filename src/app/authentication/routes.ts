import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'registration',
    loadChildren: () => import('./registration').then(m => m.RegistrationModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login').then(m => m.LoginModule),
  },
  {
    path: 'token',
    loadChildren: () => import('./authenticate').then(m => m.LoginModule),
  },
  {
    path: '2fa',
    loadChildren: () => import('./2fa-authenticate').then(m => m.Login2faModule),
  },
  {
    path: 'activation/:token',
    loadChildren: () => import('./activation').then(m => m.AuthenticationActivationModule),
  },
  {
    path: 'forgotten-password',
    loadChildren: () => import('./forgotten-password').then(m => m.ForgottenPasswordPageModule),
  },
  {
    path: 'reset-password/:token',
    loadChildren: () => import('./reset-password').then(m => m.ResetPasswordPageModule),
  },
  {
    path: 'facebook',
    loadChildren: () => import('./facebook').then(m => m.AuthenticationFacebookModule),
  },
  {
    path: 'google',
    loadChildren: () => import('./google').then(m => m.AuthenticationGoogleModule),
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})

export class RoutesModule { }