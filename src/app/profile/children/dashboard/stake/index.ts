import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardStakeComponent } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { LanguageResolver, SharedLanguageResolver } from 'src/app/resolvers';
import { InputModule } from 'src/app/shared/input-component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogModule } from 'src/app/shared/confirm-dialog';
import { WithdrawDialogModule } from 'src/app/profile/shared/widthdraw-dialog';

import { enGB } from 'date-fns/locale'
import { MatDateFnsDateModule, DATEFNS_LOCALES } from 'src/app/modules/dete-fns'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { VirtualScrollerModule } from 'src/app/modules/virtual-scroll';

@NgModule({
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: "enGB",
    },
    {
      provide: DATEFNS_LOCALES,
      useValue: [enGB]
    },
    DatePipe
  ],
  declarations: [
    DashboardStakeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: DashboardStakeComponent,
      data: {
        languagePath: 'profile/dashboard/stake',
        sharedLanguagePaths: {
          withDrawDialog: 'shared/withdraw-dialog'
        }
      },
      resolve: {
        translations: LanguageResolver,
        sharedTranslations: SharedLanguageResolver
      },
    }]),
    FormsModule,
    ReactiveFormsModule,
    LazyImageModule,
    InputModule,
    MatRippleModule,
    MatDialogModule,
    ConfirmDialogModule,
    WithdrawDialogModule,
    MatDateFnsDateModule,
    MatDatepickerModule,
    VirtualScrollerModule
  ]
})

export class DashboardStakeModule { }
