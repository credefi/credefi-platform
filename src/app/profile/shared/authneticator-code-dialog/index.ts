import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'
import { ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';

import { AuthneticatorCodeDialog } from './component';
import { InputModule } from 'src/app/shared/input-component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SafeHTMLModule } from 'src/app/pipes/safe-html';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    InputModule,
    MatRippleModule,
    LazyImageModule,
    ReactiveFormsModule,
    InputModule,
    MatCheckboxModule,
    MatSnackBarModule,
    SafeHTMLModule
  ],
  declarations: [
    AuthneticatorCodeDialog
  ],
  exports: [
    AuthneticatorCodeDialog
  ]
})

export class AuthneticatorCodeDialogModule { }
 