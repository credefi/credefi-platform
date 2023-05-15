import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';

import { SendDialog } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { InputModule } from 'src/app/shared/input-component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LazyImageModule,
    InputModule,
    MatRippleModule
  ],
  declarations: [
    SendDialog
  ],
  exports: [
    SendDialog
  ]
})

class SendDialogModule { }

export {
  SendDialog,
  SendDialogModule
}