import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { Component, ChangeDetectionStrategy, Inject, PLATFORM_ID, OnInit, OnDestroy, ChangeDetectorRef, NgZone, HostListener, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { track } from 'src/app/helpers/track';
import { LOCAL_STORAGE } from 'src/app/modules/local-storage';
import { WINDOW } from 'src/app/modules/window';
import { WithdrawDialog } from 'src/app/profile/shared/widthdraw-dialog';
import { LoaderProvider, MapProvider } from 'src/app/providers';
import { Web3ClientProvider } from 'src/app/providers/web3';
import { ConfirmDialog } from 'src/app/shared/confirm-dialog';
import { environment, METAMASK_ACTIONS, StakingContract, StakingNetwork } from 'src/environments/environment';

@Component({
  selector: 'dashboard-stake-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DashboardStakeComponent implements OnInit, OnDestroy {

  status: IObjectKeys = {
    '0': {
      key: '0',
      value: 'active'
    },
    '1': {
      key: '1',
      value: 'completed'
    }
  }

  address!: string;
  netWorkSubscription!: Subscription;
  walletSubscription!: Subscription;
  timer!: NodeJS.Timeout;
  timeCountDownListener!: NodeJS.Timer;

  time = 60 * 1000;
  available = 0;

  date!: number;
  timeValue!: number;
  dateTime!: string;

  error: string = '';

  canClose = true;
  disabled = false;
  isSubmitted = false;
  network = this.web3.network.name;
  production = environment.production;

  startDate!: Date;
  endDate!: Date;
  fullClaimDate!: Date;
  period!: number;
  fullClaimPeriod!: number;
  stakings!: IObjectKeys[];

  decimals = 18;
  maximumPeriod = 180;
  minimumStakingAmount: number = 1000;
  stakingNetwork = StakingNetwork;

  form = new UntypedFormGroup({
    wallet: new UntypedFormControl(null, [
      Validators.required
    ]),
    amount: new UntypedFormControl(null, [
      Validators.required,
      Validators.min(this.minimumStakingAmount)
    ])
  });

  track = track;

  currentDate = new Date();
  translations: { [key: string]: string | Function | any } = this.activateRoute.snapshot.data.translations;
  @ViewChild('formGroupDirective', { static: true }) formDirective!: FormGroupDirective;

  constructor(
    private zone: NgZone,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private loader: LoaderProvider,
    private web3: Web3ClientProvider,
    private mapProvider: MapProvider,
    private change: ChangeDetectorRef,
    private activateRoute: ActivatedRoute,
    @Inject(WINDOW) private window: IObjectKeys,
    @Inject(PLATFORM_ID) private platform: IObjectKeys,
    @Inject(LOCAL_STORAGE) private localStorage: Storage
  ) {

  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeClose($event: IObjectKeys) {
    return this.canClose;
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platform)) {

      this.web3.setMetamaskNetwork(StakingNetwork).then(() => {
        this.network = this.web3.network.name;
        this.init();
      }).catch((e) => {
        this.dialog.open(ConfirmDialog, {
          width: '350px',
          scrollStrategy: new NoopScrollStrategy(),
          data: {
            title: this.translations['alert-title'],
            message: this.translations['alert-message'],
            buttons: [
              {
                label: this.translations['alert-accept']
              }
            ]
          }
        });
      });

      this.walletSubscription = this.mapProvider.setSubsription(MapProvider.METAMASK).subscribe((item: string) => {
        this.init();
      });

      this.netWorkSubscription = this.web3.changeNetwork.subscribe(() => {
        this.network = this.web3.network.name;
        this.init();

        if (this.network != StakingNetwork) {
          this.stakings = [];
          this.available = 0;
          this.timeValue = -1;
          this.change.markForCheck();
          return this.dialog.open(ConfirmDialog, {
            width: '350px',
            scrollStrategy: new NoopScrollStrategy(),
            data: {
              title: this.translations['alert-title'],
              message: this.translations['alert-message'],
              buttons: [
                {
                  label: this.translations['alert-accept']
                }
              ]
            }
          });
        }
      });
    }
  }

  init() {

    if (this.timer) {
      clearInterval(this.timer);
    }

    if (this.timeCountDownListener) {
      clearInterval(this.timeCountDownListener);
    }

    if (this.network == StakingNetwork) {
      this.web3.stakingInstance.methods.getCurrentDate().call().then((item: number) => {
        this.currentDate = new Date(Number(item) * 1000);
      }).catch((e: Error) => console.log(e));

      this.address = this.mapProvider.get(MapProvider.METAMASK);
      this.form.get('amount')?.enable();

      this.setTimer();
      this.setContractParams();

      if (this.address) {
        this.setBalance();
        this.setStakings(this.address);
        this.form.get('wallet')?.setValue(this.address);
      }
    } else {
      this.form.get('amount')?.disable();
    }
  }

  ngOnDestroy(): void {
    if (this.netWorkSubscription) {
      this.netWorkSubscription.unsubscribe();
    }
    if (this.walletSubscription) {
      this.walletSubscription.unsubscribe();
    }
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (this.timeCountDownListener) {
      clearInterval(this.timeCountDownListener);
    }
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
            this.change.markForCheck();
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

  setBalance() {
    if (this.address) {
      this.web3.getBalance(this.address).then((balance) => {
        this.available = balance;
        this.form.get('amount')?.setValidators([
          Validators.required,
          Validators.max(this.available),
          Validators.min(1000)
        ])
        this.change.markForCheck();
      }).catch(e => console.log(e));
    }
  }

  setMaxBalance() {
    this.form.get('amount')?.setValue(Number(this.available));
  }

  setTimer() {
    if (isPlatformBrowser(this.platform)) {
      this.zone.runOutsideAngular(() => {

        this.timer = setInterval(() => {
          if (this.address) {
            this.setBalance();
            this.setStakings(this.address);
          }
        }, this.time);

        this.timeCountDownListener = setInterval(() => {
          this.timeValue = this.timeValue - 1000;
          this.zone.run(() => {
            this.dateTime = this.msToTime();
            this.change.markForCheck();
          });
        }, 1000);

      });
    }
  }

  setContractParams() {
    this.web3.getStakingContractParams().then(([params, startDate, endDate, currentDate]) => {
      const { [0]: token, [1]: period, [2]: claimPercent, [3]: fullClaimPeriod, [4]: minimumStakingAmount } = params;

      let fullClaimDate = new Date(endDate * 1000);
      fullClaimDate = new Date(fullClaimDate.setDate(fullClaimDate.getDate() + Number(fullClaimPeriod) + 1));
      this.date = currentDate * 1000;

      this.period = period;
      this.fullClaimPeriod = fullClaimPeriod;
      this.minimumStakingAmount = minimumStakingAmount;
      this.startDate = new Date(startDate * 1000);
      this.endDate = new Date(endDate * 1000);
      this.fullClaimDate = fullClaimDate;

      this.timeValue = this.endDate.getTime() - this.date;
      this.dateTime = this.msToTime();

      this.change.markForCheck();
    }).catch(e => console.log(e));
  }

  msToTime() {

    const ms = Math.abs(this.timeValue);

    const d = Math.floor(ms / 1000 / 60 / 60 / 24);
    const h = Math.floor((ms / 1000 / 60 / 60) - d * 24);
    const m = Math.floor((ms / 1000 / 60 / 60 - (d * 24) - h) * 60);
    const s = Math.floor(((ms / 1000 / 60 / 60 - (d * 24) - h) * 60 - m) * 60);

    // To get time format 00:00:00
    const days: string = d < 10 ? `0${d}` : `${d}`;
    const seconds: string = s < 10 ? `0${s}` : `${s}`;
    const minutes: string = m < 10 ? `0${m}` : `${m}`;
    const hours: string = h < 10 ? `0${h}` : `${h}`;

    let text = '';

    if (days != '00') {
      text += `${days}d `;
    }

    return `${text}${hours}:${minutes}:${seconds}`;
  }

  submit() {
    if (this.form.valid && this.timeValue > 0) {
      const { amount, wallet } = this.form.value;
      this.error = '';
      this.canClose = false;
      this.disabled = true;
      this.change.markForCheck();
      this.web3.approveMetamask({
        spender: StakingContract,
        from: wallet,
        amount
      }).then((rawData) => {
        this.loader.show();
        return this.window.ethereum
          .request({
            method: 'eth_sendTransaction',
            params: [rawData],
          })
      }).then((data) => {
        return this.checkTransaction(data).then((transaction: IObjectKeys) => {
          if (transaction?.status) {
            return transaction;
          }
          return this.checkTransactionListener(data);
        });
      }).then((tx) => {
        return this.web3.stakeMetamask({
          from: wallet,
          amount
        })
      }).then((rawData) => {
        return this.window.ethereum
          .request({
            method: 'eth_sendTransaction',
            params: [rawData],
          })
      }).then((data) => {
        return this.checkTransaction(data).then((transaction: IObjectKeys) => {
          if (transaction?.status) {
            return transaction;
          }
          return this.checkTransactionListener(data);
        });
      }).then(() => {
        return this.setStakings(wallet);
      }).then(() => {
        this.formDirective.resetForm();
        this.form.get('wallet')?.setValue(this.address);
        this.loader.hide();
      }).catch((e) => {
        this.error = e.message;
        this.loader.hide();
      }).finally(() => {
        this.canClose = true;
        this.disabled = false;
        this.change.markForCheck();
      });

    }
  }

  checkTransactionListener(hash: string) {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        this.web3.web3.eth.getTransactionReceipt(hash).then((transaction: IObjectKeys) => {
          if (transaction?.status) {
            clearInterval(interval);
            return resolve(transaction);
          }
        }).catch((e: Error) => {
          clearInterval(interval);
          return reject(e)
        });
      }, 1000);
    });
  }

  checkTransaction(hash: string) {
    return this.web3.web3.eth.getTransactionReceipt(hash);
  }

  setStakings(from: string) {
    this.web3.getStakings(from).then(([data, startStakingdate, currentDay, endDate, claims]) => {
      this.stakings = data.map((item: IObjectKeys) => {

        const rewards = Number(item.rewards.value) / (10 ** this.decimals);
        const statusKey = this.status[item.status].value;
        const claimIndex = claims.findIndex((e: IObjectKeys) => e.stakeIndex == item.index);

        const claim = claims[claimIndex];
        let currentTime = new Date(startStakingdate * 1000);
        currentTime = new Date(currentTime.setDate(currentTime.getDate() + Number(currentDay)));

        if (currentTime.getTime() > Number(endDate) * 1000) {
          currentTime = new Date(endDate * 1000);
        }

        if (claimIndex > -1) {
          claim.paidAmount = Number(claim.paidAmount) / (10 ** this.decimals);
          claim.total = Number(claim.total) / (10 ** this.decimals);
        }

        let createdAt = new Date(startStakingdate * 1000);

        createdAt = new Date(createdAt.setDate(createdAt.getDate() + Number(item.startDay)));

        item.rewards.value = rewards;
        item.amount = Number(item.amount) / (10 ** this.decimals);
        item.createdAt = createdAt;
        item.period = Math.floor((currentTime.getTime() - createdAt.getTime()) / (1000 * 24 * 60 * 60));
        item.apy = 0;
        item.statusName = this.translations[statusKey];
        item.endDate = new Date(endDate * 1000 + (1000 * 24 * 60 * 60));

        item.claim = claim;

        if (item.period > this.maximumPeriod) {
          item.period = this.maximumPeriod;
        }

        if (rewards > 0 && item.period > 0) {
          item.apy = rewards * 100 * 365 / (Number(item.amount)) / item.period;
        }
        return item;
      });
      this.change.markForCheck();
    }).catch((error: Error) => console.log(error));
  }

  requestClaim(s: IObjectKeys) {
    if (!s.rewards.claimable) {
      return this.dialog.open(ConfirmDialog, {
        width: '350px',
        scrollStrategy: new NoopScrollStrategy(),
        data: {
          title: this.translations['alert-claim-title'],
          message: this.translations['alert-claim-message'],
          buttons: [
            {
              label: this.translations['alert-claim-accept'],
            }
          ]
        }
      });
    }
    this.error = '';
    this.canClose = false;
    this.change.markForCheck();
    this.web3.requestClaim(
      this.address,
      s.index
    ).then((rawData) => {
      this.loader.show();
      return this.window.ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [rawData],
        })
    }).then((data) => {
      return this.checkTransaction(data).then((transaction: IObjectKeys) => {
        if (transaction?.status) {
          return transaction;
        }
        return this.checkTransactionListener(data);
      });
    }).then(() => {
      return this.setStakings(this.address);
    }).then(() => {
      this.loader.hide();
    }).catch((e) => {
      this.error = e.message;
      this.loader.hide();
    }).finally(() => {
      this.canClose = true;
      this.change.markForCheck();
    });

  }

  claim(s: IObjectKeys) {
    if (!s.claim?.claimable) {
      return this.dialog.open(ConfirmDialog, {
        width: '350px',
        scrollStrategy: new NoopScrollStrategy(),
        data: {
          title: this.translations['alert-claim-title'],
          message: this.translations['alert-claim-error-message']({ date: this.datePipe.transform(this.fullClaimDate, 'dd/MM/yyyy') }),
          buttons: [
            {
              label: this.translations['alert-claim-accept'],
            }
          ]
        }
      });
    }
    this.error = '';
    this.canClose = false;
    this.change.markForCheck();
    this.web3.claim(
      this.address,
      s.claim.requestIndex
    ).then((rawData) => {
      this.loader.show();
      return this.window.ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [rawData],
        })
    }).then((data) => {
      return this.checkTransaction(data).then((transaction: IObjectKeys) => {
        if (transaction?.status) {
          return transaction;
        }
        return this.checkTransactionListener(data);
      });
    }).then(() => {
      return this.setStakings(this.address);
    }).then(() => {
      this.loader.hide();
    }).catch((e) => {
      this.error = e.message;
      this.loader.hide();
    }).finally(() => {
      this.canClose = true;
      this.change.markForCheck();
    });

  }

  withdraw(s: IObjectKeys) {
    if (!s.rewards.claimable) {
      return this.dialog.open(WithdrawDialog, {
        autoFocus: false,
        scrollStrategy: new NoopScrollStrategy(),
        data: {
          translations: this.activateRoute.snapshot.data.sharedTranslations.withDrawDialog,
          item: s,
          handler: (check: boolean) => {
            if (check) {
              this.setStakings(this.address)
            }
          }
        }
      });
    }
    return this.dialog.open(ConfirmDialog, {
      width: '350px',
      scrollStrategy: new NoopScrollStrategy(),
      data: {
        title: this.translations['alert-withdraw-title'],
        message: this.translations['alert-withdraw-message'],
        buttons: [
          {
            label: this.translations['alert-withdraw-accept'],
          }
        ]
      }
    });
  }

  onDateChange() {
    if (!environment.production) {
      (this.web3 as any).web3.currentProvider.send({
        jsonrpc: '2.0',
        method: 'evm_setTime',
        params: [this.currentDate.getTime()],
        id: new Date().getTime()
      }, () => {
        (this.web3 as any).web3.currentProvider.send({
          jsonrpc: '2.0',
          method: 'evm_mine',
          id: 0
        }, (err: any, result: any) => {
          if (result) {
            this.setStakings(this.address);
          }
        });
      });
    }

  }

}
