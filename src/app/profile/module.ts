import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MODULE_ROUTES, MODULE_COMPONENTS } from './routes';
import { GuardsModule } from './guards/module';
import { Web3ProviderModule } from '../providers/web3';
import { DrawerModule } from './shared/drawer-component';
import { ProfileResolversModule } from './resolvers';
import { ProfileProvidersModule } from './providers';

@NgModule({
  declarations: [
    MODULE_COMPONENTS,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MODULE_ROUTES),
    GuardsModule,
    Web3ProviderModule,
    DrawerModule,
    ProfileProvidersModule,
    ProfileResolversModule,
    Web3ProviderModule
  ]
})

export class ProfileModule { }
