import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MODULE_ROUTES } from './routes';
import { GuardProvidersModule } from './guards';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MODULE_ROUTES),
    GuardProvidersModule
  ]
})

export class AdminModule { }
