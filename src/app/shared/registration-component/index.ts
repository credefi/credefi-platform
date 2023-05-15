import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';

import { RegistrationComponent } from './component';
import { ErrorModule } from 'src/app/pipes/error';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { ConfirmDialogModule } from 'src/app/shared/confirm-dialog';
import { AutoCompleteModule } from 'src/app/directives/autocomplete';
import { InputModule } from '../input-component';

@NgModule({
  declarations: [
    RegistrationComponent,
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
    MatCheckboxModule,
    LazyImageModule,
    ConfirmDialogModule,
    ErrorModule,
    AutoCompleteModule,
    InputModule
  ],
  exports: [
    RegistrationComponent
  ]
})

export class RegistrationComponentModule { }
