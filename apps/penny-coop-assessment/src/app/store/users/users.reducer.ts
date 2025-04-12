import { createReducer, on } from '@ngrx/store';
import * as UsersActions from './users.actions';
import { User } from '../../core/types/User';

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const usersReducer = createReducer(
  initialState,
  on(UsersActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UsersActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
    error: null,
  })),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
