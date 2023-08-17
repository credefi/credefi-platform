import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidebarComponent } from '../shared/sidebar';
import { MatIconModule } from '@angular/material/icon';
import { BannerWalletComponent } from '../shared/banner-wallet';
import { HeaderComponent } from 'src/app/components/main/shared/header';
import { MatButtonModule } from '@angular/material/button';
import { TransactionsComponent } from '../shared/transactions';
import { PortfolioWalletComponent } from '../shared/portfolio-wallet';
import { PortfolioWalletMobileComponent } from '../shared/portfolio-wallet-mobile';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateWalletDialog } from '../shared/create-wallet';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { BannerAutonomousEarningComponent } from '../shared/banner-autonomous-earning';
import { BannerWalletMobileComponent } from '../shared/banner-autonomous-earning-mobile'; 

@Component({
  selector: 'app-wallet',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeaderComponent,
    SidebarComponent,
    MatIconModule,
    TransactionsComponent,
    BannerWalletComponent,
    PortfolioWalletComponent,
    MatButtonModule,
    MatDialogModule,
    CreateWalletDialog,
    BannerWalletMobileComponent,
    PortfolioWalletMobileComponent,
  ],
  standalone: true
})
export class WalletComponent {

  walletLogo = "credefiLogo";
  walletTitle = "Credefi";
  walletLogo2 = "metaMaskLogo";
  walletTitle2 = "Metamask";
  description = "Buy and exchange over 100+ popular tokens in our platform";
  image = "./assets/svg/wallet/walletBanner.svg";
  color = "rgba(92, 104, 255, 1)";

  descriptionMobile = "Buy and exchange over 100+ popular tokens in our platform";
  imageMobile = "./assets/svg/wallet/walletBanner.svg";
  colorMobile = "rgba(92, 104, 255, 1)";


  constructor(private dialog: MatDialog){}

  onCreateWallet(){
    this.dialog.open(CreateWalletDialog, {
      scrollStrategy: new NoopScrollStrategy(),
      autoFocus: false,
      panelClass: 'wallet-dialog'
    })
  }

}
