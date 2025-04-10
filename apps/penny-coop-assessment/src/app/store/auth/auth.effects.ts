import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, concatMap } from 'rxjs/operators';
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
          map((response) => AuthActions.loginSuccess({ token: response })),
          catchError((error) =>
            of(
              AuthActions.loginFailure({
                error: error.message || 'Login failed',
              })
            )
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      map(() => AuthActions.getProfile())
    )
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

  getProfileSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.getProfileSuccess),
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

  getProfileFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.getProfileFailure),
        tap(({ error }) => {
          this.snackbar.error(error || 'Failed to load profile');
          this.authService.logout();
          this.router.navigate(['/login']);
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
        const isAuthenticated = this.authService.isAuthenticated();

        if (isAuthenticated) {
          return of(
            AuthActions.authStatusChecked({ isAuthenticated: true })
          ).pipe(concatMap((action) => [action, AuthActions.getProfile()]));
        }

        return of(AuthActions.authStatusChecked({ isAuthenticated: false }));
      })
    )
  );
}
