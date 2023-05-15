import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ToolbarComponent } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { DrawerModule } from 'src/app/shared/drawer-component';
import { TranslatePipeModule } from 'src/app/pipes/translate';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatRippleModule,
    MatToolbarModule,
    MatTooltipModule,
    LazyImageModule,
    DrawerModule,
    TranslatePipeModule
  ],
  declarations: [
    ToolbarComponent
  ],
  exports: [
    ToolbarComponent
  ]
})

export class ToolbarModule { }
