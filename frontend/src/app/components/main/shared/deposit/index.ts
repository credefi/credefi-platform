import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CopyModule } from 'src/app/directives/copy';
import { WalletProvider } from 'src/app/providers/wallet/WalletProvider';
import { Environment } from 'src/globals';

@Component({
  selector: 'app-deposit-dialog',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  imports: [MatIconModule, MatRippleModule, MatButtonModule, CopyModule],
  standalone: true
})

export class DepositDialog {

  api_url = Environment.api_url;

  constructor(
    public ref: MatDialogRef<DepositDialog>,
    public wallet: WalletProvider
  ) { }

}
