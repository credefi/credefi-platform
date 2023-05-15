import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';

import { UserMenuComponent } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { ConfirmDialogModule } from 'src/app/shared/confirm-dialog';

@NgModule({
  imports: [
    CommonModule,
    LazyImageModule,
    MatRippleModule,
    MatMenuModule,
    MatDialogModule,
    ConfirmDialogModule,

  ],
  declarations: [
    UserMenuComponent
  ],
  exports: [
    UserMenuComponent
  ]
})

class UserMenuComponentModule { }

export {
  UserMenuComponent,
  UserMenuComponentModule
}