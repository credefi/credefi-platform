import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppModule } from './app.module';
import { BootstrapComponent } from './boostrap.component';

@NgModule({
  declarations: [
    BootstrapComponent,
  ],
  imports: [
    AppModule,
    BrowserAnimationsModule
  ],
  bootstrap: [BootstrapComponent]
})
export class AppBrowserModule {}
