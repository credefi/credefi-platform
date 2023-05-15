import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { IObjectKeys } from 'src/app/helpers/interfaces';

import { UserProvider } from 'src/app/providers';
import { ProfileResolversModule } from './module';

@Injectable({ providedIn: ProfileResolversModule })

export class LastLoginResolver implements Resolve<IObjectKeys> {

  constructor(
    private UserProvider: UserProvider,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IObjectKeys> | Promise<IObjectKeys> | IObjectKeys {

    return this.UserProvider.lastLogin();
  }

}
