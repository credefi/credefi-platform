import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { RoutesModule } from './routes';
import { AuthenticationProvidersModule } from './providers/module';
import { ConfirmDialogModule } from '../shared/confirm-dialog';

@NgModule({
  imports: [
    CommonModule,
    RoutesModule,
    MatDialogModule,
    ConfirmDialogModule,
    AuthenticationProvidersModule
  ],
  declarations: [ ]
})

export class AuthenticationModule {}
