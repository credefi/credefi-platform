import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet],
  standalone: true,
})
export class AppComponent implements OnInit {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.loadIcons();
  }

  loadIcons() {
    this.matIconRegistry.addSvgIcon(
      `apple`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/apple.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `google`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/google.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `facebook`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/facebook.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `email`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/email.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `blankCircle`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/blankCircle.svg")
    );
    this.matIconRegistry.addSvgIcon(
      `password`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/password.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `hide`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/hide.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `hideBlack`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/hideBlack.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `logo`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/logo.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `step`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/step.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `ellipse01`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/ellipse01.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `ellipse02`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/ellipse02.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `ellipse03`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/ellipse03.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `appleMobile`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/mobile/apple.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `facebookMobile`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/mobile/facebook.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `googleMobile`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/mobile/google.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `emailMobile`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/mobile/email.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "logoMobile",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/mobile/logo.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "logoMobileHeader",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/mobile/logoHeader.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "menuOpen",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/mobile/menuOpen.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "menuClose",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/mobile/menuClose.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `passwordHideMobile`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/mobile/passwordHide.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `passwordKeyMobile`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/mobile/passwordKey.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `userMobile`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/mobile/user.svg")
    );

    /* header */
    this.matIconRegistry.addSvgIcon(
      `Vector`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/header/Vector.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `MetaMask_Fox`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/header/MetaMask_Fox.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `bell-04`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/header/bell-04.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `ArrowDown`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/header/ArrowDown.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `ArrowUp`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/header/ArrowUp.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `allTransactions`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/mobile/allTransactions_22px.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `arrow`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/mobile/arrow.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `arrowUp`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/mobile/arrowUp.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `borrow`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/mobile/borrow_22px.svg")
    );


    this.matIconRegistry.addSvgIcon(
      `dashboard`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/mobile/dashboard_22px.svg")
    );


    this.matIconRegistry.addSvgIcon(
      `earn`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/mobile/earn_22px.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `earn`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/mobile/earn_22px.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `goBack`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/mobile/goBack_22px.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `lend`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/mobile/lend_22px.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `stake`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/mobile/stake_22px.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `wallet`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/mobile/wallet_22px.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `facebook20`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/mobile/facebook_20px.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `linkedin`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/mobile/linkedin_20px.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `telegram`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/mobile/telegram_20px.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `twitter`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/mobile/twitter_20px.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `darkLight`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/mobile/darkLight.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `arrowUpRightMobile`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/mobile/arrowUpRight.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `slider`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/slider_40px.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `arrowTop`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/arrowTop.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `lock`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/lock.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `backForward40px`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/backForward40px.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `currency50px`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/currency50px.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `fill50px`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/fill50px.svg")
    );


    this.matIconRegistry.addSvgIcon(
      `month50px`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/month50px.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `collateral50px`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/collateral50px.svg")
    );


    this.matIconRegistry.addSvgIcon(
      `wallet50px`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/wallet50px.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `logo63px`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/logo63px.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `plus`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/header/plus.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `Hand`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/header/Hand.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `Whitelist`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/header/Whitelist.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `Profile`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/header/Profile.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `Referral`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/header/Referral.svg")
    );


    this.matIconRegistry.addSvgIcon(
      `companyName50px`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/borrow/companyName50px.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `companyWebsite50px`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/borrow/companyWebsite50px.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `industry50px`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/borrow/industry50px.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `numberOfEmployees50px`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/borrow/numberOfEmployees50px.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `turnover50px`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/borrow/turnover50px.svg")
    );


    this.matIconRegistry.addSvgIcon(
      `typeOfCompany50px`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/borrow/typeOfCompany50px.svg")
    );


    this.matIconRegistry.addSvgIcon(
      `yearOfIncorporation50px`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/borrow/yearOfIncorporation50px.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `email50px`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/borrow/email50px.svg")
    );


    this.matIconRegistry.addSvgIcon(
      `fullName50px`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/borrow/fullName50px.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `percent50px`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/borrow/percent50px.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `ukraine`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/borrow/ukraine.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `verified`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/borrow/verified.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `typeOfCollateral50px`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/borrow/typeOfCollateral50px.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `Sphere_array`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/dashboard/Sphere_array.svg")
    );


    this.matIconRegistry.addSvgIcon(
      `sliderMobileBlack`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/dashboard/sliderMobileBlack.svg")
    );

    

    this.matIconRegistry.addSvgIcon(
      `Glass_tower`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/dashboard/Glass_tower.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `lendBanner`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/lend/lendBanner.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `apy`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/lend/apy.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `dot`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/lend/dot.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `dot2`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/lend/dot2.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `dot3`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/lend/dot3.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `dot4`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/lend/dot4.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `dot5`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/lend/dot5.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `dot6`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/lend/dot6.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `tether`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/lend/tether.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `chartClose`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/lend/chartClose.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `Steps`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/dashboard/Steps.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `moduleX1`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/dashboard/moduleX1.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `moduleX2`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/dashboard/moduleX2.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `moduleX2Mobile`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/dashboard/moduleX2Mobile.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `cryptoLoans1`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/dashboard/cryptoLoans1.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `cryptoLoans2`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/dashboard/cryptoLoans2.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `twistedCube`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/dashboard/twistedCube.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `glassCube`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/dashboard/glassCube.svg")
    );

    
    this.matIconRegistry.addSvgIcon(
      `glassCubeMobile`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/dashboard/glassCubeMobile.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `hexagonalSphere`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/dashboard/hexagonalSphere.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `hexagonalSphereMobile`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/dashboard/hexagonalSphereMobile.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `arrowUpRight`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/dashboard/arrowUpRight.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `transactionsCircle`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/dashboard/transactionsCircle.svg")
    );

    this.matIconRegistry.addSvgIcon(

      `chartTableG`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/income-chart/chartTableG.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `chartTableArrowDown`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/income-chart/chartTableArrowDown.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `warning`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/warning.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `buttonFilter`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/all-transactions/buttonFilter.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `polygon`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/dashboard/polygon.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `partners`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/referral/partners.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `recieved`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/referral/recieved.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `recievedMonth`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/referral/recievedMonth.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `whiteArrowDown`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/borrow/whiteArrowDown.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `lightArrowUp`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/borrow/lightArrowUp.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `adidas50`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/bonds/adidas50.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `apple50`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/bonds/apple50.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `facebook50`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/bonds/facebook50.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `google50`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/bonds/google50.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `microsoft50`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/bonds/microsoft50.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `nike50`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/bonds/nike50.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `pepsi50`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/bonds/pepsi50.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `tesla50`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/bonds/tesla50.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `twitter50`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/bonds/twitter50.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `xbox50`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/bonds/xbox50.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `cityCashLight50`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/bonds/cityCashLight50.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `cityCashWhite50`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/bonds/cityCashWhite50.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `bondsArrowUp`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/bonds/bondsArrowUp.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `bondsArrowUpStraight`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/bonds/bondsArrowUpStraight.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `bondsCalendar`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/bonds/bondsCalendar.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `bondsCoinsStacked`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/bonds/bondsCoinsStacked.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `bondsStar`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/bonds/bondsStar.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `bondsPercent`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/bonds/bondsPercent.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `bondsGroup`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/bonds/bondsGroup.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `bondsTriangleUp`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/bonds/bondsTriangleUp.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `bondsTriangleDown`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/bonds/bondsTriangleDown.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `bondsRepayment`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/bonds/bondsRepayment.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `arrowUpRight`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/bonds/arrowUpRight.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `whitelist22`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/whitelist/whitelist22.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `copy`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/whitelist/copy.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `edit`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/whitelist/edit.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `trash`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/whitelist/trash.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `alertCircle`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/whitelist/alertCircle.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `ellipse`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/whitelist/ellipse.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `coins50`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/autonomous-earning/coins50.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `percent50`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/autonomous-earning/percent50.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `wallet50`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/autonomous-earning/wallet50.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `userInvest`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/autonomous-earning/userInvest.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `circleInvest`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/autonomous-earning/circleInvest.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `potInvest`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/autonomous-earning/potInvest.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `calendarInvest`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/autonomous-earning/calendar.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `stakedInvest`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/autonomous-earning/staked.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `tetherInvest`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/autonomous-earning/tetherInvest.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `greenSliderHandle`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/autonomous-earning/greenSliderHandle.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `coinsStacked04`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/type-of-steaking/coinsStacked04.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `percent`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/type-of-steaking/percent.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `globe`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/type-of-steaking/globe.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `binanceCoin`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/type-of-steaking/binanceCoin.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `steaking`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/type-of-steaking/steaking.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `autonomousEarning50`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/autonomous-earning/autonomousEarning50.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `appleae50`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/autonomous-earning/appleae50.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `bondArrowDown`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/autonomous-earning/bondArrowDown.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `greenSliderHandleMobile`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/autonomous-earning/greenSliderHandleMobile.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `arrowBack`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/autonomous-earning/arrowBack.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `buttonPlus`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/wallet/buttonPlus.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `arrowCircleDown`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/wallet/arrowCircleDown.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `arrowCircleUp`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/wallet/arrowCircleUp.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `iconCopy`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/wallet/iconCopy.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `iconKey`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/wallet/iconKey.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `metaMaskLogo`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/wallet/metaMaskLogo.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `credefiLogo`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/wallet/credefiLogo.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `bitcoin`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/wallet/bitcoin.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `credi`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/wallet/credi.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `xrpl`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/wallet/xrpl.svg")
    );


    this.matIconRegistry.addSvgIcon(
      `binance`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/wallet/binance.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `cardano`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/wallet/cardano.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `ethereum`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/wallet/ethereum.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `solana`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/wallet/solana.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `tether`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/wallet/tether.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `slider`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/dashboard/slider.svg")
    );

    
    this.matIconRegistry.addSvgIcon(
      `sliderMobile`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/dashboard/sliderMobile.svg")
    );
    

    
    this.matIconRegistry.addSvgIcon(
      `stepsMobile`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/dashboard/stepsMobile.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `amount`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/stake/amount.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `calendar`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/stake/calendar.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `enterAmount`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/stake/enterAmount.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `rate`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/stake/rate.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `stake2`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/stake/stake2.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `tvl`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/stake/tvl.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `greenSliderHandleSlender`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/stake/greenSliderHandleSlender.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `photoPlus`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/user-details/photoPlus.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `dotsVertical`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/user-details/dotsVertical.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `xClose`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/user-details/xClose.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `xCloseLight`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/user-details/xCloseLight.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `sessionsApple`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/user-details/sessionsApple.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `sessionsAndroid`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/user-details/sessionsAndroid.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `sessionsWindows`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/user-details/sessionsWindows.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `alertCircle`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/user-details/alertCircle.svg")
    );


    this.matIconRegistry.addSvgIcon(
      `off`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/user-details/off.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `whitelist`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/user-details/whitelist.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `moduleGreen`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/stake/moduleGreen.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `moduleBrown`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/stake/moduleBrown.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `moduleRed`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/stake/moduleRed.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `bannerNumber`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/stake/bannerNumber.svg")
    );

    this.matIconRegistry.addSvgIcon(  
      `stakePercent`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/stake/stakePercent.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `buttonFilterEllipse`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/p2p/buttonFilterEllipse.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `p2pKosogamaWhite`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/p2p/p2pKosogamaWhite.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `p2pKosogamaLight`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/p2p/p2pKosogamaLight.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `p2pAgri`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/p2p/p2pAgri.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `p2pArrowUp`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/p2p/p2pArrowUp.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `p2pCoinsHand`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/p2p/p2pCoinsHand.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `p2pCoinsStacked`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/p2p/p2pCoinsStacked.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `p2pCreditCard`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/p2p/p2pCreditCard.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `p2pPercent`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/p2p/p2pPercent.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `p2pStar`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/p2p/p2pStar.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `wallet-icon`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/wallet.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `gem-wallet-icon`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/wallet/gemwallet.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `xumm-wallet-icon`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/wallet/xumm.svg")
    );
  }

}
