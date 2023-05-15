import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { IObjectKeys } from 'src/app/helpers/interfaces';

import { AccountProvider } from '../providers';
import { ProfileResolversModule } from './module';

@Injectable({ providedIn: ProfileResolversModule })

export class AccountsResolver implements Resolve<IObjectKeys[]> {

  constructor(
    private AccountProvider: AccountProvider,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IObjectKeys[]> | Promise<IObjectKeys[]> | IObjectKeys[] {

    return this.AccountProvider.getAllUserAccounts();
  }

}
