import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  Session,
  getSession,
  setSession,
  deleteSession,
} from '../utils/session-utils';
import { map, tap } from 'rxjs/operators';
import { User } from '../types/User';
import { environment } from '../../../environments/environments';

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private session: Session | null = getSession();
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAccessToken(): string | null {
    return this.session?.access_token || null;
  }

  isAuthenticated(): boolean {
    this.session = getSession();
    return !!this.session?.access_token;
  }

  login(email: string, password: string): Observable<Session> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/auth/login`, { email, password })
      .pipe(
        tap((response) => {
          this.session = {
            access_token: response.access_token,
            refresh_token: response.refresh_token,
          };
          setSession(this.session);
        })
      );
  }

  signUp(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/auth/signup`, {
      firstName,
      lastName,
      email,
      password,
    });
  }

  getProfile(): Observable<User> {
    this.session = getSession();
    if (!this.session?.access_token) {
      return throwError(() => new Error('No access token found'));
    }

    return this.http.get<User>(`${this.API_URL}/auth/profile`);
  }
  refreshToken(): Observable<string> {
    if (!this.session?.refresh_token) {
      deleteSession();
      return new Observable((observer) => observer.complete());
    }

    return this.http
      .post<AuthResponse>(`${this.API_URL}/auth/refresh-token`, {
        refresh_token: this.session.refresh_token,
      })
      .pipe(
        tap((res) => {
          this.session = {
            access_token: res.access_token,
            refresh_token: res.refresh_token,
          };
          setSession(this.session);
        }),
        map((res) => res.access_token)
      );
  }

  logout(): void {
    this.session = null;
    deleteSession();
  }
  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/reset-password`, { email });
  }

  resetPassword(token: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/reset-password/${token}`, {
      password,
    });
  }
}
