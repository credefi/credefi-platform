import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { map, Observable } from 'rxjs';
import { IObjectKeys } from 'src/app/helpers/interfaces';

import { UserProvider } from 'src/app/providers';
import { ProfileResolversModule } from './module';

@Injectable({ providedIn: ProfileResolversModule })

export class ReferralResolver implements Resolve<IObjectKeys> {

  constructor(
    private UserProvider: UserProvider,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IObjectKeys> | Promise<IObjectKeys> | IObjectKeys {
    const { referral } = route.params;
    return this.UserProvider.getReferral({ hash: referral }).pipe(map(({ result }) => {
      return result;
    }));
  }

}
