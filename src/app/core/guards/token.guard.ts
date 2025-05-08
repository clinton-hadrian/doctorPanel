import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
class isTokenPresent {
  constructor(private router: Router) {}

  canActivate(path?: string): boolean {
    // if (path == '') {
    //   if (!window.sessionStorage?.getItem('TOKEN')) {
    //     return true;
    //   } else {
    //     this.router.navigate(['/home']);
    //     return false;
    //   }
    // } else {
    //   if (window.sessionStorage?.getItem('TOKEN')) {
    //     return true;
    //   } else {
    //     this.router.navigate(['/']);
    //     return false;
    //   }
    // }
    return true;
  }
}

export const tokenGuard: CanActivateFn = (route, state) => {
  return inject(isTokenPresent).canActivate(route.routeConfig?.path);
};
