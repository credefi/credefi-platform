import { ChangeDetectionStrategy, Component, effect, signal, untracked } from '@angular/core';
import { HeaderComponent } from 'src/app/components/main/shared/header';
import { SidebarComponent } from '../shared/sidebar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WalletProvider } from 'src/app/providers/wallet/WalletProvider';
import { LoaderProvider } from 'src/app/providers';
import { track } from 'src/app/helpers/track';
import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { ConnectDialog } from 'src/app/helpers/connectDialog';
import { MatDialogModule } from '@angular/material/dialog';
import { AddressPipeModule } from 'src/app/pipes/address';
import { HexToDecPipeModule } from 'src/app/pipes/hextodec';
import { EXPLORER } from 'src/environments/environment';
import { CopyModule } from 'src/app/directives/copy';

@Component({
  selector: 'app-all-transactions',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  imports: [HeaderComponent, MatDialogModule, SidebarComponent, MatIconModule, MatButtonModule, NgFor, NgIf, AddressPipeModule, HexToDecPipeModule, DecimalPipe, CopyModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class AllTransactionsComponent extends ConnectDialog {

  page: string;
  limit = 10;
  items = signal([]);
  nextPage: string | null;
  loaded = signal(false);
  exporer = EXPLORER;

  constructor(
    public wallet: WalletProvider,
    private loaderProvider: LoaderProvider
  ) {
    super();
  }

  public resetLoad() {
    this.loaded.set(false);
    this.items.set([]);
    this.loadTransactions();
  }

  private loggingEffect = effect(() => {
    if (this.wallet.address()) {
      untracked(() => {
        this.resetLoad();
      })
    }
  });

  async loadTransactions() {
    this.loaderProvider.show();
    const data = await this.wallet.getTransactions(this.limit, this.nextPage);
    this.nextPage = data.result.pageKey;
    this.items.update((value) => [...value, ...data.result.transfers]);
    if (!data.result.pageKey) {
      this.loaded.set(true);
    }
    this.loaderProvider.hide();
  }

  track = track;
}
