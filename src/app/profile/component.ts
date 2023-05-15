import { OverlayContainer } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { METAMASK_ACTIONS, modules } from 'src/environments/environment';

import { IObjectKeys } from '../helpers/interfaces';
import { LOCAL_STORAGE } from '../modules/local-storage';
import { WINDOW } from '../modules/window';
import { MapProvider } from '../providers';
import { SocketProvider } from './providers';

@Component({
  selector: 'profile-page',
  styleUrls: ['./style.scss'],
  templateUrl: './index.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})

export class ProfilePage {

  defaultColor: string | undefined = '';
  translations: { [key: string]: string } = this.activated.snapshot.data.translations;

  navigation: {
    name: string,
    link: string,
    image: string,
    imageActive: string,
    disable: boolean,
    type: 'button' | 'link',
    queryParamsHandling?: 'merge' | 'preserve' | '' | undefined,
  }[] = [
      {
        name: this.translations['dashboard'],
        link: '/profile/dashboard',
        image: './assets/dashboard.svg',
        imageActive: './assets/dashboard-active.svg',
        type: 'link',
        disable: !modules.dashboard
      },
      {
        name: this.translations['modulex'],
        link: '/profile/module-x',
        image: './assets/module-x.svg',
        imageActive: './assets/module-x-active.svg',
        type: 'link',
        disable: !modules.modulex
      },
      {
        name: this.translations['lend'],
        link: '/profile/lend',
        image: './assets/lend-button.svg',
        imageActive: './assets/lend-button-active.svg',
        type: 'link',
        disable: !modules.lend
      },
      // {
      //   name: this.translations['borrow'],
      //   link: '/profile/borrow',
      //   image: './assets/borrow-button.svg',
      //   imageActive: './assets/borrow-button-active.svg',
      //   type: 'link',
      //   disable: !modules.borrow
      // },
      {
        name: this.translations['loans'],
        link: '/profile/loans/lent/portfolio',
        image: './assets/loans-button.svg',
        imageActive: './assets/loans-button-active.svg',
        type: 'link',
        disable: !modules.myloans
      },
      {
        name: this.translations['wallet'],
        link: '/profile/wallet',
        image: './assets/wallet-button.svg',
        imageActive: './assets/wallet-button-active.svg',
        type: 'link',
        disable: !modules.wallet
      },
    ];

  constructor(
    private mapProvider: MapProvider,
    private activated: ActivatedRoute,
    private socketProvider: SocketProvider,
    private overlayContainer: OverlayContainer,
    @Inject(WINDOW) private window: IObjectKeys,
    @Inject(DOCUMENT) private document: Document,
    @Inject(LOCAL_STORAGE) private localStorage: Storage
  ) { }

  ngOnInit() {
    this.defaultColor = this.document.documentElement.style.backgroundColor;
    this.overlayContainer.getContainerElement().classList.add('member');
    this.socketProvider.reconnect();
    this.document.documentElement.style.backgroundColor = '#fcfcfd';

    if (this.window?.ethereum?.isMetaMask && this.localStorage.getItem(MapProvider.METAMASK) == METAMASK_ACTIONS.initialized) {
      return this.window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((data: string[]) => {
          const item: string = data?.[0];
          if (item != null) {
            this.mapProvider.set(MapProvider.METAMASK, item);
          }
        })
        .catch((err: Error) => {
          console.error(err);
        });
    }
  }

  ngOnDestroy() {
    this.overlayContainer.getContainerElement().classList.remove('member');
    this.document.documentElement.style.backgroundColor = this.defaultColor as string;
    this.socketProvider.disconnect();
  }
}