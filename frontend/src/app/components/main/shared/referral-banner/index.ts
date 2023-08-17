import { Component } from '@angular/core';

@Component({
  selector: 'app-referral-banner',
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})
export class ReferralBannerComponent {
 public invite(){
    console.log("invite")
 }
}
