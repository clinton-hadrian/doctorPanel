import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from '../../features/auth/auth.service';
import { environment } from '../../../environments/environment';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const userName = environment.USERNAME;
  const password = environment.PASSWORD;

  const authReq = req.clone({
    setHeaders: {
      // Authorization: `Bearer ${authService.getToken()}`, //use this for JWT token
      Authorization: `Basic ${btoa(`${userName}:${password}`)}`
    }
  })

  return next(authReq).pipe(tap({
    error: (err) => {
      if (err.status === 401) {
        // handle 401 error
      }
      if (err.status === 404) {
        // handle unauthorised error
      }
    }
  }));
};
