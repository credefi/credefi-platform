import { Component, ChangeDetectionStrategy, PLATFORM_ID, Inject, ElementRef, ViewChild, ChangeDetectorRef, OnDestroy, OnInit, HostListener } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { MatStepper } from '@angular/material/stepper';
import { MatDialog } from '@angular/material/dialog';

import { ChartTypeRegistry } from 'chart.js';
import { firstValueFrom, skip, Subscription } from 'rxjs';

import Chart from 'chart.js/auto'

import { IObjectKeys } from 'src/app/helpers/interfaces';
import { Web3ClientProvider } from 'src/app/providers/web3';
import { networks, WALLET_TYPES, MinimumMercuryo, MercuryoChain } from 'src/environments/environment';
import { KycProvider, LendingProvider, PaymentProvider, TransactionProvider } from '../../providers';
import { orderKeyValue, trackByKey } from 'src/app/helpers/track';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { DecryptDialog } from '../../shared/decrypt-dialog/component';
import { MapProvider, UserProvider } from 'src/app/providers';
import { WINDOW } from 'src/app/modules/window';
import { Mercuryo, TransactionTypes } from 'src/globals/config';
import { LendAcceptDialog } from '../../shared/lend-accept-dialog/component';
import { maxLendAmount } from 'src/app/helpers/maxLendAmount';
import { ConfirmDialog } from 'src/app/shared/confirm-dialog';
import { validateKYC } from 'src/app/helpers/kycValidator';

