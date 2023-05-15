import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'
import { ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';

import { DecryptDialog } from './component';
import { InputModule } from 'src/app/shared/input-component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    InputModule,
    MatRippleModule
  ],
  declarations: [
    DecryptDialog
  ],
  exports: [
    DecryptDialog
  ]
})

export class DecryptDialogModule { }
