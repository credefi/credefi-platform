import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DLoansActionsComponent } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { LanguageResolver } from 'src/app/resolvers';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [
    DLoansActionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: DLoansActionsComponent,
      data: {
        languagePath: 'profile/loans/actions'
      },
      resolve: {
        translations: LanguageResolver,
      },
    }]),
    LazyImageModule,
    MatRippleModule
  ]
})

export class LoansActionsModule { }
