import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { SnackbarService } from '../../shared/components/snackbar/snackbar.service';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth/auth.actions';

export const authGuardFn: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const snackbarService = inject(SnackbarService);
  const store = inject(Store);

  if (authService.isAuthenticated()) {
    store.dispatch(AuthActions.getProfile());
    return true;
  }

  snackbarService.info('Please login to access this page');
  return router.createUrlTree(['/login']);
};
