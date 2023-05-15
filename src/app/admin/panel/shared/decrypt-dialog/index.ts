import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

import { DecryptDialog } from './component';
import { ErrorModule } from 'src/app/pipes/error';
import { AutoCompleteModule } from 'src/app/directives/autocomplete';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    ErrorModule,
    AutoCompleteModule
  ],
  declarations: [
    DecryptDialog
  ],
  exports: [
    DecryptDialog
  ]
})

export class DecryptDialogModule { }
