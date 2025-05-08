import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/auth.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const allowedRole = route.data['role'];
  const currentRole = inject(AuthService).getRole();
  const router = inject(Router);


  if (allowedRole === 'ALL' || allowedRole === currentRole) {
    return true;
  } else {
    router.navigate(['/home/unauthorized']);
    return false;

  }

};
