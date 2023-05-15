import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { IObjectKeys } from 'src/app/helpers/interfaces';

import { LendingProvider } from '../providers';
import { ProfileResolversModule } from './module';

@Injectable({ providedIn: ProfileResolversModule })

export class LendingsResolver implements Resolve<IObjectKeys[]> {

  constructor(
    private LendingProvider: LendingProvider,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IObjectKeys[]> | Promise<IObjectKeys[]> | IObjectKeys[] {

    const { skip = 0 } = route.queryParams;
    const limit = skip > 0 ? skip : 50;

    const filter: {
      skip: number,
      limit: number,
    } = {
      limit,
      skip
    };

    return this.LendingProvider.getList(filter);
  }

}
