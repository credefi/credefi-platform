import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserProvider } from '../../providers/UserProvider';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { UserRoles } from '../../../globals/config';
import { GuardProvidersModule } from './GuardProvidersModule';

@Injectable({
  providedIn: GuardProvidersModule
})

export class AdminGuardProvider implements CanActivate {

  constructor(
    private UserProvider: UserProvider,
    private Router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    return this.UserProvider.get().pipe(map(({ result, error }) => {
      const { url } = state;

      if (error) {
        this.Router.navigate(['/authentication/login'], {
          queryParams: {
            url
          }
        });
        return false;
      }

      if (result && result.role == UserRoles.admin.key) {
        return true;
      }

      this.Router.navigate(['/authentication/login'], {
        queryParams: {
          url
        }
      });

      return false;

    }));

  }

}
