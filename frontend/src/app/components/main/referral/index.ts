import { Component } from '@angular/core';

@Component({
  selector: 'app-referral',
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})
export class ReferralComponent {
  title="Autonomous Earning is live!";
  description="Unlock the power of your stablecoins and earn interest on autopilot!";
  image = "./assets/images/dashboardBanner.png"
  currentPage = "Referral program"
  color1 = "#6FACFF"
  color2 = "#5C68FF"
  color3 = "#2984FE"
  linearGradient = "background: linear-gradient(91.78deg, #6FACFF, #5C68FF,#2984FE);"
  height = "1160px"
  transactionsTitle = "Recent Transactions";
  transactionsButton= "View all";
}
