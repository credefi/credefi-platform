import { Component, Inject, ChangeDetectorRef, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { WINDOW } from 'src/app/modules/window';
import { LoaderProvider } from 'src/app/providers';

import { Web3ClientProvider } from 'src/app/providers/web3';

@Component({
  selector: 'widthdraw-dialog',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class WithdrawDialog {

  error = '';
  canClose = true;
  disabled = false;

  form = new UntypedFormGroup({
    amount: new UntypedFormControl('', [
      Validators.required
    ])
  });

  translations: { [key: string]: string | Function | any } = this.data.translations;

  constructor(
    private loader: LoaderProvider,
    private web3: Web3ClientProvider,
    private change: ChangeDetectorRef,
    private ref: MatDialogRef<WithdrawDialog>,
    @Inject(WINDOW) private window: IObjectKeys,
    @Inject(MAT_DIALOG_DATA) private data: IObjectKeys,
  ) {
    this.form.get('amount')?.setValidators([
      Validators.required,
      Validators.max(this.data.item.amount)
    ])
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeClose($event: IObjectKeys) {
    return this.canClose;
  }

  submit() {
    if (this.form.valid) {
      const { amount } = this.form.value;
      this.error = '';
      this.disabled = true;
      this.canClose = false;
      this.change.markForCheck();
      this.web3.withDrawPrincipal({
        amount,
        from: this.data.item.user,
        index: this.data.item.index
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
      }).then(() => {
        this.data.handler(true);
      }).then(() => {
        this.loader.hide();
        this.close();
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

  setMaxBalance() {
    this.form.get('amount')?.setValue(this.data.item.amount);
  }

  checkTransaction(hash: string) {
    return this.web3.web3.eth.getTransactionReceipt(hash);
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

  close() {
    this.ref.close();
  }

}
