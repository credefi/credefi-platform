import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';

import { ExistingAccountDialog } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { InputModule } from 'src/app/shared/input-component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputModule,
    LazyImageModule,
    MatRippleModule
  ],
  declarations: [
    ExistingAccountDialog
  ],
  exports: [
    ExistingAccountDialog
  ]
})

export class ExistingAccountDialogModule { }
