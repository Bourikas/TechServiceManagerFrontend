import { HttpClient } from '@angular/common/http';
import { Injectable, effect, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Credentials, User } from '../interfaces/user';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import { of, tap, switchMap } from 'rxjs';

const API_URL = `${environment.apiURL}`;

interface LoginResponse {
  access: string;
  refresh: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);

  user = signal<User | null>(null);

  constructor() {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      this.setUserFromToken(access_token);
    }

    effect(() => {
      if (this.user()) {
        console.log('User logged in', this.user().id);
      } else {
        console.log('No user logged in');
      }
    });
  }

  private setUserFromToken(token: string) {
    const decodedToken = jwtDecode<any>(token);
    this.http.get<User>(`${API_URL}/api/users/${decodedToken.user_id}/`).subscribe({
      next: (user) => {
        this.user.set(user);
      },
      error: (err) => console.error('Error fetching user details', err)
    });
  }

  registerUser(user: User) {
    return this.http.post<{ msg: string }>(`${API_URL}/register`, user);
  }

  check_duplicate_email(email: string) {
    return this.http.get<{ msg: string }>(
      `${API_URL}api/check-duplicate-email/${email}`,
    );
  }

  loginUser(credentials: Credentials) {
    return this.http.post<LoginResponse>(`${API_URL}/api/token/`, credentials).pipe(
      tap(response => {
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
        this.setUserFromToken(response.access);
      })
    );
  }

  logoutUser() {
    this.user.set(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['login']);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  loggedInUser(): User | null {
    return this.user();
  }

  isLoggedIn() {
    return !!localStorage.getItem('access_token');
  }

  isTokenExpired() {
    const token = localStorage.getItem('access_token');
    if (!token) return true;

    const decoded = jwtDecode<any>(token);
    if (!decoded.exp) return true;
    const expirationDate = decoded.exp * 1000;
    const now = new Date().getTime();

    return expirationDate < now;
  }

  refreshToken() {
    const refresh_token = localStorage.getItem('refresh_token');
    if (!refresh_token) return of(null);

    return this.http.post<{ access: string }>(`${API_URL}/api/token/refresh/`, { refresh: refresh_token }).pipe(
      tap((tokens: { access: string }) => {
        localStorage.setItem('access_token', tokens.access);
        this.setUserFromToken(tokens.access);
      })
    );
  }
}
