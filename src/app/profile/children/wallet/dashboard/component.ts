import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'wallet-dashboard-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class WalletDashboardComponent {

  translations: { [key: string]: string | Function | any } = this.activateRoute.snapshot.data.translations;

  constructor(private activateRoute: ActivatedRoute) { }

}
