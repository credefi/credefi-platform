import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoadingPage } from './component';

@NgModule({
  declarations: [
    LoadingPage
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: LoadingPage }]),
  ]
})

export class LoadingPageModule { }
