import { DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-wallet-portfolio-body',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  imports: [MatIconModule, DecimalPipe],
  standalone: true
})
export class WalletPortfolioBodyComponent {
  @Input() walletBodyCoin;
  @Input() walletBodyCrypto;
  @Input() walletBodyLong;
  @Input() walletBodyValue;
  @Input() walletBodyCurrency;

}
