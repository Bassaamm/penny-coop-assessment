import { createAction, props } from '@ngrx/store';
import { User } from '../../core/types/User';
import { Session } from '../../core/utils/session-utils';

export const checkAuthStatus = createAction('[Auth API] Check Auth Status');
export const authSuccess = createAction('[Auth API] Auth Success');
export const authFailure = createAction(
  '[Auth API] Auth Failure',
  props<{ error: string }>()
);

export const login = createAction(
  '[Auth API] Login',
  props<{ email: string; password: string }>()
);
export const loginSuccess = createAction(
  '[Auth API] Login Success',
  props<{ session: Session }>()
);
export const loginFailure = createAction(
  '[Auth API] Login Failure',
  props<{ error: string }>()
);

export const getProfile = createAction('[Auth] Get Profile');
export const getProfileSuccess = createAction(
  '[Auth API] Get Profile Success',
  props<{ user: User }>()
);
export const getProfileFailure = createAction(
  '[Auth API] Get Profile Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth API] Logout');
export const logoutSuccess = createAction('[Auth API] Logout Success');
