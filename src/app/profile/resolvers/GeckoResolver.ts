import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GeckoProvider } from '../providers';
import { ProfileResolversModule } from './module';

@Injectable({ providedIn: ProfileResolversModule })

export class GeckoResolver implements Resolve<any> {

  constructor(
    private GeckoProvider: GeckoProvider,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {

    return this.GeckoProvider.get().pipe(map((data) => {
      return data;
    }));
  }

}
