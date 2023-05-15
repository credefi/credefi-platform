// @ts-nocheck

import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse, HttpParams } from '@angular/common/http';
import { ApplicationRef, Injectable } from '@angular/core';
import { TransferState, makeStateKey, StateKey } from '@angular/platform-browser';
import { firstValueFrom, Observable, of as observableOf } from 'rxjs';
import { tap, take, filter } from 'rxjs/operators';

export interface TransferHttpResponse {
  body?: any | null;
  headers?: { [k: string]: string[] };
  status?: number;
  statusText?: string;
  url?: string;
}

function getHeadersMap(headers: HttpHeaders) {
  const headersMap: Record<string, string[] | null> = {};
  for (const key of headers.keys()) {
    headersMap[key] = headers.getAll(key);
  }

  return headersMap;
}

@Injectable()

export class TransferHttpCacheInterceptor implements HttpInterceptor {

  private isCacheActive = true;

  private invalidateCacheEntry(url: string) {
    Object.keys(this.transferState['store'])
      .forEach(key => key.includes(url) ? this.transferState.remove(makeStateKey(key)) : null);
  }

  private makeCacheKey(method: string, url: string, params: HttpParams): StateKey<string> {
    // make the params encoded same as a url so it's easy to identify
    const encodedParams = params.keys().sort().map(k => `${k}=${params.getAll(k)}`).join('&');
    const key = (method === 'GET' ? 'G.' : 'H.') + url + '?' + encodedParams;

    return makeStateKey<TransferHttpResponse>(key);
  }

  constructor(appRef: ApplicationRef, private transferState: TransferState) {
    // Stop using the cache if the application has stabilized, indicating initial rendering is
    // complete.
    // tslint:disable-next-line: no-floating-promises
    firstValueFrom(appRef.isStable
      .pipe(
        filter((isStable: boolean) => isStable),
        take(1)
      ))
      .then(() => { this.isCacheActive = false; });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Stop using the cache if there is a mutating call.
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      this.isCacheActive = false;
      this.invalidateCacheEntry(req.url);
    }

    if (!this.isCacheActive) {
      // Cache is no longer active. Pass the request through.
      return next.handle(req);
    }

    const storeKey = this.makeCacheKey(req.method, req.url, req.params);

    if (this.transferState.hasKey(storeKey)) {
      // Request found in cache. Respond using it.
      const response = this.transferState.get(storeKey, {} as TransferHttpResponse);

      return observableOf(new HttpResponse<any>({
        body: response.body,
        headers: new HttpHeaders(response.headers),
        status: response.status,
        statusText: response.statusText,
        url: response.url,
      }));
    } else {
      // Request not found in cache. Make the request and cache it.
      const httpEvent = next.handle(req);

      return httpEvent
        .pipe(
          tap((event: HttpEvent<unknown>) => {
            if (event instanceof HttpResponse) {
              this.transferState.set(storeKey, {
                body: event.body,
                headers: getHeadersMap(event.headers),
                status: event.status,
                statusText: event.statusText,
                url: event.url || '',
              });
            }
          })
        );
    }
  }
}