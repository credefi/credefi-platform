import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserProvider } from '../../providers/UserProvider';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { GuardsModule } from './module';

@Injectable({
  providedIn: GuardsModule
})

export class AuthGuard implements CanActivate {

  constructor(
    private UserProvider: UserProvider,
    private Router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    return this.UserProvider.get().pipe(map(({ result, error }) => {

      if (result) {
        return true;
      }

      const { url } = state;

      this.Router.navigate(['/authentication/login'], {
        queryParams: {
          url
        }
      });

      return false;

    }));

  }

}
