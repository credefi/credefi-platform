import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRippleModule, MAT_DATE_LOCALE } from '@angular/material/core';

import { enGB } from 'date-fns/locale'
import { MatDateFnsDateModule, DATEFNS_LOCALES } from 'src/app/modules/dete-fns'

import { InputComponent } from './component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorModule } from 'src/app/pipes/error';
import { AutoCompleteModule } from 'src/app/directives/autocomplete';
import { InputNumberModule } from 'src/app/directives/number';
import { LazyImageModule } from '../lazy-image-component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ErrorModule,
    AutoCompleteModule,
    InputNumberModule,
    MatDateFnsDateModule,
    MatDatepickerModule,
    LazyImageModule,
    MatRippleModule
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
  declarations: [
    InputComponent
  ],
  exports: [
    InputComponent
  ]
})

class InputModule { }

export {
  InputComponent,
  InputModule
}