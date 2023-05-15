import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';

import { ChangePasswordComponent } from './component';
import { ErrorModule } from 'src/app/pipes/error';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { ConfirmDialogModule } from 'src/app/shared/confirm-dialog';
import { AutoCompleteModule } from 'src/app/directives/autocomplete';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    MatRippleModule,
    MatDialogModule,
    LazyImageModule,
    ConfirmDialogModule,
    AutoCompleteModule,
    ErrorModule,
    MatCardModule
  ],
  exports: [
    ChangePasswordComponent
  ]
})

export class ChangePasswordModule { }
