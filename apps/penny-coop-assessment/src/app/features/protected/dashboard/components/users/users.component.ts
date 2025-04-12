import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../../../core/types/User';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UsersActions, UsersSelectors } from '../../../../../store/users';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store) {
    this.users$ = this.store.select(UsersSelectors.selectAllUsers);
    this.loading$ = this.store.select(UsersSelectors.selectUsersLoading);
    this.error$ = this.store.select(UsersSelectors.selectUsersError);
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(): void {
    this.store.dispatch(UsersActions.loadUsers());
  }
}
