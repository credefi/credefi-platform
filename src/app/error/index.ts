import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';

import { ErrorPage } from './component';
import { LazyImageModule } from '../shared/lazy-image-component';

@NgModule({
  declarations: [
    ErrorPage
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ErrorPage }]),
    MatRippleModule,
    LazyImageModule
  ]
})

export class ErrorPageModule { }
