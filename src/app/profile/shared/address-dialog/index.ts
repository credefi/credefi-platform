import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressDialog } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { CopyModule } from 'src/app/directives/copy';

@NgModule({
  imports: [
    CommonModule,
    LazyImageModule,
    CopyModule
  ],
  declarations: [
    AddressDialog
  ],
  exports: [
    AddressDialog
  ]
})

class AddressDialogModule { }

export {
  AddressDialog,
  AddressDialogModule
}