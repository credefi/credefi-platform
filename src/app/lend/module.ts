import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuardProvidersModule } from './guards';

import { RoutesModule } from './routes';

@NgModule({
  imports: [
    CommonModule,
    RoutesModule,
    GuardProvidersModule
  ],
  declarations: []
})

export class RedirectLendModule { }
