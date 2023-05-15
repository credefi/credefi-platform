import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { IObjectKeys } from 'src/app/helpers/interfaces';

import { LoanProvider } from '../providers';
import { ProfileResolversModule } from './module';

@Injectable({ providedIn: ProfileResolversModule })

export class LoansResolver implements Resolve<IObjectKeys[]> {

  constructor(
    private LoanProvider: LoanProvider,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IObjectKeys[]> | Promise<IObjectKeys[]> | IObjectKeys[] {

    const { skip = 0 } = route.queryParams;
    const limit = skip > 0 ? skip : 20;

    const filter: {
      skip: number,
      limit: number,
    } = {
      limit,
      skip
    };

    return this.LoanProvider.getList(filter);
  }

}
