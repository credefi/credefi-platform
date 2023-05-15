import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpansionComponent } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { LoadModule } from 'src/app/directives/load';

@NgModule({
  declarations: [
    ExpansionComponent,
  ],
  imports: [
    CommonModule,
    LazyImageModule,
    LoadModule
  ],
  exports: [
    ExpansionComponent
  ]
})

export class ExpansionModule { }
