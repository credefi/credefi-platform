import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ConfigurationProvider } from '../providers';
import { ProfileResolversModule } from './module';

@Injectable({ providedIn: ProfileResolversModule })

export class TVLResolver implements Resolve<any> {

  constructor(
    private ConfigurationProvider: ConfigurationProvider,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {

    return this.ConfigurationProvider.getTVL().pipe(map(({ result, error }) => {

      if (error) {
        return 0;
      }

      return result;
    }));
  }

}
