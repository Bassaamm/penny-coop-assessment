import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';

  login(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    // You could also set a cookie here if preferred
    // document.cookie = `${this.TOKEN_KEY}=${token}; path=/; max-age=86400`;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    // If using cookies, also clear them
    // document.cookie = `${this.TOKEN_KEY}=; path=/; max-age=0`;
  }

  isAuthenticated(): boolean {
    // Check localStorage for token
    const token = localStorage.getItem(this.TOKEN_KEY);

    // Alternatively, check cookies
    // const cookies = document.cookie.split(';');
    // const tokenCookie = cookies.find(cookie => cookie.trim().startsWith(`${this.TOKEN_KEY}=`));
    // const token = tokenCookie ? tokenCookie.split('=')[1] : null;

    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
