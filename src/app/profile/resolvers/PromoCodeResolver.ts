import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { IObjectKeys } from 'src/app/helpers/interfaces';

import { PromoCodeProvider } from '../providers';
import { ProfileResolversModule } from './module';

@Injectable({ providedIn: ProfileResolversModule })

export class PromoCodeResolver implements Resolve<IObjectKeys> {

  constructor(
    private router: Router,
    private PromoCodeProvider: PromoCodeProvider,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IObjectKeys> | Promise<IObjectKeys> | IObjectKeys {

    return this.PromoCodeProvider.get(route.params.code).pipe(map((item) => {
      if(item.result){
        return item.result;
      }
      this.router.navigateByUrl('/profile/lend/action')
      return false;
    }));
  }

}
