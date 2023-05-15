import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';

import { PrivateKeyDialog } from './component';
import { CopyModule } from 'src/app/directives/copy';
import { InputModule } from 'src/app/shared/input-component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CopyModule,
    InputModule,
    LazyImageModule,
    MatRippleModule
  ],
  declarations: [
    PrivateKeyDialog
  ],
  exports: [
    PrivateKeyDialog
  ]
})

class PrivateKeyDialogModule { }

export{
  PrivateKeyDialog,
  PrivateKeyDialogModule
}