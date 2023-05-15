import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AdminLoanRequestsPage } from './component';
import { LanguageResolver } from 'src/app/resolvers';
import { ErrorModule } from 'src/app/pipes/error';
import { InputNumberModule } from 'src/app/directives/number';
import { AutoCompleteModule } from 'src/app/directives/autocomplete';
import { LoansResolver } from '../resolvers';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { CopyModule } from 'src/app/directives/copy';

@NgModule({
  declarations: [
    AdminLoanRequestsPage,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: AdminLoanRequestsPage,
      data: {
        languagePath: 'admin/panel/loan-requests'
      },
      resolve: {
        translations: LanguageResolver,
        list: LoansResolver
      },
    }]),
    FormsModule,
    MatInputModule,
    FormsModule,
    ErrorModule,
    InputNumberModule,
    MatButtonModule,
    AutoCompleteModule,
    MatTooltipModule,
    LazyImageModule,
    CopyModule
  ]
})

export class AdminLoanRequestsModule { }
