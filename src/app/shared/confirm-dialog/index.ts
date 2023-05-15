import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'

import { ConfirmDialog } from './component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule
  ],
  declarations: [
    ConfirmDialog
  ],
  exports: [
    ConfirmDialog
  ]
})

class ConfirmDialogModule { }

export {
  ConfirmDialog,
  ConfirmDialogModule
}
