import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';

import { WithdrawDialog } from './component';
import { InputModule } from 'src/app/shared/input-component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { InputNumberModule } from 'src/app/directives/number';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputModule,
    InputNumberModule,
    LazyImageModule,
    MatRippleModule
  ],
  declarations: [
    WithdrawDialog
  ],
  exports: [
    WithdrawDialog
  ]
})

class WithdrawDialogModule { }

export{
  WithdrawDialog,
  WithdrawDialogModule
}