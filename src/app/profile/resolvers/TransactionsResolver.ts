import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { IObjectKeys } from 'src/app/helpers/interfaces';

import { TransactionProvider } from '../providers';
import { ProfileResolversModule } from './module';

@Injectable({ providedIn: ProfileResolversModule })

export class TransactionsResolver implements Resolve<IObjectKeys[]> {

  constructor(
    private TransactionProvider: TransactionProvider,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IObjectKeys[]> | Promise<IObjectKeys[]> | IObjectKeys[] {

    return this.TransactionProvider.getList({ skip: 0, limit: 50 });
  }

}
