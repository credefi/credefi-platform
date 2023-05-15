import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class LoadingGuard implements CanActivate {

  constructor(
    private Router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    return true;

    // return this.UserProvider.get().pipe(map(({ result, error }) => {
    //   const { url } = state;

    //   if (error) {
    //     this.Router.navigate(['/authentication/login'], {
    //       queryParams: {
    //         url
    //       }
    //     });
    //     return false;
    //   }

    //   if (result && result.role == UserRoles.admin.key) {
    //     return true;
    //   }

    //   this.Router.navigate(['/authentication/login'], {
    //     queryParams: {
    //       url
    //     }
    //   });

    //   return false;

    // }));

  }

}
