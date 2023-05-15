import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LendGuardProvider } from './guards';

const routes: Routes = [
  {
    path: ':token',
    loadChildren: () => import('./redirect').then(m => m.RedirectModule),
    canActivate: [
      LendGuardProvider
    ]
  },
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