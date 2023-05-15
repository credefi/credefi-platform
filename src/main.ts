import { enableProdMode, Injector } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppBrowserModule } from './app/app.browser.module';
import { appInjector } from './app/helpers/injector';
import { environment } from './environments/environment';

if (environment.production) {
  console.log = function () { };
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppBrowserModule, { ngZoneEventCoalescing: true })
    .then((appRef: { injector: Injector }) => appInjector(appRef.injector))
    .catch(err => console.error(err));
});