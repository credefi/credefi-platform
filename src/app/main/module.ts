import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MODULE_ROUTES, MODULE_COMPONENTS } from './routes';
import { ToolbarModule } from './shared/toolbar-component';
import { DrawerModule } from './shared/drawer-component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MODULE_ROUTES),
    ToolbarModule,
    DrawerModule
  ],
  declarations: [
    MODULE_COMPONENTS
  ]
})

export class MainModule { }
