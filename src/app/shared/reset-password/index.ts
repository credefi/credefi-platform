import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';

import { ResetPasswordComponent } from './component';
import { ErrorModule } from 'src/app/pipes/error';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { AutoCompleteModule } from 'src/app/directives/autocomplete';
import { InputModule } from '../input-component';

@NgModule({
  declarations: [
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatRippleModule,
    MatDialogModule,
    LazyImageModule,
    ErrorModule,
    AutoCompleteModule,
    InputModule
  ],
  exports: [
    ResetPasswordComponent
  ]
})

export class ResetPasswordModule { }
