import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RedirectLendPage } from './component';

@NgModule({
  declarations: [
    RedirectLendPage,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: RedirectLendPage,
    }])
  ]
})

export class RedirectModule { }
