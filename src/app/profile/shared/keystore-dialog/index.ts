import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';

import { KeystoreDialog } from './component';
import { PrivateKeyDialogModule } from '../private-key-dialog';
import { CopyModule } from 'src/app/directives/copy';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatRippleModule,
    PrivateKeyDialogModule,
    CopyModule,
    LazyImageModule
  ],
  declarations: [
    KeystoreDialog
  ],
  exports: [
    KeystoreDialog
  ]
})

class KeystoreDialogModule { }

export {
  KeystoreDialog,
  KeystoreDialogModule
}