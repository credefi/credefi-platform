import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ViewEncapsulation, Inject } from '@angular/core';
import { SocketProvider } from './providers/SocketProvider';
import { ActivatedRoute } from '@angular/router';
import { WINDOW } from 'src/app/modules/window';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { Scan } from 'src/environments/environment';

@Component({
  selector: 'admin-panel-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdminPanelPage implements OnInit, OnDestroy {

  translations: { [key: string]: string } = this.activated.snapshot.data.translations;

  navigation = [
    {
      name: this.translations['navigation'],
      children: [
        // {
        //   name: this.translations['wallet'],
        //   link: '/admin/panel/wallet',
        //   image: './assets/wallet.svg',
        //   type: 'link'
        // },
        // {
        //   name: this.translations['token-configuration'],
        //   link: '/admin/panel/token-configuration',
        //   image: './assets/setting.svg',
        //   type: 'link'
        // },
        {
          name: this.translations['configuration'],
          link: '/admin/panel/configuration',
          image: './assets/admin.svg',
          type: 'link'
        },
        {
          name: this.translations['lent-loan-requests'],
          link: '/admin/panel/lent-loan-requests',
          image: './assets/growth.svg',
          type: 'link'
        },
        {
          name: this.translations['loan-requests'],
          link: '/admin/panel/loan-requests',
          image: './assets/loan.svg',
          type: 'link'
        },
        {
          name: this.translations['users'],
          link: '/admin/panel/users',
          image: './assets/team.svg',
          type: 'link'
        },
      ]
    },
    {
      name: this.translations['faq'],
      children: [
        {
          name: this.translations['help'],
          image: './assets/info.svg',
          type: 'button',
          click: () => {
            this.window.open(Scan);
          },
        }
      ]
    }
  ];

  menus = [
    {
      name: this.translations['configuration'],
      link: '/admin/panel/configuration',
    },
    {
      name: this.translations['loan-configuration'],
      link: '/admin/panel/loan-configuration',
    },
    {
      name: this.translations['lent-loan-requests'],
      link: '/admin/panel/lent-loan-requests',
    },
    {
      name: this.translations['loan-requests'],
      link: '/admin/panel/loan-requests',
    },
    {
      name: this.translations['users'],
      link: '/admin/panel/users',
    },
    {
      name: this.translations['change-password'],
      link: '/admin/panel/change-password'
    }
  ];

  constructor(
    private activated: ActivatedRoute,
    private SocketProvider: SocketProvider,
    @Inject(WINDOW) private window: IObjectKeys,
  ) { }

  ngOnInit() {
    this.SocketProvider.reconnect();
  }

  ngOnDestroy() {
    this.SocketProvider.disconnect();
  }


}
