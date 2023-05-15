import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ToolbarModule } from './shared/toolbar-component';
import { DrawerModule } from 'src/app/shared/drawer-component';
import { MODULE_ROUTES, MODULE_COMPONENTS } from './routes';
import { AdminPanelProvidersModule } from './providers/module';
import { Web3ProviderModule } from 'src/app/providers/web3';
import { AdminResolversModule } from './resolvers/module';

@NgModule({
  declarations: [
    MODULE_COMPONENTS,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MODULE_ROUTES),
    DrawerModule,
    ToolbarModule,
    AdminPanelProvidersModule,
    Web3ProviderModule,
    AdminResolversModule
  ]
})

export class AdminPanelModule { }
