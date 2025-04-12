import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserService } from '../../features/protected/dashboard/components/users/user.service';
import * as UsersActions from './users.actions';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map((users) => UsersActions.loadUsersSuccess({ users })),
          catchError((error) =>
            of(
              UsersActions.loadUsersFailure({
                error: error.message || 'Failed to load users',
              })
            )
          )
        )
      )
    )
  );
}
