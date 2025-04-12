import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import * as AuthActions from './auth.actions';
import { SnackbarService } from '../../shared/components/snackbar/snackbar.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private snackbar: SnackbarService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map((session) => AuthActions.loginSuccess({ session })),
          catchError((error) =>
            of(AuthActions.loginFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
          this.snackbar.success('Login successful!');
          this.router.navigate(['/dashboard']);
        })
      ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap(({ error }) => {
          this.snackbar.error(error || 'Login failed. Please try again.');
        })
      ),
    { dispatch: false }
  );

  getProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getProfile),
      switchMap(() =>
        this.authService.getProfile().pipe(
          map((user) => AuthActions.getProfileSuccess({ user })),
          catchError((error) =>
            of(
              AuthActions.getProfileFailure({
                error: error.message || 'Failed to load profile',
              })
            )
          )
        )
      )
    )
  );

  getProfileFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.getProfileFailure),
        tap(({ error }) => {
          this.snackbar.error(error || 'Failed to load profile');
          if (this.router.url.includes('/dashboard')) {
            this.router.navigate(['/landing']);
          }
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() => {
        this.authService.logout();
        return of(AuthActions.logoutSuccess());
      })
    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSuccess),
        tap(() => {
          this.snackbar.success('Logged out successfully');
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  checkAuthStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkAuthStatus),
      switchMap(() => {
        if (this.authService.isAuthenticated()) {
          return of(AuthActions.getProfile());
        } else {
          return of(AuthActions.authFailure({ error: 'Not authenticated' }));
        }
      })
    )
  );
}
