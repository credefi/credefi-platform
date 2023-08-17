import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SidebarComponent } from 'src/app/components/main/shared/sidebar';
import { HeaderComponent } from 'src/app/components/main/shared/header';
import { BannerComponent } from 'src/app/components/main/shared/banner';
import { PortfolioBorrowComponent } from 'src/app/components/main/shared/portfolio-borrow/portfolio-borrow.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-my-borrow',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SidebarComponent, HeaderComponent, BannerComponent, PortfolioBorrowComponent, MatButtonModule],
  standalone: true
})

export class MyBorrowComponent implements OnInit {

  constructor() {

  }
  ngOnInit(): void {

  }
  portfolioImage = "dot"
  portfolioName = "Plain Vanilla"

  currentPage = "Borrow";
  height = "1279px";

  title = "Long title for banner";
  description = "A long description for the banner, which will take at least two lines, remember to write the text here. A long description for the banner, which will take at least two lines, remember to write the text here";
  image = "./assets/images/dashboardBanner.png";

  linearGradient = "background: linear-gradient(120deg, #DFCDEB 0%, #BB96D5 100%); height: 166px  ";


  titleColor = "#6FACFF"
  descriptionColor = "#5C68FF"
  imgProps = "width: 530px; height:166px;"
  getHeight($event) {
    console.log($event)
    this.height = $event
  }


}
