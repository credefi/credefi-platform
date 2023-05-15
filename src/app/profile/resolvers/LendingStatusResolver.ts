import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { IObjectKeys } from 'src/app/helpers/interfaces';

import { LendingProvider } from '../providers';
import { ProfileResolversModule } from './module';

@Injectable({ providedIn: ProfileResolversModule })

export class LendingStatusResolver implements Resolve<IObjectKeys> {

  constructor(
    private Router: Router,
    private LendingProvider: LendingProvider,
  ) {   }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IObjectKeys> | Promise<IObjectKeys> | IObjectKeys {

    return this.LendingProvider.getStatus().pipe(map(({ result, error }) => {

      if (error) {
        this.Router.navigateByUrl('/error');
        return error;
      }

      return result;
    }));;
  }

}
