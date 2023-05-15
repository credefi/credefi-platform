import { Injectable, Inject, PLATFORM_ID, NgZone, Output, EventEmitter } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { io, Socket } from 'socket.io-client';

import { Environment } from 'src/globals/config'
import { MapProvider } from '../../../providers/MapProvider';
import { AdminPanelProvidersModule } from './module';
import { IObjectKeys } from 'src/app/helpers/interfaces';

@Injectable({
    providedIn: AdminPanelProvidersModule
})

export class SocketProvider {

    private socket!: Socket;

    @Output() putUser = new EventEmitter();
    @Output() postUser = new EventEmitter();

    @Output() postLending = new EventEmitter();
    @Output() putLending = new EventEmitter();

    @Output() postLoan = new EventEmitter();
    @Output() putLoan = new EventEmitter();

    @Output() updateContract = new EventEmitter();

    constructor(
        private NgZone: NgZone,
        private MapProvider: MapProvider,
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

                this.socket.on('post-user', (data: IObjectKeys) => {
                    this.NgZone.run(() => {
                        this.postUser.emit(data);
                    });
                });

                this.socket.on('put-user', (data: IObjectKeys) => {
                    this.NgZone.run(() => {
                        this.putUser.emit(data);
                    });
                });

                this.socket.on('post-lending', (data: IObjectKeys) => {
                    this.NgZone.run(() => {
                        this.postLending.emit(data);
                    });
                });

                this.socket.on('put-lending', (data: IObjectKeys) => {
                    this.NgZone.run(() => {
                        this.putLending.emit(data);
                    });
                });

                this.socket.on('post-loan', (data: IObjectKeys) => {
                    this.NgZone.run(() => {
                        this.postLoan.emit(data);
                    });
                });

                this.socket.on('put-loan', (data: IObjectKeys) => {
                    this.NgZone.run(() => {
                        this.putLoan.emit(data);
                    });
                });

                this.socket.on('update-contract', (data: IObjectKeys) => {
                    this.NgZone.run(() => {
                        this.updateContract.emit(data);
                    });
                });

            });
        }
    }

}
