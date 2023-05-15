import { isPlatformBrowser } from '@angular/common';
import { Component, ChangeDetectionStrategy, OnDestroy, OnInit, PLATFORM_ID, Inject, ChangeDetectorRef, NgZone, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { WalletComponent } from 'src/app/profile/shared/wallet-component/component';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { trackById } from 'src/app/helpers/track';
import { SocketProvider } from 'src/app/profile/providers';
import { MapProvider } from 'src/app/providers';
import { Web3ClientProvider } from 'src/app/providers/web3';
import { WALLET_TYPES } from 'src/environments/environment';

@Component({
  selector: 'info-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class InfoComponent implements OnInit, OnDestroy {

  balance = 0;
  usdtBalance = 0;

  time = 60 * 1000;
  timer!: NodeJS.Timeout;
  currenciesObject = this.web3.currenciesObject;

  accounts!: IObjectKeys[];
  postAccount!: Subscription;
  deleteAccount!: Subscription;
  metamMaskSubscription!: Subscription;
  netWorkSubscription!: Subscription;

  trackById = trackById;

  translations: { [key: string]: string | Function | any } = this.activateRoute.snapshot.data.translations;
  @ViewChildren(WalletComponent) wallets!: QueryList<WalletComponent>;

  constructor(
    private zone: NgZone,
    private mapProvider: MapProvider,
    private web3: Web3ClientProvider,
    private change: ChangeDetectorRef,
    private activateRoute: ActivatedRoute,
    private socketProvider: SocketProvider,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.setWallets();
  }

  ngOnInit() {

    if (isPlatformBrowser(this.platformId)) {

      this.setTimer();
      this.resetBalance();

      this.postAccount = this.socketProvider.postAccount.subscribe((account) => {
        this.accounts.unshift(account);
        this.resetBalance();
      });

      this.deleteAccount = this.socketProvider.deleteAccount.subscribe((data) => {
        for (let i = 0; i < this.accounts.length; i++) {
          if (data.accountId == this.accounts[i]._id) {
            this.accounts.splice(i, 1);
            this.resetBalance();
          }
        }
      });

      this.metamMaskSubscription = this.mapProvider.setSubsription(MapProvider.METAMASK).subscribe(() => {
        this.setWallets();
        this.resetBalance();
        this.change.markForCheck();
      });

      this.netWorkSubscription = this.web3.changeNetwork.subscribe(() => {
        this.currenciesObject = this.web3.currenciesObject;
        this.setWallets();
        this.resetBalance();
      });

    }

  }

  ngOnDestroy() {
    if (this.postAccount) {
      this.postAccount.unsubscribe();
    }
    if (this.deleteAccount) {
      this.deleteAccount.unsubscribe();
    }
    if (this.metamMaskSubscription) {
      this.metamMaskSubscription.unsubscribe();
    }
    if (this.netWorkSubscription) {
      this.netWorkSubscription.unsubscribe();
    }
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  setWallets() {
    const { accounts } = this.activateRoute.snapshot.data;
    const metamask = this.mapProvider.get(MapProvider.METAMASK);
    this.accounts = accounts.map((item: IObjectKeys) => {
      item.type = WALLET_TYPES.credi;
      return item;
    });
    if (metamask) {
      this.accounts.unshift({
        name: 'Metamask wallet',
        address: metamask,
        type: WALLET_TYPES.metamask
      })
    }

  }

  setTimer() {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        this.timer = setInterval(() => {
          this.wallets.toArray().forEach(item => {
            this.zone.run(() => {
              item.setBalance();
            });
          });
          this.resetBalance();
        }, this.time);
      });
    }
  }

  resetBalance() {

    const set: Set<string> = new Set();
    this.accounts.forEach((a) => set.add(this.web3.toHex(a.address).toLowerCase()));
    const accounts: string[] = Array.from(set);

    const promises = accounts.map((a) => this.web3.getBalance(a));
    const promisesUSDC = accounts.map((a) => this.web3.getContractBalance({ address: this.web3.toHex(a), contract: this.currenciesObject.usdc }));
    const promisesUSDT = accounts.map((a) => this.web3.getContractBalance({ address: this.web3.toHex(a), contract: this.currenciesObject.usdt }));
    const promisesDAI = accounts.map((a) => this.web3.getContractBalance({ address: this.web3.toHex(a), contract: this.currenciesObject.dai }));

    Promise.all([
      Promise.all(promises),
      Promise.all(promisesUSDC),
      Promise.all(promisesUSDT),
      Promise.all(promisesDAI),
    ]).then(([balance, usdc, usdt, dai]) => {

      this.balance = balance.reduce<number>((price, value) => {
        return price + Number(value);
      }, 0);

      const usdcBalance = usdc.reduce<number>((price, value) => {
        return price + Number(value);
      }, 0);

      const usdtBalance = usdt.reduce<number>((price, value) => {
        return price + Number(value);
      }, 0);

      const daiBalance = dai.reduce<number>((price, value) => {
        return price + Number(value);
      }, 0);

      this.usdtBalance = usdcBalance + usdtBalance + daiBalance;

    }).catch(e => console.log(e)).finally(() => this.change.markForCheck());

  }

  resetBalance2() {
    const set: Set<string> = new Set();
    this.accounts.forEach((a) => set.add(this.web3.toHex(a.address).toLowerCase()));
    const accounts: string[] = Array.from(set);

    const batch = new this.web3.web3.BatchRequest();
    this.web3.getContractDecimal({ contract: this.currenciesObject.usdc, batch }).then((data) => {
    }).catch(e => console.log(e))

    batch.execute();
    // const promisesUSDC = accounts.map((a) => this.web3.getContractBalance({ address: this.web3.toHex(a), contract: currenciesObject.usdc }));

  }

}
