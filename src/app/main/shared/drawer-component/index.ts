import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';

import { DrawerComponent } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatRippleModule,
    LazyImageModule
  ],
  declarations: [
    DrawerComponent
  ],
  exports: [
    DrawerComponent
  ]
})

export class DrawerModule { }
