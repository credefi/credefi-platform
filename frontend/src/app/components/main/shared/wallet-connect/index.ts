import { NgFor } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { track } from 'src/app/helpers/track';
import { WalletProvider } from 'src/app/providers/wallet/WalletProvider';

@Component({
  selector: 'app-wallet-connect-dialog',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  imports: [MatIconModule, NgFor, MatRippleModule, MatButtonModule],
  standalone: true
})
export class WalletConnectDialog {

  constructor(
    public ref: MatDialogRef<WalletConnectDialog>,
    public walletProvider: WalletProvider,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  async connectMetamask() {
    try {
      await this.walletProvider.connect();
      this.ref.close();
    } catch (error) {
      console.log(error);
    }
  }

  async connect(index: number) {
    const wallet = this.data[index];
    this.walletProvider.setWallet(wallet);
    this.ref.close();
  }

  track = track
}
