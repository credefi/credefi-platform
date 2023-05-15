import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'
import { ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';

import { LendAcceptDialog } from './component';
import { InputModule } from 'src/app/shared/input-component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    InputModule,
    MatRippleModule,
    MatCheckboxModule,
    LazyImageModule
  ],
  declarations: [
    LendAcceptDialog
  ],
  exports: [
    LendAcceptDialog
  ]
})

export class LendAcceptDialogModule { }
