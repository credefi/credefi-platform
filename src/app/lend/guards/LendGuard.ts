import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GuardProvidersModule } from './GuardProvidersModule';

@Injectable({
  providedIn: GuardProvidersModule
})

export class LendGuardProvider implements CanActivate {

  constructor(
    private Router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    const { token } = route.params;
    this.Router.navigateByUrl(`/profile/lend/${token}`);
    return false

  }

}
