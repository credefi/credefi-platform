import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaturityDialog } from './component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MaturityDialog
  ],
  exports: [
    MaturityDialog
  ]
})

export class MaturityDialogModule { }
