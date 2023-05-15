import { NgModule } from '@angular/core';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TransferHttpCacheInterceptor } from './interceptor';

@NgModule({
    imports: [BrowserTransferStateModule],
    providers: [
        TransferHttpCacheInterceptor,
        { provide: HTTP_INTERCEPTORS, useExisting: TransferHttpCacheInterceptor, multi: true },
    ],
})

export class TransferHttpCacheModule { }