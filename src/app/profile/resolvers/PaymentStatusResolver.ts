import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { map, Observable } from 'rxjs';
import { IObjectKeys } from 'src/app/helpers/interfaces';

import { LendingProvider } from '../providers';
import { ProfileResolversModule } from './module';

@Injectable({ providedIn: ProfileResolversModule })

export class PaymentStatusResolver implements Resolve<IObjectKeys> {

  constructor(
    private LendingProvider: LendingProvider,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IObjectKeys> | Promise<IObjectKeys> | IObjectKeys {

    return this.LendingProvider.getUserStatus().pipe(map(({ result = {} }) => {
      return result;
    }));
  }

}
