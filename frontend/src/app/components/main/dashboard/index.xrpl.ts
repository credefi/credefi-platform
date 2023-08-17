import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BannerComponent } from '../shared/banner';
import { BannerMobileComponent } from '../shared/banner-mobile';
import { SidebarComponent } from '../shared/sidebar';
import { HeaderComponent } from 'src/app/components/main/shared/header';
import { TransactionsComponent } from '../shared/transactions';
import { IncomeChartComponent } from '../shared/income-chart';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  templateUrl: './index.xrpl.html',
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
    MatButtonModule
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

      /* background: linear-gradient(91.78deg, #6FACFF, #5C68FF,#2984FE); */
  transactionsTitle = "Recent Transactions";
  transactionsButton= "View all";
  showCarosel = true



  imageMobile = "./assets/images/stepsMobileBanner.png"
  imgPropsMobile = "width:100px; height:121px;"



}
