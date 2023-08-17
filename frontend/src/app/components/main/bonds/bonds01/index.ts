import { Component } from '@angular/core';
import { HeaderComponent } from 'src/app/components/main/shared/header';
import { BannerComponent } from '../../shared/banner';
import { SidebarComponent } from '../../shared/sidebar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Bonds01TableComponent } from '../../shared/bonds01-table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-bonds01',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  imports: [HeaderComponent, BannerComponent, SidebarComponent, RouterLink, RouterLinkActive, MatIconModule, Bonds01TableComponent, MatButtonModule],
  standalone: true
})
export class Bonds01Component {
  title = "Long title for banner";
  description = "A long description for the banner, which will take at least two lines, remember to write the text here";
  image = "./assets/images/bondsBanner.png"
  currentPage = "Corporate bonds"
  titleColor = "padding-top: 24px;"
  descriptionColor = "#5C68FF"
  imgProps = "width: 517px; height:134px;"

  linearGradient = "background: linear-gradient(138deg, #ECE9DC 0%, #EAE4CB 100%), #D9D9D9;height: 134px;"
  chart: any;
  height = "1588px";





}
