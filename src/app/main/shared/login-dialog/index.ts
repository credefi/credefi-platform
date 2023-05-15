import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';

import { LoginDialog } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { InputModule } from 'src/app/shared/input-component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LazyImageModule,
    InputModule,
    MatRippleModule,
    MatDialogModule,
  ],
  declarations: [
    LoginDialog
  ],
  exports: [
    LoginDialog
  ]
})

export class LoginDialogModule { }
