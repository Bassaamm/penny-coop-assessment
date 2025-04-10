import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Store, StoreModule } from '@ngrx/store';
import * as AuthActions from './store/auth/auth.actions';

@Component({
  imports: [
    LandingPageComponent,
    RouterOutlet,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatSnackBarModule,
    StoreModule,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'penny-coop-assessment';

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(AuthActions.checkAuthStatus());
  }
}
