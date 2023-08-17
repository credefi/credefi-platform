import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/sidebar';
import { HeaderComponent } from './shared/header';
import { HeaderMobileComponent } from './shared/header-mobile';
import { FooterMobileComponent } from './shared/footer-mobile';
import { fadeAnimation } from 'src/app/helpers/animations';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-main',
    templateUrl: './index.html',
    styleUrls: ['./style.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [fadeAnimation],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [SidebarComponent, HeaderComponent, RouterOutlet, HeaderMobileComponent, FooterMobileComponent,  CommonModule]
})

export class ActiveSessionsComponent { 
    isMobile: boolean;
   
    constructor() {
        this.isMobile = window.innerWidth <= 700;
    }
  
}
