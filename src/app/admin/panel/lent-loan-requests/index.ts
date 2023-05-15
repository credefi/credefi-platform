import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';

import { enGB } from 'date-fns/locale'
import { MatDateFnsDateModule, DATEFNS_LOCALES } from 'src/app/modules/dete-fns'

import { AdminLentLoanRequestsPage } from './component';
import { LanguageResolver } from 'src/app/resolvers';
import { ErrorModule } from 'src/app/pipes/error';
import { InputNumberModule } from 'src/app/directives/number';
import { AutoCompleteModule } from 'src/app/directives/autocomplete';
import { LendingsResolver } from '../resolvers';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { CopyModule } from 'src/app/directives/copy';
import { DecryptDialogModule } from 'src/app/profile/shared/decrypt-dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ConfirmDialogModule } from 'src/app/shared/confirm-dialog';
import { MaturityDialogModule } from '../shared/maturity-dialog';

@NgModule({
  declarations: [
    AdminLentLoanRequestsPage,
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: "enGB",
    },
    {
      provide: DATEFNS_LOCALES,
      useValue: [enGB]
    }
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: AdminLentLoanRequestsPage,
      data: {
        languagePath: 'admin/panel/lent-loan-requests'
      },
      resolve: {
        translations: LanguageResolver,
        list: LendingsResolver
      },
    }]),
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    ErrorModule,
    InputNumberModule,
    MatButtonModule,
    AutoCompleteModule,
    MatTooltipModule,
    MatCheckboxModule,
    LazyImageModule,
    MatRippleModule,
    CopyModule,
    DecryptDialogModule,
    MatDialogModule,
    MatDateFnsDateModule,
    MatDatepickerModule,
    ConfirmDialogModule,
    MaturityDialogModule
  ]
})

export class AdminLentLoanRequestsModule { }
