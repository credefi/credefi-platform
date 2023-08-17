import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, OnInit, HostListener,Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

interface SideNavToggle {
  screenWidth: number;
  width: number;
  collapsed: boolean;
  matIconSizeLogo: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  imports: [MatIconModule, CommonModule, RouterLink],
  standalone: true
})

export class SidebarComponent implements OnInit {

  public iconArrow = 'arrow';
  public logoMobile = 'logoMobile'
  public matIconSizeLogo = 'mat-icon-size-logo'
  public width = 246;

  @Input() height;
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768 ) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth, width: this.width, matIconSizeLogo: this.matIconSizeLogo});
    }
  }

  ngOnInit(): void {
      this.screenWidth = window.innerWidth;
  }

  toggleCollapse(): void {
    return;
    console.log('toggle called' , this.width)

    if(this.width === 246){
      this.width = 100;
      this.matIconSizeLogo = 'mat-icon-size-logo-smaller';
    }else{
      this.width = 246;
      this.matIconSizeLogo = 'mat-icon-size-logo';
    }

  }
  



  changeEarnIcon(): void {



    if(this.iconArrow === 'arrow'){
      this.iconArrow = 'arrowTop';
    }else{
      this.iconArrow = 'arrow';
    }

  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth, width: this.width,matIconSizeLogo: this.matIconSizeLogo});
  }
}

