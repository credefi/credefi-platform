import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';

import { GroupDialog } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';

@NgModule({
  imports: [
    CommonModule,
    LazyImageModule,
    MatRippleModule
  ],
  declarations: [
    GroupDialog
  ],
  exports: [
    GroupDialog
  ]
})

export class GroupDialogModule { }

