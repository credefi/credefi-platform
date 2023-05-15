import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { IObjectKeys } from 'src/app/helpers/interfaces';
import { orderKeyValue } from 'src/app/helpers/track';
import { LOCAL_STORAGE } from 'src/app/modules/local-storage';
import { WINDOW } from 'src/app/modules/window';
import { MapProvider, UserProvider } from 'src/app/providers';
import { Web3ClientProvider } from 'src/app/providers/web3';
import { ConfirmDialog } from 'src/app/shared/confirm-dialog';
import { METAMASK_ACTIONS, modules } from 'src/environments/environment';
import { Environment } from 'src/globals/config';
import { KycProvider } from '../../providers';

@Component({
  selector: 'user-menu-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserMenuComponent implements OnInit, OnDestroy {

  address!: string;
  _title!: string;
  user: IObjectKeys;
  subscription!: Subscription;
  netWorksubscription!: Subscription;
  translations: { [key: string]: string | Function | any } = this.activatedRoute.snapshot.data.sharedTranslations.userMenu;
  networks = this.web3.networks;
  orderKeyValue = orderKeyValue;
  modules = modules;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private mapProvider: MapProvider,
    private change: ChangeDetectorRef,
    private userProvider: UserProvider,
    private web3: Web3ClientProvider,
    private KycProvider: KycProvider,
    private activatedRoute: ActivatedRoute,
    @Inject(WINDOW) private window: IObjectKeys,
    @Inject(LOCAL_STORAGE) private localStorage: Storage
  ) {
    this.user = mapProvider.get(MapProvider.USER);
  }

  @Input()
  set title(title: string) {
    this._title = title;
  }

  get title() {
    return this._title;
  }

  get letter() {
    return this.user?.email[0]
  }

  get chain() {
    return this.web3.network
  }

  ngOnInit() {
    this.address = this.mapProvider.get(MapProvider.METAMASK);
    this.subscription = this.mapProvider.setSubsription(MapProvider.METAMASK).subscribe((item: string) => {
      this.address = item;
      this.change.markForCheck();
    })
    this.netWorksubscription = this.web3.changeNetwork.subscribe(() => {
      this.change.markForCheck();
    })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.netWorksubscription) {
      this.netWorksubscription.unsubscribe();
    }
  }

  connect() {

    if (this.window?.ethereum?.isMetaMask) {
      return this.window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((data: string[]) => {
          const item: string = data?.[0];
          if (item != null) {
            this.mapProvider.set(MapProvider.METAMASK, item);
            this.localStorage.setItem(MapProvider.METAMASK, METAMASK_ACTIONS.initialized);
          }
        })
        .catch((err: Error) => {
          console.error(err);
        });
    }

    return this.dialog.open(ConfirmDialog, {
      width: '350px',
      scrollStrategy: new NoopScrollStrategy(),
      data: {
        title: this.translations['metamask-title'],
        message: this.translations['metamask-text'],
        buttons: [
          {
            label: this.translations['metamask-button']
          }
        ]
      }
    });
  }

  navigate(url: string) {
    this.router.navigateByUrl(url);
  }

  logout() {
    this.userProvider.logout().subscribe(() => {
      this.window.location.replace(Environment.api_url);
    });
  }

  setNetwork(key: string) {
    this.web3.network = key;
  }

  openShufti(){
    this.KycProvider.initIframe();
  }

}
