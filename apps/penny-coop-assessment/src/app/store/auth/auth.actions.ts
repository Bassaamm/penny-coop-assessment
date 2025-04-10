import { createAction, props } from '@ngrx/store';
import { User } from '../../core/types/User';
import { Session } from '../../core/utils/session-utils';

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: Session }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const getProfile = createAction('[Auth] Get Profile');

export const getProfileSuccess = createAction(
  '[Auth] Get Profile Success',
  props<{ user: User }>()
);

export const getProfileFailure = createAction(
  '[Auth] Get Profile Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');

export const checkAuthStatus = createAction('[Auth] Check Auth Status');

export const authStatusChecked = createAction(
  '[Auth] Auth Status Checked',
  props<{ isAuthenticated: boolean }>()
);
