import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Store, StoreModule } from '@ngrx/store';
import * as AuthActions from './store/auth/auth.actions';
import { AuthService } from './core/services/auth.service';

@Component({
  imports: [RouterOutlet, CommonModule, MatSnackBarModule, StoreModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'penny-coop-assessment';

  constructor(private store: Store, private authService: AuthService) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.store.dispatch(AuthActions.checkAuthStatus());
    }
  }
}
