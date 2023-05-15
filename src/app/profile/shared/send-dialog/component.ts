import { ChangeDetectorRef, Component, ElementRef, HostListener, Inject, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';

import { TransactionProvider } from '../../providers';
import { Web3ClientProvider } from 'src/app/providers/web3';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { TransactionTypes } from 'src/globals/config';

@Component({
  selector: 'send-dialog',
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})

export class SendDialog {

  validate = false;
  submit = false;
  currenciesObject = this.web3.currenciesObject;

  sendForm = new UntypedFormGroup({
    amount: new UntypedFormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
    to: new UntypedFormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
    password: new UntypedFormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ])
  });

  translations: { [key: string]: string | Function | any } = this.data.translations;
  @ViewChild('loader', { static: true }) loader!: ElementRef<HTMLDivElement>;

  constructor(
    private web3: Web3ClientProvider,
    private change: ChangeDetectorRef,
    private ref: MatDialogRef<SendDialog>,
    private transactionProvider: TransactionProvider,
    @Inject(MAT_DIALOG_DATA) private data: IObjectKeys
  ) { }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeClose($event: IObjectKeys) {
    return !this.submit;
  }

  onSubmit() {

    if (this.sendForm.valid) {

      const { password } = this.sendForm.value;
      this.submit = true;

      this.web3.getPrivKey(this.data.keyStore, password).then((accountData) => {

        const { amount, to } = this.sendForm.value;
        const { privateKey } = accountData;
        const { address } = this.data.keyStore;

        this.validate = true;
        this.ref.disableClose = true;
        this.loader.nativeElement.style.display = 'block';
        this.change.markForCheck();

        switch (this.data.type) {
          case ('credi'): {
            return this.web3.sendCoins({ amount, to, privateKey, from: address })
              .then((transaction: IObjectKeys) => {

                return firstValueFrom(this.transactionProvider.post({
                  currency: 'credi',
                  transaction: transaction.transactionHash,
                  from: address,
                  to,
                  value: Number(amount),
                  type: TransactionTypes.send.key
                })).then(() => {
                  this.ref.close();
                });

              }).catch((e) => {
                console.log(e)

                this.sendForm.get('password')?.setErrors({
                  gasError: true
                });
              });
          }
          case ('eth'): {
            return this.web3.sendEth({ amount, to, privateKey, from: address })
              .then((transaction: IObjectKeys) => {

                return firstValueFrom(this.transactionProvider.post({
                  currency: 'eth',
                  transaction: transaction.transactionHash,
                  from: address,
                  to,
                  value: Number(amount),
                  type: TransactionTypes.send.key
                })).then(() => {
                  this.ref.close();
                });

              }).catch((e) => {
                console.log(e)

                this.sendForm.get('password')?.setErrors({
                  gasError: true
                });
              });
          }
          case (this.currenciesObject.usdc.key): {
            return this.web3.sendCustomCoin({ amount, to, privateKey, from: address, contract: this.currenciesObject.usdc, noncePlus: 0 })
              .then((transaction: IObjectKeys) => {

                return firstValueFrom(this.transactionProvider.post({
                  currency: this.currenciesObject.usdc.key,
                  transaction: transaction.transactionHash,
                  from: address,
                  to,
                  value: Number(amount),
                  type: TransactionTypes.send.key
                })).then(() => {
                  this.ref.close();
                });

              }).catch((e) => {
                console.log(e)

                this.sendForm.get('password')?.setErrors({
                  gasError: true
                });
              });
          }
          case (this.currenciesObject.usdt.key): {
            return this.web3.sendCustomCoin({ amount, to, privateKey, from: address, contract: this.currenciesObject.usdt, noncePlus: 0 })
              .then((transaction: IObjectKeys) => {

                return firstValueFrom(this.transactionProvider.post({
                  currency: this.currenciesObject.usdt.key,
                  transaction: transaction.transactionHash,
                  from: address,
                  to,
                  value: Number(amount),
                  type: TransactionTypes.send.key
                })).then(() => {
                  this.ref.close();
                });

              }).catch((e) => {
                console.log(e)

                this.sendForm.get('password')?.setErrors({
                  gasError: true
                });
              });
          }
          case (this.currenciesObject.dai.key): {
            return this.web3.sendCustomCoin({ amount, to, privateKey, from: address, contract: this.currenciesObject.dai, noncePlus: 0 })
              .then((transaction: IObjectKeys) => {

                return firstValueFrom(this.transactionProvider.post({
                  currency: this.currenciesObject.dai.key,
                  transaction: transaction.transactionHash,
                  from: address,
                  to,
                  value: Number(amount),
                  type: TransactionTypes.send.key
                })).then(() => {
                  this.ref.close();
                });

              }).catch((e) => {
                console.log(e)

                this.sendForm.get('password')?.setErrors({
                  gasError: true
                });
              });
          }
          case (this.currenciesObject.ust.key): {
            return this.web3.sendCustomCoin({ amount, to, privateKey, from: address, contract: this.currenciesObject.ust, noncePlus: 0 })
              .then((transaction: IObjectKeys) => {

                return firstValueFrom(this.transactionProvider.post({
                  currency: this.currenciesObject.ust.key,
                  transaction: transaction.transactionHash,
                  from: address,
                  to,
                  value: Number(amount),
                  type: TransactionTypes.send.key
                })).then(() => {
                  this.ref.close();
                });

              }).catch((e) => {
                console.log(e)

                this.sendForm.get('password')?.setErrors({
                  gasError: true
                });
              });
          }
        }

      }).catch((e) => {
        this.sendForm.get('password')?.setErrors({
          walletPassword: true
        });
      }).finally(() => {
        this.submit = false;
        this.validate = false;
        this.ref.disableClose = false;
        this.loader.nativeElement.style.display = 'none';
        this.change.markForCheck();
      });
    }

  }

  get type() {
    switch (this.data.type) {
      case ('credi'): {
        return 'CREDI'
      }
      case ('eth'): {
        return 'ETH'
      }
      case (this.currenciesObject.usdc.key): {
        return this.currenciesObject.usdc.name;
      }
      case (this.currenciesObject.usdt.key): {
        return this.currenciesObject.usdt.name;
      }
      case (this.currenciesObject.dai.key): {
        return this.currenciesObject.dai.name;
      }
      case (this.currenciesObject.ust.key): {
        return this.currenciesObject.ust.name;
      }
    }
  }

  close() {
    if (!this.validate) {
      this.ref.close();
    }
  }

}
