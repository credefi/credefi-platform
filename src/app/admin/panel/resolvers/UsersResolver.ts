import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { UserProvider } from '../providers';
import { AdminResolversModule } from './module';

@Injectable({ providedIn: AdminResolversModule })

export class UsersResolver implements Resolve<any> {

  constructor(
    private UserProvider: UserProvider,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any[]> | Promise<any[]> | any[] {
    const { skip = 0, role = null, search } = route.queryParams;
    const limit = skip || 50;

    if (search) {
      return this.UserProvider.searchUser({
        email: search
      });
    }

    return this.UserProvider.get({
      limit,
      skip: 0,
      role
    });
  }

}
