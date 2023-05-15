import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SelectComponent } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { ErrorModule } from 'src/app/pipes/error';
import { OptionComponent } from './option/component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LazyImageModule,
    ErrorModule
  ],
  declarations: [
    SelectComponent,
    OptionComponent
  ],
  exports: [
    SelectComponent,
    OptionComponent
  ]
})

class SelectComponentModule { }

export {
  SelectComponent,
  SelectComponentModule
}