@Component({
  selector: 'lend-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LendComponent implements OnInit, OnDestroy {

  ref_actions = {
    "OK": "✔",
    "DELETE": "✖"
  }

  referral!: IObjectKeys | null;

  error = '';
  walletTypes = WALLET_TYPES;

  minimumMercuryo = MinimumMercuryo;
  mercuryoChain = MercuryoChain;

  kycVerified = false;
  accounts!: IObjectKeys[];
  currencies: IObjectKeys = this.web3.currenciesObject;

  configuration: IObjectKeys;

  mercuryo = Mercuryo;

  formOne = new UntypedFormGroup({
    currency: new UntypedFormControl(null, [
      Validators.required
    ]),
    wallet: new UntypedFormControl(null, [
      Validators.required,
    ]),
    amount: new UntypedFormControl(null, [

    ]),
    referral: new UntypedFormControl(null, [

    ]),
    promocode: new UntypedFormControl(null, [

    ]),
    months: new UntypedFormControl(12, [
      Validators.required,
      Validators.max(240)
    ]),

  });

  groupOne = 0;
  groupTwo = 0;
  groupThree = 0;
  groupFour = 0;
  isSubmit = false;
  allocationPercent = 100;
  dataSet: string[] = ['0', '0', '0', '0'];

  routerSubscription!: Subscription;
  metamMaskSubscription!: Subscription;
  networkSubscription!: Subscription;

  chart!: Chart<keyof ChartTypeRegistry, string[], string>;
  @ViewChild(MatStepper, { static: true }) stepper!: MatStepper;
  @ViewChild('chartElement', { static: true }) chartElement!: ElementRef<HTMLCanvasElement>;
  @ViewChild('formGroupDirective', { static: true }) formDirective!: FormGroupDirective;

  translations: { [key: string]: string | Function | any } = this.activateRoute.snapshot.data.translations;

  orderKeyValue = orderKeyValue;
  trackByKey = trackByKey;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private user: UserProvider,
    private payment: PaymentProvider,
    private KycProvider: KycProvider,
    private mapProvider: MapProvider,
    private web3: Web3ClientProvider,
    private change: ChangeDetectorRef,
    public activateRoute: ActivatedRoute,
    private lendingProvider: LendingProvider,
    @Inject(WINDOW) private window: IObjectKeys,
    @Inject(PLATFORM_ID) private platformId: Object,
    private transactionProvider: TransactionProvider,
  ) {

    const { configuration, kycVerified, code } = this.activateRoute.snapshot.data;

    this.kycVerified = kycVerified;
    this.setWallets();
    this.configuration = configuration;

    if(this.activateRoute.snapshot.params.referral){
      const { referral } = this.activateRoute.snapshot.data;
      if(referral){
        this.setReferral(referral)
      }else{
        this.alertRef();
      }
    }

    if (!this.kycVerified) {
      this.formOne.get('amount')?.setValidators([
        Validators.required,
        Validators.min(100),
        validateKYC(this.configuration.maxLendingAmount)
      ])
    }

    if(code){
      this.formOne.get('promocode')?.setValue(this.activateRoute.snapshot.params.code);
      this.configuration.groupOneInterest += code.promotion;
      this.configuration.groupTwoInterest += code.promotion;
      this.configuration.groupThreeInterest += code.promotion;
      this.configuration.groupFourInterest += code.promotion;
    }

  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeClose($event: IObjectKeys) {
    return !this.isSubmit;
  }

  ngOnInit() {

    if (isPlatformBrowser(this.platformId)) {
      this.metamMaskSubscription = this.mapProvider.setSubsription(MapProvider.METAMASK).subscribe(() => {
        this.setWallets();
        this.change.markForCheck();
      });

      this.networkSubscription = this.web3.changeNetwork.subscribe(() => {
        this.formDirective.resetForm();
        this.change.markForCheck();
      });

      this.routerSubscription = this.activateRoute.params.pipe(skip(1)).subscribe((data) => {
        const { referral = "" } = data;
        if (referral.length > 0) {
          this.user.getReferral({hash: referral}).subscribe(({result}) => {
            if(result){
              this.setReferral(result);
            }else{
              this.alertRef();
            }
          });
        }
      });

    }
  }

  ngOnDestroy() {

    if (isPlatformBrowser(this.platformId)) {
      this.chart?.destroy();
    }
    if (this.metamMaskSubscription) {
      this.metamMaskSubscription.unsubscribe();
    }
    if (this.networkSubscription) {
      this.networkSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
 
  setWallets() {
    const { accounts } = this.activateRoute.snapshot.data;
    const metamask = this.mapProvider.get(MapProvider.METAMASK);
    this.accounts = accounts.map((item: IObjectKeys) => {
      item.type = WALLET_TYPES.credi;
      item.address = this.web3.toHex(item.address);
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

  formatLabel = (value: number) => {
    return `${value}%`;
  }

  sliderMonths = (value: number) => {
    if (value == 1) {
      return `${value}M`;
    }
    return `${value}M`;
  }

  calculateOne(event: IObjectKeys) {
    const amount = this.groupTwo + this.groupThree + this.groupFour;
    this.check(event, amount);
    const arrData = [event.source.value, this.groupTwo, this.groupThree, this.groupFour];
    this.updateDataSet(arrData);
  }

  calculateTwo(event: IObjectKeys) {
    const amount = this.groupOne + this.groupThree + this.groupFour;
    this.check(event, amount);
    const arrData = [this.groupOne, event.source.value, this.groupThree, this.groupFour];
    this.updateDataSet(arrData);
  }

  calculateThree(event: IObjectKeys) {
    const amount = this.groupOne + this.groupTwo + this.groupFour;
    this.check(event, amount);
    const arrData = [this.groupOne, this.groupTwo, event.source.value, this.groupFour];
    this.updateDataSet(arrData);
  }

  calculateFour(event: IObjectKeys) {
    const amount = this.groupOne + this.groupTwo + this.groupThree;
    this.check(event, amount);
    const arrData = [this.groupOne, this.groupTwo, this.groupThree, event.source.value];
    this.updateDataSet(arrData);
  }

  check(event: IObjectKeys, amount: number) {
    const max = this.allocationPercent - amount;
    if (event.value > max) {
      event.source.value = max;
    }
  }

  updateDataSet(arr: number[]) {
    this.dataSet = arr.map(e => e.toString());
  }

  get walletAddress() {
    const { wallet } = this.formOne.value;
    return wallet?.address;
  }

  get currency() {
    const { currency } = this.formOne.value;
    switch (currency) {
      case (Mercuryo.key): {
        return this.mercuryo.data.currency;
      }
      default: {
        return this.web3.currenciesObject[currency as keyof typeof this.web3.currenciesObject]?.name
      }
    }
  }

  get amount() {
    const { amount } = this.formOne.value;
    return amount;
  }

  get months() {
    const { months } = this.formOne.value;
    return months;
  }

  stepTwoDisable() {
    const amount = this.groupOne + this.groupTwo + this.groupThree + this.groupFour
    if (amount == 100) {
      return false;
    }
    return true;
  }

  calculateGroupOne() {
    if (this.months > 0 && this.amount > 0) {
      const amount = this.amount * this.groupOne / 100;
      return (amount * (this.months / 12) * ((this.configuration.groupOneInterest) / 100)).toFixed(6);
    }
    return 0;
  }

  calculateGroupTwo() {
    if (this.months > 0 && this.amount > 0) {
      const amount = this.amount * this.groupTwo / 100;
      return (amount * (this.months / 12) * ((this.configuration.groupTwoInterest) / 100)).toFixed(6);
    }
    return 0;
  }

  calculateGroupThree() {
    if (this.months > 0 && this.amount > 0) {
      const amount = this.amount * this.groupThree / 100;
      return (amount * (this.months / 12) * ((this.configuration.groupThreeInterest) / 100)).toFixed(6);
    }
    return 0;
  }

  calculateGroupFour() {
    if (this.months > 0 && this.amount > 0) {
      const amount = this.amount * this.groupFour / 100;
      return (amount * (this.months / 12) * ((this.configuration.groupFourInterest) / 100)).toFixed(6);
    }
    return 0;
  }

  chartParser() {
    if (this.stepper.selectedIndex == 2) {
      const data = {
        labels: [
          `${this.configuration.groupOneName} ${this.dataSet[0]}%`,
          `${this.configuration.groupTwoName} ${this.dataSet[1]}%`,
          `${this.configuration.groupThreeName} ${this.dataSet[2]}%`,
          `${this.configuration.groupFourName} ${this.dataSet[3]}%`
        ],
        datasets: [
          {
            data: this.dataSet,
            backgroundColor: ['#1f3c87', '#4c639f', '#48b9ff', '#a5b1cf']
          }
        ]
      };

      this.chart = new Chart(this.chartElement.nativeElement, {
        type: 'doughnut',
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                color: '#181818',
                pointStyle: 'dot',
                usePointStyle: true,
                font: {
                  size: 12,
                  weight: '300'
                },
              }
            },
            title: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  return ` ${context.label}`;
                }
              }
            }
          }
        }
      });
    } else {
      this.chart?.destroy()
    }
  }

  setCurrency() {

    const { currency } = this.formOne.value;

    switch (currency) {
      case (Mercuryo.key): {
        return this.setMaxValidator();
      }
      default: {
        const promises = this.accounts.map((item) => {

          return this.web3.getContractBalance({
            contract: this.web3.currenciesObject[currency as keyof typeof this.web3.currenciesObject],
            address: item.address
          }).then((amount) => {
            item[`amount${currency}`] = amount;
          });
        });

        return Promise.all(promises).then(() => {
          this.setMaxValidator();
          this.change.markForCheck();
        }).catch((e) => console.log(e));
      }
    }

  }

  setMercuryoValidator() {
    const control = this.formOne.get('amount');
    const validator = [
      Validators.required,
      Validators.min(this.minimumMercuryo),
    ];

    if (!this.kycVerified) {
      validator.push(validateKYC(this.configuration.maxLendingAmount));
    }

    control?.setValidators(validator);
    control?.setValue(null);
  }

  setDefaultValidator() {
    const { wallet, currency } = this.formOne.value;
    if (wallet) {
      let { [`amount${currency}`]: amount } = wallet;

      const control = this.formOne.get('amount');
      const validator = [
        Validators.required,
        Validators.min(100),
        maxLendAmount(amount)
      ];

      if (!this.kycVerified) {
        validator.push(validateKYC(this.configuration.maxLendingAmount));
      }

      control?.setValidators(validator);
      control?.setValue(null);
    }
  }

  setMaxValidator() {

    const { currency } = this.formOne.value;
    switch (currency) {
      case (Mercuryo.key): {
        return this.setMercuryoValidator();
      }
      default: {
        return this.setDefaultValidator();
      }
    }

  }

  submit() {
    const groupOneAmount = this.amount * this.groupOne / 100;
    const groupTwoAmount = this.amount * this.groupTwo / 100;
    const groupThreeAmount = this.amount * this.groupThree / 100;
    const groupFourAmount = this.amount * this.groupFour / 100;
    const { currency, months, wallet, referral } = this.formOne.value;
    const promocode = this.formOne.get('promocode')?.value;

    this.error = '';
    this.isSubmit = true;
    this.change.markForCheck();

    switch (currency) {
      case (Mercuryo.key): {
        return this.lendingProvider.post({
          walletAddress: wallet.address,
          currencyAddress: this.web3.currenciesObject[this.mercuryo.data.currency.toLowerCase()].address,
          months: months,
          referral: referral,
          groupOneAmount,
          groupTwoAmount,
          groupThreeAmount,
          groupFourAmount,
          chain: this.mercuryoChain,
          type: Mercuryo.key,
          promocode
        }).subscribe(({ result }) => {

          const amount = groupOneAmount + groupTwoAmount + groupThreeAmount + groupFourAmount;

          this.isSubmit = false;
          this.sendMercuryo(result, amount);
          this.change.markForCheck();
        });
      }
      default: {
        return this.lendingProvider.post({
          walletAddress: wallet.address,
          currencyAddress: this.web3.currenciesObject[currency as keyof typeof this.web3.currenciesObject].address,
          months: months,
          referral: referral,
          groupOneAmount,
          groupTwoAmount,
          groupThreeAmount,
          groupFourAmount,
          chain: this.web3.network.name,
          promocode
        }).subscribe(({ result }) => {
          if (result) {
            switch (wallet.type) {
              case (WALLET_TYPES.credi): {
                return this.send({ groupOneAmount, groupTwoAmount, groupThreeAmount, groupFourAmount, loan: result });
              }
              case (WALLET_TYPES.metamask): {
                return this.sendWithMetamask({ groupOneAmount, groupTwoAmount, groupThreeAmount, groupFourAmount, loan: result });
              }
            }

          }
          this.isSubmit = false;
          this.change.markForCheck();
        });
      }
    }


    // this.dialog.open(LendAcceptDialog, {
    //   scrollStrategy: new NoopScrollStrategy(),
    //   disableClose: true,
    //   autoFocus: false,
    //   data: {
    //     translations: this.activateRoute.snapshot.data.sharedTranslations.lendAcceptDialog,
    //     groupOneAmount,
    //     groupTwoAmount,
    //     groupThreeAmount,
    //     groupFourAmount,
    //     configuration: this.configuration,
    //     currency,
    //     months,
    //     callback: () => {

    //       this.error = '';
    //       this.isSubmit = true;
    //       this.change.markForCheck();

    //       return this.lendingProvider.post({
    //         walletAddress: wallet.address,
    //         currencyAddress: this.web3.currenciesObject[currency as keyof typeof this.web3.currenciesObject].address,
    //         months: months,
    //         groupOneAmount,
    //         groupTwoAmount,
    //         groupThreeAmount,
    //         groupFourAmount,
    //         chain: this.web3.network.name
    //       }).subscribe(({ result }) => {
    //         if (result) {
    //           switch (wallet.type) {
    //             case (WALLET_TYPES.credi): {
    //               return this.send({ groupOneAmount, groupTwoAmount, groupThreeAmount, groupFourAmount, loan: result });
    //             }
    //             case (WALLET_TYPES.metamask): {
    //               return this.sendWithMetamask({ groupOneAmount, groupTwoAmount, groupThreeAmount, groupFourAmount, loan: result });
    //             }
    //           }

    //         }
    //         this.isSubmit = false;
    //         this.change.markForCheck();
    //       });

    //     }
    //   }
    // })


  }

  sendMercuryo(data: IObjectKeys, amount: number) {
    this.payment.getHashedAddress().subscribe(({ result }) => {
      let href = `${Mercuryo.host}?`;
      const user = this.mapProvider.get(MapProvider.USER);

      for (const key in Mercuryo.data) {
        href += `${key}=${Mercuryo.data[key as keyof typeof Mercuryo.data]}&`;
      }

      href += `merchant_transaction_id=${data._id}&amount=${amount.toFixed(6)}&email=${user.email}&address=${this.configuration.mercuryoioLendingAddress}&signature=${result}`;

      this.window.location = href;
    });

  }

  send({ groupOneAmount, groupTwoAmount, groupThreeAmount, groupFourAmount, loan }: { groupOneAmount: number, groupTwoAmount: number, groupThreeAmount: number, groupFourAmount: number, loan: IObjectKeys }) {
    const { wallet, currency } = this.formOne.value;
    const c = this.web3.currenciesObject[currency as keyof typeof this.web3.currenciesObject];
    return this.dialog.open(DecryptDialog, {
      scrollStrategy: new NoopScrollStrategy(),
      disableClose: true,
      data: {
        translations: this.activateRoute.snapshot.data.sharedTranslations.decryptDialog,
        keyStore: wallet?.keyStore,
        callback: (data: string) => {
          const promises = [];
          let noncePlus = 0;

          if (groupOneAmount > 0) {
            promises.push(this.web3.sendCustomCoin({
              privateKey: data,
              amount: groupOneAmount,
              contract: c,
              from: wallet?.address,
              to: this.configuration.groupOne,
              noncePlus: noncePlus
            }).then((item) => {
              return firstValueFrom(this.transactionProvider.post({
                currency: c.key,
                transaction: item.transactionHash,
                from: wallet?.address,
                to: this.configuration.groupOne,
                value: Number(groupOneAmount),
                type: TransactionTypes.send.key
              })).then(() => {
                return firstValueFrom(this.lendingProvider.putTransaction({
                  key: loan.key,
                  name: 'groupOne',
                  data: {
                    transactionHash: item.transactionHash
                  }
                }));
              });
            }));
            noncePlus++;
          }

          if (groupTwoAmount > 0) {
            promises.push(this.web3.sendCustomCoin({
              privateKey: data,
              amount: groupTwoAmount,
              contract: c,
              from: wallet?.address,
              to: this.configuration.groupTwo,
              noncePlus
            }).then((item) => {
              return firstValueFrom(this.transactionProvider.post({
                currency: c.key,
                transaction: item.transactionHash,
                from: wallet?.address,
                to: this.configuration.groupTwo,
                value: Number(groupTwoAmount),
                type: TransactionTypes.send.key
              })).then(() => {
                return firstValueFrom(this.lendingProvider.putTransaction({
                  key: loan.key,
                  name: 'groupTwo',
                  data: {
                    transactionHash: item.transactionHash
                  }
                }));
              });
            }));
            noncePlus++;
          }

          if (groupThreeAmount > 0) {
            promises.push(this.web3.sendCustomCoin({
              privateKey: data,
              amount: groupThreeAmount,
              contract: c,
              from: wallet?.address,
              to: this.configuration.groupThree,
              noncePlus
            }).then((item) => {
              return firstValueFrom(this.transactionProvider.post({
                currency: c.key,
                transaction: item.transactionHash,
                from: wallet?.address,
                to: this.configuration.groupThree,
                value: Number(groupThreeAmount),
                type: TransactionTypes.send.key
              })).then(() => {
                return firstValueFrom(this.lendingProvider.putTransaction({
                  key: loan.key,
                  name: 'groupThree',
                  data: {
                    transactionHash: item.transactionHash
                  }
                }));
              });
            }));
            noncePlus++
          }

          if (groupFourAmount > 0) {
            promises.push(this.web3.sendCustomCoin({
              privateKey: data,
              amount: groupFourAmount,
              contract: c,
              from: wallet?.address,
              to: this.configuration.groupFour,
              noncePlus
            }).then((item) => {
              return firstValueFrom(this.transactionProvider.post({
                currency: c.key,
                transaction: item.transactionHash,
                from: wallet?.address,
                to: this.configuration.groupFour,
                value: Number(groupFourAmount),
                type: TransactionTypes.send.key
              })).then(() => {
                return firstValueFrom(this.lendingProvider.putTransaction({
                  key: loan.key,
                  name: 'groupFour',
                  data: {
                    transactionHash: item.transactionHash
                  }
                }));
              });
            }));
          }

          return Promise.all(promises).then(() => {
            this.router.navigateByUrl('/profile/loans/lent/portfolio');
          }).catch((e) => this.error = e.message);
        }
      }
    }).afterClosed().subscribe((data) => {
      this.isSubmit = false;
      this.change.markForCheck();
    });
  }

  sendWithMetamask({ groupOneAmount, groupTwoAmount, groupThreeAmount, groupFourAmount, loan }: { groupOneAmount: number, groupTwoAmount: number, groupThreeAmount: number, groupFourAmount: number, loan: IObjectKeys }) {
    const promises = [];
    let noncePlus = 0;

    const { wallet, currency } = this.formOne.value;
    const c = this.web3.currenciesObject[currency as keyof typeof this.web3.currenciesObject];

    if (groupOneAmount > 0) {
      promises.push(this.web3.sendCustomCoinMetamask({
        amount: groupOneAmount,
        contract: c,
        from: wallet?.address,
        to: this.configuration.groupOne,
        noncePlus: noncePlus
      }).then((rawData) => {
        return this.window.ethereum
          .request({
            method: 'eth_sendTransaction',
            params: [rawData],
          })
      }).then((tx) => {
        return Promise.all([
          firstValueFrom(this.lendingProvider.putTransaction({
            key: loan.key,
            name: 'groupOne',
            data: {
              transactionHash: tx
            }
          })),
          firstValueFrom(this.transactionProvider.post({
            currency: c.key,
            transaction: tx,
            from: wallet?.address,
            to: this.configuration.groupOne,
            value: Number(groupOneAmount),
            type: TransactionTypes.send.key
          }))
        ])
      }));
      noncePlus++;
    }

    if (groupTwoAmount > 0) {
      promises.push(this.web3.sendCustomCoinMetamask({
        amount: groupTwoAmount,
        contract: c,
        from: wallet?.address,
        to: this.configuration.groupTwo,
        noncePlus
      }).then((rawData) => {
        return this.window.ethereum
          .request({
            method: 'eth_sendTransaction',
            params: [rawData],
          })
      }).then((tx) => {
        return Promise.all([
          firstValueFrom(
            this.lendingProvider.putTransaction({
              key: loan.key,
              name: 'groupTwo',
              data: {
                transactionHash: tx
              }
            })),
          firstValueFrom(this.transactionProvider.post({
            currency: c.key,
            transaction: tx,
            from: wallet?.address,
            to: this.configuration.groupTwo,
            value: Number(groupTwoAmount),
            type: TransactionTypes.send.key
          }))
        ]);
      }));
      noncePlus++;
    }

    if (groupThreeAmount > 0) {
      promises.push(this.web3.sendCustomCoinMetamask({
        amount: groupThreeAmount,
        contract: c,
        from: wallet?.address,
        to: this.configuration.groupThree,
        noncePlus: noncePlus
      }).then((rawData) => {
        return this.window.ethereum
          .request({
            method: 'eth_sendTransaction',
            params: [rawData],
          })
      }).then((tx) => {
        return Promise.all([
          firstValueFrom(this.lendingProvider.putTransaction({
            key: loan.key,
            name: 'groupThree',
            data: {
              transactionHash: tx
            }
          })),
          firstValueFrom(this.transactionProvider.post({
            currency: c.key,
            transaction: tx,
            from: wallet?.address,
            to: this.configuration.groupThree,
            value: Number(groupThreeAmount),
            type: TransactionTypes.send.key
          }))
        ])
      }));
      noncePlus++
    }

    if (groupFourAmount > 0) {
      promises.push(this.web3.sendCustomCoinMetamask({
        amount: groupFourAmount,
        contract: c,
        from: wallet?.address,
        to: this.configuration.groupFour,
        noncePlus
      }).then((rawData) => {
        return this.window.ethereum
          .request({
            method: 'eth_sendTransaction',
            params: [rawData],
          })
      }).then((tx) => {
        return Promise.all([
          firstValueFrom(this.lendingProvider.putTransaction({
            key: loan.key,
            name: 'groupFour',
            data: {
              transactionHash: tx
            }
          })),
          firstValueFrom(this.transactionProvider.post({
            currency: c.key,
            transaction: tx,
            from: wallet?.address,
            to: this.configuration.groupFour,
            value: Number(groupFourAmount),
            type: TransactionTypes.send.key
          }))
        ]);
      }));
    }

    return Promise.all(promises).then(() => {
      this.router.navigateByUrl('/profile/loans/lent/portfolio');
    }).catch((e) => this.error = e.message).finally(() => {
      this.isSubmit = false;
      this.change.markForCheck();
    });

  }

  verification() {
    this.KycProvider.initIframe();
  }

  onRef() {
    if(this.referral){
      this.router.navigateByUrl(`/profile/lend`);
      this.removeReferral();
    }else{
      const { referral } = this.formOne.value;
      const control = this.formOne.get('referral');
      if(control?.valid && referral?.length > 0){
        this.router.navigateByUrl(`/profile/lend/${referral}`);
      }
    }

  }

  setReferral(data: IObjectKeys){
    this.referral = data;
    let control = this.formOne.get('referral')!;
    control.setValue(this.referral.hash);
    this.change.markForCheck();
  }

  removeReferral(){
    let control = this.formOne.get('referral')!;
    this.referral = null;
    control.setValue(null);
    this.change.markForCheck();
  }

  alertRef(){
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
  }

}
