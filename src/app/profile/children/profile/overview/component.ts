import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { KycProvider } from 'src/app/profile/providers';
import { MapProvider } from 'src/app/providers';

@Component({
  selector: 'over-view-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class OverViewComponent {

  user: IObjectKeys
  translations: { [key: string]: string | Function | any } = this.activateRoute.snapshot.data.translations;

  constructor(
    mapProvider: MapProvider,
    private activateRoute: ActivatedRoute,
    private KycProvider: KycProvider
    ) { 
      this.user = mapProvider.get(MapProvider.USER);
    }


  verification() {
    this.KycProvider.initIframe();
  }
}
