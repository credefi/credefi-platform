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
import { XummProvider } from 'src/app/providers';
import { WalletXRPLProvider } from 'src/app/providers/wallet/WalletXRPLProvider';
import { CurrencyTypes, WalletTypes } from 'src/globals';
import { XummDialog } from '../xumm-dialog';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { xrpToDrops } from 'xrpl';

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
    SlicePipe,
    ErrorModule,
    AutoCompleteModule,
    InputNumberModule,
    XummDialog,
    MatDialogModule,
    NgFor,
    NgIf,
  ],
  standalone: true
})

export class TransferDialog {

  isSubmit = false;

  currencies = [
    {
      name: 'XRPL',
      type: CurrencyTypes.xrpl
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
    private wallet: WalletXRPLProvider,
    private change: ChangeDetectorRef,
    public ref: MatDialogRef<TransferDialog>,
    private xummWallet: XummProvider,
    private dialog: MatDialog
  ) { }

  async onSubmit() {

    if (this.form.invalid) {
      return false;
    }

    try {

      const value = this.form.value;

      this.isSubmit = true;
      this.change.markForCheck();

      switch (this.wallet.wallet().type) {
        case (WalletTypes.gemwallet): {
          console.log('123213')
          await this.wallet.transactionGemWallet({
            amount: value.amount,
            destination: value.wallet
          })
          this.ref.close(true);
          break
        }
        case (WalletTypes.xumm): {
          this.xummWallet.request({
            "TransactionType": "Payment",
            "Destination": value.wallet,
            "Amount": xrpToDrops(value.amount),
          }).subscribe(({ result }) => {
            if (result) {
              this.dialog.open(XummDialog, {
                scrollStrategy: new NoopScrollStrategy(),
                autoFocus: false,
                panelClass: 'wallet-dialog',
                data: result
              }).afterClosed().subscribe((data) => {
                if (data) {
                  this.ref.close(true);
                }
              })
            }
          })
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

  track = track

}
