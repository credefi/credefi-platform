import { Injectable, Inject, PLATFORM_ID, NgZone, Output, EventEmitter } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { io, Socket } from 'socket.io-client';

import { Environment } from 'src/globals/config'
import { MapProvider } from '../../providers/MapProvider';
import { ProfileProvidersModule } from './module';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { SwUpdate } from '@angular/service-worker';
import { LanguageProvider } from 'src/app/providers';

@Injectable({
    providedIn: ProfileProvidersModule
})

export class SocketProvider {

    private socket!: Socket;

    @Output() deleteAccount = new EventEmitter();
    @Output() postAccount = new EventEmitter();
    @Output() postTransaction = new EventEmitter();

    constructor(
        private NgZone: NgZone,
        private swUpdate: SwUpdate,
        private MapProvider: MapProvider,
        private language: LanguageProvider,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    disconnect() {
        if (this.socket && this.socket.connected) {
            this.socket.disconnect();
        }
    }

    reconnect() {
        if (this.socket && this.socket.connected) {
            this.disconnect();
        }
        this.init();
    }

    private init() {
        if (isPlatformBrowser(this.platformId)) {
            this.NgZone.runOutsideAngular(() => {

                this.socket = io(Environment.api_url, {
                    query: {
                        token: this.MapProvider.get(MapProvider.TOKEN)
                    },
                    transports: ['websocket']
                });

                this.socket.on('post-account', (data: IObjectKeys) => {
                    this.NgZone.run(() => {
                        this.postAccount.emit(data);
                    });
                });

                this.socket.on('delete-account', (data: IObjectKeys) => {
                    this.NgZone.run(() => {
                        this.deleteAccount.emit(data);
                    });
                });

                this.socket.on('post-transaction', (data: IObjectKeys) => {
                    this.NgZone.run(() => {
                        this.postTransaction.emit(data);
                    });
                });

                this.socket.on('check-update', (data: IObjectKeys) => {
                    this.language.clearCache();
                    if (isPlatformBrowser(this.platformId) && this.swUpdate.isEnabled) {
                        this.swUpdate.checkForUpdate();
                    }
                });

            });
        }
    }

}
