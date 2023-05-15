import { Injectable } from '@angular/core';
import { ApiProvider } from '../../providers';
import { ProfileProvidersModule } from './module';

@Injectable({
  providedIn: ProfileProvidersModule
})

export class PromoCodeProvider {

  private path: string = 'promo-code'

  constructor(
    private ApiProvider: ApiProvider
  ) { }

  get(promocode: string) {
    return this.ApiProvider.get(`${this.path}?promocode=${promocode}`);
  }

}
