import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from 'src/app/components/main/shared/header';
import { SidebarComponent } from '../shared/sidebar';
import { PortfolioSteakingComponent } from '../shared/portfolio-steaking';
import { TypeOfSteakingComponent } from '../shared/type-of-steaking';

@Component({
  selector: 'app-steaking-catalogue',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  imports: [
    HeaderComponent,
    SidebarComponent,
    PortfolioSteakingComponent,
    TypeOfSteakingComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class SteakingCatalogueComponent {
  currentPage = "Steaking catalogue";
  height = "1139px";

  title = "Long title for banner";
  description = "A long description for the banner, which will take at least two lines, remember to write the text here. A long description for the banner, which will take at least two lines, remember to write the text here";
  image = "./assets/images/lendBanner.png";

  color1 = "#FFDCDF";
  color2 = "#FFCBD2";
  color3 = "#FFDCDF";
  linearGradient = "background: linear-gradient(91.78deg, #FFDCDF, #FFCBD2);";

  logoMobile = "logoMobile";
  logoMobile2 = "binanceCoin";
  steakingTitle = "Module X";
  steakingTitle2 = "CREDI LP BSC";

  portfolioImage = "dot";
}
