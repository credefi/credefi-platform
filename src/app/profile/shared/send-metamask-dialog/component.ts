import { ChangeDetectorRef, Component, ElementRef, HostListener, Inject, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';

import { TransactionProvider } from '../../providers';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { TransactionTypes } from 'src/globals/config';
import { Web3ClientProvider } from 'src/app/providers/web3';
import { WINDOW } from 'src/app/modules/window';

@Component({
  selector: 'send-metamask-dialog',
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})

export class SendMetaMaskDialog {

  error = '';
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
  });

  translations: { [key: string]: string | Function | any } = this.data.translations;
  @ViewChild('loader', { static: true }) loader!: ElementRef<HTMLDivElement>;

  constructor(
    private web3: Web3ClientProvider,
    private change: ChangeDetectorRef,
    private ref: MatDialogRef<SendMetaMaskDialog>,
    private transactionProvider: TransactionProvider,
    @Inject(WINDOW) private window: IObjectKeys,
    @Inject(MAT_DIALOG_DATA) private data: IObjectKeys
  ) { }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeClose($event: IObjectKeys) {
    return !this.submit;
  }

  onSubmit() {

    if (this.sendForm.valid) {

      this.submit = true;
      this.error = '';

      const { amount, to } = this.sendForm.value;

      this.ref.disableClose = true;
      this.loader.nativeElement.style.display = 'block';
      this.change.markForCheck();

      this.getByteCode({ amount, to })?.then((rawData) => {
        return this.window.ethereum
          .request({
            method: 'eth_sendTransaction',
            params: [rawData],
          })
      }).then((tx) => {
        return firstValueFrom(this.transactionProvider.post({
          currency: this.data.type,
          transaction: tx,
          from: this.data.address,
          to: to,
          value: amount,
          type: TransactionTypes.send.key
        }));
      }).then(() => {
        this.ref.close();
      }).catch((e) => this.error = e.message).finally(() => {
        this.submit = false;
        this.ref.disableClose = false;
        this.loader.nativeElement.style.display = 'none';
        this.change.markForCheck();
      });

    }

  }

  getByteCode({ amount, to }: { amount: number, to: string }) {
    switch (this.data.type) {
      case ('credi'): {
        return this.web3.sendCustomCoinMetamask({
          amount: amount,
          contract: { address: this.web3.network.Contract, ABI: this.web3.network.ABI },
          from: this.data.address,
          to: to,
          noncePlus: 0
        });
      }
      case ('eth'): {
        return this.web3.sendEthMetamsk({
          amount: amount,
          from: this.data.address,
          to: to
        });
      }
      case (this.currenciesObject.usdc.key): {
        return this.web3.sendCustomCoinMetamask({
          amount: amount,
          contract: { address: this.currenciesObject.usdc.address, ABI: this.currenciesObject.usdc.ABI },
          from: this.data.address,
          to: to,
          noncePlus: 0
        });
      }
      case (this.currenciesObject.usdt.key): {
        return this.web3.sendCustomCoinMetamask({
          amount: amount,
          contract: { address: this.currenciesObject.usdt.address, ABI: this.currenciesObject.usdt.ABI },
          from: this.data.address,
          to: to,
          noncePlus: 0
        });
      }
      case (this.currenciesObject.dai.key): {
        return this.web3.sendCustomCoinMetamask({
          amount: amount,
          contract: { address: this.currenciesObject.dai.address, ABI: this.currenciesObject.dai.ABI },
          from: this.data.address,
          to: to,
          noncePlus: 0
        });
      } 
      case (this.currenciesObject.ust.key): {
        return this.web3.sendCustomCoinMetamask({
          amount: amount,
          contract: { address: this.currenciesObject.ust.address, ABI: this.currenciesObject.ust.ABI },
          from: this.data.address,
          to: to,
          noncePlus: 0
        });
      }
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
    if (!this.submit) {
      this.ref.close();
    }
  }

}
