import { Route } from '@angular/router';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { LoginComponent } from './features/auth/login/login.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { ForgetPasswordComponent } from './features/auth/forget-password/forget-password.component';
import { authGuardFn } from './core/guards/auth.guard';
import { ResetPasswordComponent } from './features/auth/reset-password/reset-password.component';
import { DASHBOARD_ROUTES } from './features/protected/dashboard/dashboard-routing.module';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  {
    path: 'landing',
    component: LandingPageComponent,
  },
  {
    path: 'dashboard',
    children: DASHBOARD_ROUTES,
    canActivate: [authGuardFn],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'forgot-password',
    component: ForgetPasswordComponent,
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent,
  },
  { path: '**', redirectTo: 'landing' },
];
