import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Component, effect, signal, untracked } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CopyModule } from 'src/app/directives/copy';
import { ConnectDialog } from 'src/app/helpers/connectDialog';
import { track } from 'src/app/helpers/track';
import { AddressPipeModule } from 'src/app/pipes/address';
import { HexToDecPipeModule } from 'src/app/pipes/hextodec';
import { LoaderProvider } from 'src/app/providers';
import { WalletProvider } from 'src/app/providers/wallet/WalletProvider';
import { EXPLORER } from 'src/environments/environment';

@Component({
  selector: 'app-transactions',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  imports: [MatIconModule, MatButtonModule, NgFor, NgIf, AddressPipeModule, HexToDecPipeModule, DecimalPipe, MatDialogModule, RouterLink, CopyModule],
  standalone: true
})
export class TransactionsComponent extends ConnectDialog {

  page: string;
  limit = 5;
  items = signal([]);
  nextPage: string | null;
  exporer = EXPLORER;

  constructor(
    public wallet: WalletProvider,
    private loaderProvider: LoaderProvider
  ) {
    super();
  }

  public reset() {
    this.nextPage = null;
    this.items.set([]);
    this.loadTransactions();
  }

  private loggingEffect = effect(() => {
    if (this.wallet.address()) {
      untracked(() => {
        this.reset();
      })
    }
  });

  async loadTransactions() {
    this.loaderProvider.show();
    const data = await this.wallet.getTransactions(this.limit, this.nextPage);
    this.nextPage = data.result.pageKey;
    this.items.update((value) => [...value, ...data.result.transfers]);
    this.loaderProvider.hide();
  }

  track = track;
}
