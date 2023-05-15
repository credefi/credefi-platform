import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { MapProvider } from 'src/app/providers';

@Component({
  selector: 'profile-info-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class InfoProfileComponent {

  user: IObjectKeys;
  status: IObjectKeys;
  _fundsDeployed!: number;

  lastLogin!: Date;
  translations: { [key: string]: string | Function | any } = this.activateRoute.snapshot.data.translations;

  constructor(
    mapProvider: MapProvider,
    private activateRoute: ActivatedRoute
  ) {

    const { lastLogin, status } = this.activateRoute.snapshot.data;
    this.user = mapProvider.get(MapProvider.USER);

    if (lastLogin?.result) {
      this.lastLogin = new Date(lastLogin?.result);
    }

    this.status = status;
    this.setFundsDeployed();

  }

  get letter() {
    return this.user?.email[0]
  }

  get email() {
    return this.user?.email;
  }

  get fundsDeployed() {
    return this._fundsDeployed;
  }

  setFundsDeployed() {
    let n = 0;
    for (const key in this.status) {
      for (const k in this.status[key]) {
        n += this.status[key][k].totalAmount;
      }
    }
    this._fundsDeployed = n;
  }

}
