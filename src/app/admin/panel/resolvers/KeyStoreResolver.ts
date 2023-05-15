import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { map, Observable } from 'rxjs';

import { UserProvider } from '../providers';
import { AdminResolversModule } from './module';

@Injectable({ providedIn: AdminResolversModule })

export class KeyStoreResolver implements Resolve<any> {

  constructor(
    private router: Router,
    private UserProvider: UserProvider,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {

    return this.UserProvider.getKeyStore().pipe(map(({result}) => {
      if(result){
        return result;
      }
      return null
    }));
    
  }

}
