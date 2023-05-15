import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorComponent } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';

@NgModule({
  imports: [
    CommonModule,
    LazyImageModule
  ],
  declarations: [
    ErrorComponent
  ],
  exports: [
    ErrorComponent
  ]
})

class ErrorComponentModule { }

export {
  ErrorComponent,
  ErrorComponentModule
}