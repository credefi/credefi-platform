import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Inject, OnDestroy, OnInit, PLATFORM_ID, NgZone, HostListener, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { METAMASK_ACTIONS } from 'src/environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { MatSlider } from '@angular/material/slider';
import { MatDialog } from '@angular/material/dialog';

import { IObjectKeys } from 'src/app/helpers/interfaces';
import { WINDOW } from 'src/app/modules/window';
import { LOCAL_STORAGE } from 'src/app/modules/local-storage';
import { MapProvider } from 'src/app/providers';
import { ConfirmDialog } from 'src/app/shared/confirm-dialog';
import { firstValueFrom, Subscription } from 'rxjs';
import { Web3ClientProvider } from 'src/app/providers/web3';
import { GeckoProvider, StakingProvider, TransactionProvider } from '../../providers';
import { TransactionTypes } from 'src/globals/config';

@Component({
  selector: 'module-x-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ModuleXComponent implements OnInit, OnDestroy {

  configuration: IObjectKeys;
  address!: string;
  subscription!: Subscription;

  canClose = true;
  time = 60 * 1000;
  timer!: NodeJS.Timeout;
  networkSubscribtion!: Subscription;

  error = '';
  isSubmitted = false;
  available = 0;
  stakingBalance = 0;
  price = 0.014;
  myStakedBalance = 0;

  form = new UntypedFormGroup({
    wallet: new UntypedFormControl(null, [
      Validators.required
    ]),
    amount: new UntypedFormControl({
      value: null,
      disabled: true
    }, [
      Validators.required
    ]),
    months: new UntypedFormControl(6, [
      Validators.required,
      Validators.max(60),
      Validators.min(6)
    ])
  })

  translations: { [key: string]: string | Function | any } = this.activateRoute.snapshot.data.translations;
  @ViewChild(MatSlider, { static: true }) slider!: MatSlider;

  constructor(
    private zone: NgZone,
    private dialog: MatDialog,
    private gecko: GeckoProvider,
    private mapProvider: MapProvider,
    private web3: Web3ClientProvider,
    private change: ChangeDetectorRef,
    private activateRoute: ActivatedRoute,
    private stakingProvider: StakingProvider,
    @Inject(WINDOW) private window: IObjectKeys,
    @Inject(PLATFORM_ID) private platformId: Object,
    private transactionProvider: TransactionProvider,
    @Inject(LOCAL_STORAGE) private localStorage: Storage
  ) {
    const { configuration, price = {} } = this.activateRoute.snapshot.data;

    const { credefi } = price;
    this.price = credefi.usd;
    this.configuration = configuration;
    this.form.disable();

  }

  ngOnInit() {

    if (isPlatformBrowser(this.platformId)) {

      this.setTimer();

      this.address = this.mapProvider.get(MapProvider.METAMASK);
      if (this.address) {
        this.setBalance();
        this.form.get('wallet')?.setValue(this.address);
      }

      this.setStakingBalance();
      this.subscription = this.mapProvider.setSubsription(MapProvider.METAMASK).subscribe((item: string) => {
        this.address = item;
        this.setBalance()
        this.form.get('wallet')?.setValue(this.address);
        this.change.markForCheck();
      });

      this.networkSubscribtion = this.web3.changeNetwork.subscribe(() => {
        this.setPrice();
        this.setBalance();
        this.setStakingBalance();
      });

    }

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeClose($event: IObjectKeys) {
    return this.canClose;
  }

  connect() {

    if (this.window?.ethereum?.isMetaMask) {
      return this.window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((data: string[]) => {
          const item: string = data?.[0];
          if (item != null) {
            this.form.get('wallet')?.setValue(item);
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

  setMonths(event: IObjectKeys) {
    this.form.get('months')?.setValue(event.source.value);
  }

  submit() {

    // if (this.form.valid) {

    //   this.error = '';
    //   this.isSubmitted = true;
    //   this.change.markForCheck();
      
    //   const { amount, months, wallet } = this.form.value;
    //   this.canClose = false;
    //   this.web3.sendCustomCoinMetamask({
    //     amount: amount,
    //     contract: { address: this.web3.network.Contract, ABI: this.web3.network.ABI },
    //     from: wallet,
    //     to: this.configuration.crediStakingAddress,
    //     noncePlus: 0
    //   }).then((rawData) => {
    //     return this.window.ethereum
    //       .request({
    //         method: 'eth_sendTransaction',
    //         params: [rawData],
    //       })
    //   }).then((tx) => {
    //     return Promise.all([
    //       firstValueFrom(this.stakingProvider.post({ amount, months, address: wallet, chain: this.web3.network.name })).catch(e => console.log(e)),
    //       firstValueFrom(this.transactionProvider.post({
    //         currency: 'credi',
    //         transaction: tx,
    //         from: wallet,
    //         to: this.configuration.crediStakingAddress,
    //         value: Number(amount),
    //         type: TransactionTypes.send.key
    //       })).catch(e => console.log(e))
    //     ])
    //   }).then(() => {
    //     this.form.patchValue({
    //       wallet: this.address,
    //       months: 6,
    //       amount: 0
    //     });
    //     this.isSubmitted = false;
    //     this.slider.value = 6;
    //     this.change.markForCheck();

    //   }).catch((e) => this.error = e.message).finally(() => {
    //     this.canClose = true;
    //     this.change.markForCheck();
    //   });
    // }
  }

  setBalance() {
    if(this.address){
      this.web3.getBalance(this.address).then((balance) => {
        this.available = balance;
        this.form.get('amount')?.setValidators([
          Validators.required,
          Validators.max(this.available)
  
        ])
        this.change.markForCheck();
      }).catch(e => console.log(e));
      this.stakingProvider.getBalance({ address: this.address, chain: this.web3.network.name }).subscribe((result) => {
        if (result) {
          this.myStakedBalance = result;
          this.change.markForCheck();
        }
      })
    }
  }

  setStakingBalance() {
    this.web3.getBalance(this.configuration.crediStakingAddress).then((balance) => {
      this.stakingBalance = balance;
      this.change.markForCheck();
    }).catch(e => console.log(e));
  }

  setMaxBalance() {
    this.form.get('amount')?.setValue(Number(this.available));
  }

  setPrice() {
    this.gecko.get().subscribe((data: IObjectKeys) => {
      this.price = data.credefi.usd;
      this.change.markForCheck();
    });
  }

  setTimer() {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        this.timer = setInterval(() => {
          if (this.address) {
            this.setBalance();
          }
          this.setPrice();
          this.setStakingBalance();
        }, this.time);
      });
    }
  }


}
