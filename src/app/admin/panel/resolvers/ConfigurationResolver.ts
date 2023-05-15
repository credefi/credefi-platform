import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ConfigurationProvider } from '../providers';
import { AdminResolversModule } from './module';

@Injectable({ providedIn: AdminResolversModule })

export class ConfigurationResolver implements Resolve<any> {

  constructor(
    private Router: Router,
    private ConfigurationProvider: ConfigurationProvider,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {

    return this.ConfigurationProvider.get().pipe(map(({ result, error }) => {

      if (error) {
        this.Router.navigateByUrl('/error');
        return error;
      }

      return result;
    }));
  }

}
