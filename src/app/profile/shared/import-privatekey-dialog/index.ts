import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';

import { ImportPrivateKeyDialog } from './component';
import { LazyImageModule } from '../../../shared/lazy-image-component';
import { InputModule } from 'src/app/shared/input-component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LazyImageModule,
    InputModule,
    MatRippleModule
  ],
  declarations: [
    ImportPrivateKeyDialog
  ],
  exports: [
    ImportPrivateKeyDialog
  ]
})

class ImportPrivateKeyDialogModule { }


export {
  ImportPrivateKeyDialog,
  ImportPrivateKeyDialogModule
}