import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BannerComponent } from '../shared/banner';
import { BannerMobileComponent } from '../shared/banner-mobile';
import { SidebarComponent } from '../shared/sidebar';
import { HeaderComponent } from 'src/app/components/main/shared/header';
import { TransactionsComponent } from '../shared/transactions';
import { TransactionsMobileComponent } from '../shared/transactions-mobile';
import { IncomeChartComponent } from '../shared/income-chart';
import { IncomeChartMobileComponent } from '../shared/income-chart-mobile';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatIconModule, 
    BannerComponent, 
    BannerMobileComponent,
    SidebarComponent, 
    HeaderComponent,
    TransactionsComponent,
    IncomeChartComponent,
    MatButtonModule,
    IncomeChartMobileComponent,
    CommonModule,
    TransactionsMobileComponent,
  ]
})
export class DashboardComponent {


  title="Autonomous Earning is live!";
  titleColor = "color: #FCFDFD; font-size: 24px;"
  description="Unlock the power of your stablecoins and earn interest on autopilot!";
  descriptionColor = "color: rgba(252, 253, 253, 0.50); font-size: 14px;"
  image = "./assets/images/dashboardBanner.png"
  imgProps = "width: 507px; height:158px;"
  linearGradient = "background: linear-gradient(154deg, #6FACFF 0%, #5C68FF 0.01%, #2984FE 100%); height: 158px;"

  currentPage = "Dashboard"

  transactionsTitle = "Recent Transactions";
  transactionsButton= "View all";
  showCarosel = true



  imageMobile = "./assets/images/stepsMobileBanner.png"
  imgPropsMobile = "width:100px; height:121px;"
  isMobile: boolean;

  constructor() {
      this.isMobile = window.innerWidth <= 700;
  }

 




}
