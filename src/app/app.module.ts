import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgModule, ɵɵinject, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { Router, RouteReuseStrategy, RouterModule, UrlSerializer } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DOCUMENT, Location, ViewportScroller } from '@angular/common';

import { TransferHttpCacheModule } from './modules/transfer-http';
import { PreloadStrategy } from './modules/preload-strategy';

import { MODULE_COMPONENTS, MODULE_ROUTES } from './app.routes';
import { environment } from '../environments/environment';
import { CustomViewportScroller } from 'src/app/modules/custom-viewport-scroller';

import { ErrorIntercept } from './helpers/error.interceptor';
import { LanguageProvider, UserProvider } from './providers';
import { CustomRouteReuseStrategy } from './modules/router-strategy';

@NgModule({
  declarations: [
    MODULE_COMPONENTS
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'project' }),
    TransferHttpCacheModule,
    RouterModule.forRoot(MODULE_ROUTES, {
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'enabled',
      malformedUriErrorHandler: malFormedURI,
      preloadingStrategy: PreloadStrategy
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorIntercept,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      deps: [
        Router,
        UserProvider,
        LanguageProvider,
        Location
      ],
      multi: true
    },
    {
      provide: ViewportScroller,
      useFactory: () => new CustomViewportScroller(ɵɵinject(DOCUMENT), window, ɵɵinject(ErrorHandler))
    },
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy
    }
  ],
  exports: [
    RouterModule
  ]
})

export class AppModule { }

export function malFormedURI(error: URIError, urlSerializer: UrlSerializer, url: string) {
  return urlSerializer.parse('/')
};

export function init_app(
  router: Router,
  userProvider: UserProvider,
  languageProvider: LanguageProvider,
  location: Location,
) {
  return () => Promise.all([
    userProvider.init(),
    languageProvider.init({}),
  ]).then(([user]) => {

    if (user) {
      if (!location.path().startsWith('/profile') && !location.path().startsWith('/admin') && !location.path().startsWith('/l')) {
        router.navigate(['/profile/dashboard']);
      }
    } else {
      if (!location.path().startsWith('/authentication')) {
        router.navigateByUrl(`/authentication/login?url=${location.path()}`);
      }
    }

  }).catch((e) => {
    router.navigate(['/error']);
  });
}