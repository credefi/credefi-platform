import { NgFor, NgIf, SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AutoCompleteModule } from 'src/app/directives/autocomplete';
import { InputNumberModule } from 'src/app/directives/number';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { track } from 'src/app/helpers/track';
import { WINDOW } from 'src/app/modules/window';
import { ErrorModule } from 'src/app/pipes/error';
import { WalletProvider } from 'src/app/providers/wallet/WalletProvider';
import { CurrencyTypes, WalletTypes } from 'src/globals';
import { SignDialog } from '../sign';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { ContractAbi } from 'web3';
import { Contract as IContract } from 'web3-eth-contract';

@Component({
  selector: 'app-transfer-dialog',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconModule,
    MatRippleModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
    SlicePipe,
    ErrorModule,
    AutoCompleteModule,
    InputNumberModule,
    NgFor,
    NgIf,
    SignDialog
  ],
  standalone: true
})

export class TransferDialog {

  isSubmit = false;

  currencies = [
    {
      name: 'ETH',
      type: CurrencyTypes.eth
    },
    {
      name: 'CREDI',
      type: CurrencyTypes.credi
    },
    {
      name: 'USDT',
      type: CurrencyTypes.usdt
    }
  ];

  form = new FormGroup({
    currency: new FormControl(null, [
      Validators.required,
    ]),
    amount: new FormControl(null, [
      Validators.required,
    ]),
    wallet: new FormControl(null, [
      Validators.required,
    ]),
  });

  constructor(
    private dialog: MatDialog,
    private wallet: WalletProvider,
    private change: ChangeDetectorRef,
    public ref: MatDialogRef<TransferDialog>,
    @Inject(WINDOW) private window: IObjectKeys,
  ) { }

  async onSubmit() {

    if (this.form.invalid) {
      return false;
    }

    try {

      this.isSubmit = true;
      this.change.markForCheck();

      switch (this.wallet.wallet().type) {
        case (WalletTypes.metamask): {
          const data = await this.parseSendMetamask();
          const transaction = await this.checkTransaction(data);

          if (!transaction?.status) {
            await this.checkTransactionListener(data);
          }
          this.ref.close(true);
          break
        }
        case (WalletTypes.credi): {
          this.parseSend();
          break
        }
      }
    } catch (e) {
      console.log(e)
    } finally {
      this.isSubmit = false;
      this.change.markForCheck();
    }


  }

  async parseSendMetamask() {
    try {
      const value = this.form.value;
      switch (value.currency) {
        case (CurrencyTypes.eth): {
          const rawTx = await this.getRawTx();
          return this.window.ethereum
            .request({
              method: 'eth_sendTransaction',
              params: [rawTx],
            });
        }
        case (CurrencyTypes.credi): {
          const rawTx = await this.getRawTokenTx(this.wallet.credi);
          return this.window.ethereum
            .request({
              method: 'eth_sendTransaction',
              params: [rawTx],
            });
        }
        case (CurrencyTypes.usdt): {
          const rawTx = await this.getRawTokenTx(this.wallet.usdt);
          return this.window.ethereum
            .request({
              method: 'eth_sendTransaction',
              params: [rawTx],
            });
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  async parseSend() {

    const value = this.form.value;

    try {
      switch (value.currency) {
        case (CurrencyTypes.eth): {
          const rawTx = await this.getRawTx();
          return this.openDialog(rawTx);
        }
        case (CurrencyTypes.credi): {
          const rawTx = await this.getRawTokenTx(this.wallet.credi);
          return this.openDialog(rawTx);
        }
        case (CurrencyTypes.usdt): {
          const rawTx = await this.getRawTokenTx(this.wallet.usdt);
          return this.openDialog(rawTx);
        }
      }
    } catch (e) {
      console.log(e)
    }

  }

  openDialog(rawTx: IObjectKeys) {
    this.dialog.open(SignDialog, {
      scrollStrategy: new NoopScrollStrategy(),
      autoFocus: false,
      panelClass: 'wallet-dialog',
      data: rawTx
    }).afterClosed().subscribe(() => {
      this.ref.close(true);
    });
  }

  getRawTx() {
    const value = this.form.value;
    return this.wallet.sendEth({
      amount: value.amount,
      to: value.wallet
    });
  }

  getRawTokenTx(contract: IContract<ContractAbi>) {
    const value = this.form.value;
    return this.wallet.sendToken({
      amount: value.amount,
      to: value.wallet,
      contract
    });
  }

  checkTransactionListener(hash: string) {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        this.wallet.web3.eth.getTransactionReceipt(hash).then((transaction) => {
          if (transaction?.status) {
            clearInterval(interval);
            return resolve(transaction);
          }
        }).catch((e: Error) => {
          console.log(e)
        });
      }, 1000);
    });
  }

  async checkTransaction(hash: string) {
    try {
      return await this.wallet.web3.eth.getTransactionReceipt(hash);
    } catch (e) {
      return null;
    }
  }

  track = track

}
