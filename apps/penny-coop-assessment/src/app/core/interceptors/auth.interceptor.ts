import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { getSession, deleteSession } from '../utils/session-utils';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const session = getSession();
  const token = session?.access_token;

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        deleteSession();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
