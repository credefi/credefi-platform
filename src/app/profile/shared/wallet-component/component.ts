import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { isPlatformBrowser } from '@angular/common';
import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { IObjectKeys } from 'src/app/helpers/interfaces';
import { LOCAL_STORAGE } from 'src/app/modules/local-storage';
import { MapProvider } from 'src/app/providers';
import { Web3ClientProvider } from 'src/app/providers/web3';
import { ConfirmDialog } from 'src/app/shared/confirm-dialog';
import { WALLET_TYPES } from 'src/environments/environment';
import { AccountProvider } from '../../providers';
import { AddressDialog } from '../address-dialog/component';
import { KeystoreDialog } from '../keystore-dialog/component';
import { SendDialog } from '../send-dialog/component';
import { SendMetaMaskDialog } from '../send-metamask-dialog';

@Component({
  selector: 'wallet-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class WalletComponent implements OnInit, OnDestroy {

  netWorkSubscription!: Subscription;

  walletTypes = WALLET_TYPES;

  balance: number | string = 0;
  ethBalance: number | string = 0;

  usdcBalance: number | string = 0;
  usdtBalance: number | string = 0;
  daiBalance: number | string = 0;

  currenciesObject = this.web3.currenciesObject;
  @Input('data') data!: IObjectKeys;
  translations: { [key: string]: string | Function | any } = this.activatedRoute.snapshot.data.sharedTranslations.walletComponent;

  constructor(
    private dialog: MatDialog,
    private mapProvider: MapProvider,
    public web3: Web3ClientProvider,
    private change: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private accountProvider: AccountProvider,
    @Inject(PLATFORM_ID) private platform: IObjectKeys,
    @Inject(LOCAL_STORAGE) private localStorage: IObjectKeys
  ) { }

  get address() {
    return this.web3.toHex(this.data?.address);
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platform)) {

      this.setBalance();
      this.netWorkSubscription = this.web3.changeNetwork.subscribe(() => {
        this.currenciesObject = this.web3.currenciesObject;
        this.setBalance();
        this.change.markForCheck();
      });

    }
  }

  ngOnDestroy(): void {
    if (this.netWorkSubscription) {
      this.netWorkSubscription.unsubscribe();
    }
  }

  setBalance() {
    const address = this.data.address;
    Promise.all([
      this.web3.getBalance(address),
      this.web3.getEthBalance(address),
      this.web3.getContractBalance({ address: this.web3.toHex(address), contract: this.currenciesObject.usdc }),
      this.web3.getContractBalance({ address: this.web3.toHex(address), contract: this.currenciesObject.usdt }),
      this.web3.getContractBalance({ address: this.web3.toHex(address), contract: this.currenciesObject.dai }),
    ]).then(([b, e, c, t, d]) => {
      this.balance = b;
      this.ethBalance = e;
      this.usdcBalance = c;
      this.usdtBalance = t;
      this.daiBalance = d;
      this.change.markForCheck();
    }).catch((e) => {
      console.log(e);
    });
  }

  exportPrivateKey() {
    this.dialog.open(KeystoreDialog, {
      autoFocus: false,
      scrollStrategy: new NoopScrollStrategy(),
      data: {
        translations: this.activatedRoute.snapshot.data.sharedTranslations,
        keyStore: this.data.keyStore,
      }
    });
  }

  send(key: string) {

    switch (this.data.type) {
      case (this.walletTypes.credi): {
        this.dialog.open(SendDialog, {
          scrollStrategy: new NoopScrollStrategy(),
          data: {
            translations: this.activatedRoute.snapshot.data.sharedTranslations.sendDialog,
            keyStore: this.data.keyStore,
            type: key
          }
        });
        break;
      }
      case (this.walletTypes.metamask): {
        this.dialog.open(SendMetaMaskDialog, {
          scrollStrategy: new NoopScrollStrategy(),
          data: {
            translations: this.activatedRoute.snapshot.data.sharedTranslations.sendDialog,
            address: this.address,
            type: key
          }
        });
        break;
      }
    }

  }

  receive() {
    this.dialog.open(AddressDialog, {
      scrollStrategy: new NoopScrollStrategy(),
      panelClass: "address-dialog",
      data: {
        address: this.address
      }
    });
  }

  onDelete() {

    switch (this.data.type) {
      case (this.walletTypes.credi): {
        this.dialog.open(ConfirmDialog, {
          width: '350px',
          scrollStrategy: new NoopScrollStrategy(),
          data: {
            title: this.translations['delete-dialog-title'],
            message: this.translations['delete-dialog-message'],
            buttons: [
              {
                label: this.translations['delete-dialog-cancel'],
              },
              {
                label: this.translations['delete-dialog-accept'],
                handler: () => {
                  return this.accountProvider.delete(this.data._id).subscribe();
                }
              }
            ]
          }
        });
        break;
      }
      case (this.walletTypes.metamask): {
        this.mapProvider.set(MapProvider.METAMASK, null);
        this.localStorage.removeItem(MapProvider.METAMASK);
        break;
      }
    }

  }

}
