import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { IObjectKeys } from 'src/app/helpers/interfaces';

import { LendingProvider } from '../providers';
import { AdminResolversModule } from './module';

@Injectable({ providedIn: AdminResolversModule })

export class LendingsResolver implements Resolve<IObjectKeys[]> {

  constructor(
    private LendingProvider: LendingProvider,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IObjectKeys[]> | Promise<IObjectKeys[]> | IObjectKeys[] {

    const { skip = 0, text, processing, year, month, day } = route.queryParams;
    const limit = skip > 0 ? skip : 20;

    const filter: {
      skip: number,
      limit: number,
      text?: string,
      processing?: boolean,
      year?: number,
      month?: number,
      day?: number
    } = {
      limit,
      skip,
      text,
      year,
      month,
      day,
    };

    if (processing) {
      filter.processing = true;
    }

    return this.LendingProvider.getList(filter);
  }

}
