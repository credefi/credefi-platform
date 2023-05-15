import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { enGB } from 'date-fns/locale'
import { MatDateFnsDateModule, DATEFNS_LOCALES } from 'src/app/modules/dete-fns'

import { LoanComponent } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { ConfigurationResolver } from '../resolvers';
import { LanguageResolver, SharedLanguageResolver } from 'src/app/resolvers';
import { CopyModule } from 'src/app/directives/copy';
import { FilePickerModule } from '../../../directives/filePicker';
import { InputNumberModule } from 'src/app/directives/number';
import { LoanResolver } from '../resolvers/LoanResolver';

@NgModule({
  declarations: [
    LoanComponent
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
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{
      path: ':loanKey',
      component: LoanComponent,
      data: {
        languagePath: 'admin/panel/loan',
        sharedLanguagePaths: {
          filePicker: 'shared/file-picker'
        }
      },
      resolve: {
        loan: LoanResolver,
        configuration: ConfigurationResolver,
        translations: LanguageResolver,
        sharedTranslations: SharedLanguageResolver,
      },
    }]),
    MatRippleModule,
    MatMenuModule,
    LazyImageModule,
    MatDialogModule,
    CopyModule,
    FilePickerModule,
    MatTooltipModule,
    InputNumberModule,
    MatSnackBarModule,
    MatDateFnsDateModule,
    MatDatepickerModule
  ]
})

export class AdminLoanModule { }
