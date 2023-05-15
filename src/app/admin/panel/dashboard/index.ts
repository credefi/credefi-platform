import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminDashboardPage } from './component';

@NgModule({
  declarations: [
    AdminDashboardPage,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: AdminDashboardPage }])
  ]
})

export class AdminDashboardModule { }
