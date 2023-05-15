import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IObjectKeys } from 'src/app/helpers/interfaces';

import { LoanProvider } from '../providers';
import { AdminResolversModule } from './module';

@Injectable({ providedIn: AdminResolversModule })

export class LoanResolver implements Resolve<IObjectKeys> {

  constructor(
    private router: Router,
    private LoanProvider: LoanProvider,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IObjectKeys> | Promise<IObjectKeys> | IObjectKeys {

    const { loanKey } = route.params;

    return this.LoanProvider.get({ loanKey }).pipe(map(({result}) => {
      if(result){
        return result;
      }
      return this.router.navigateByUrl('/admin/panel/loan-requests')
    }));
  }

}
