import { Component, ChangeDetectionStrategy, Inject, OnInit, OnDestroy, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { MapProvider } from '../providers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'main-page',
  styleUrls: ['style.scss'],
  templateUrl: 'index.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})

export class MainPage implements OnInit, OnDestroy {

  subscription!: Subscription;

  menus!: {
    name: string,
    image?: string,
    link?: string,
    type: string,
    key?: string,
    active?: boolean,
    click?: Function,
    queryParamsHandling?: 'merge' | 'preserve' | '' | undefined,
  }[];

  navigation!: {
    name: string,
    hidden?: boolean,
    children: {
      name: string,
      image?: string,
      link?: string,
      type: string,
      key?: string,
      active?: boolean,
      click?: Function,
      queryParamsHandling?: 'merge' | 'preserve' | '' | undefined,
    }[]
  }[];

  translations: { [key: string]: string | Function | any } = this.activated.snapshot.data.translations;

  constructor(
    private map: MapProvider,
    private activated: ActivatedRoute,
    @Inject(PLATFORM_ID) private platform: Object
  ) {
    this.initMenu();
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platform)) {
      this.subscription = this.map.setSubsription(MapProvider.USER).subscribe(() => {

      });
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  initMenu() {
    const childrenToolbar = [
      {
        name: this.translations['home'],
        link: 'https://credefi.finance',
        type: 'blank',
      },
      {
        name: this.translations['about'],
        link: 'https://credefi.finance/#about',
        type: 'blank'
      },
      {
        name: this.translations['features'],
        link: 'https://credefi.finance/#features',
        type: 'blank'
      },
      {
        name: this.translations['project'],
        link: 'https://credefi.finance/#project',
        type: 'blank'
      },
      {
        name: this.translations['roadmap'],
        link: 'https://credefi.finance/#roadmap',
        type: 'blank'
      },
      {
        name: this.translations['tokenomics'],
        link: 'https://credefi.finance/#tokenomics',
        type: 'blank'
      },
      {
        name: this.translations['news'],
        link: 'https://credefi.finance/#news',
        type: 'blank'
      },
    ];

    this.navigation = [
      {
        name: this.translations['navigation'],
        children: childrenToolbar
      }
    ];

    this.menus = childrenToolbar;

  }

}
