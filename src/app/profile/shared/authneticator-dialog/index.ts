import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'
import { ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';

import { AuthneticatorDialog } from './component';
import { InputModule } from 'src/app/shared/input-component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    InputModule,
    MatRippleModule,
    LazyImageModule,
    ReactiveFormsModule,
    InputModule
  ],
  declarations: [
    AuthneticatorDialog
  ],
  exports: [
    AuthneticatorDialog
  ]
})

export class AuthneticatorDialogModule { }
 