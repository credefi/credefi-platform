import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServerModule, ServerTransferStateModule, } from '@angular/platform-server';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppModule } from './app.module';
import { BootstrapComponent } from './boostrap.component';
import { UNIVERSAL_LOCAL_STORAGE } from '../../server/local-storage';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    RouterModule,
    ServerTransferStateModule,
    NoopAnimationsModule
  ],
  providers: [
    UNIVERSAL_LOCAL_STORAGE
  ],
  bootstrap: [
    BootstrapComponent
  ]
})

export class AppServerModule { }
