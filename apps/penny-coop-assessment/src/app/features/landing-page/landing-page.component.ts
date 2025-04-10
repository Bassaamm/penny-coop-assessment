import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../core/types/User';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthSelectors from '../../store/auth/auth.selectors';
import * as AuthActions from '../../store/auth/auth.actions';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  isLoggedIn: Observable<boolean>;
  userProfile: Observable<User | null>;

  constructor(private router: Router, private store: Store) {
    this.isLoggedIn = this.store.select(AuthSelectors.selectIsAuthenticated);
    this.userProfile = this.store.select(AuthSelectors.selectAuthUser);
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  signUp(): void {
    this.router.navigate(['/signup']);
  }

  viewDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
