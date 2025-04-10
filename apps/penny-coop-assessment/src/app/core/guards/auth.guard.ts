import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { SnackbarService } from '../../shared/components/snackbar/snackbar.service';

export const authGuardFn: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const snackbarService = inject(SnackbarService);
  if (authService.isAuthenticated()) {
    return true;
  }
  snackbarService.info('Please login to access this page');
  return router.createUrlTree(['/login']);
};
