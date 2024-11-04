// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService();
  private isLoggedInSubject = new BehaviorSubject<boolean>(!!this.getToken());
  private isAdminSubject = new BehaviorSubject<boolean>(this.getRoleFromToken() === 'admin');

  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  isAdmin$ = this.isAdminSubject.asObservable();

  private apiUrl = 'http://localhost:8081/api/auth/login';

  constructor(private http: HttpClient) {
    // Configura el estado basado en el token al iniciar el servicio
    this.updateAuthStatusFromToken();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { correo: email, hash_password: password }).pipe(
      tap((response: any) => {
        if (response.token) {
          this.setToken(response.token);
          this.updateAuthStatusFromToken();
        }
      })
    );
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';
  }

  private setToken(token: string): void {
    if (this.isBrowser()) {
      sessionStorage.setItem('authToken', token);
    }
  }

  private getToken(): string | null {
    return this.isBrowser() ? sessionStorage.getItem('authToken') : null;
  }

  private getRoleFromToken(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken = this.jwtHelper.decodeToken(token);
        return decodedToken.role || null;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
      }
    }
    return null;
  }

  private updateAuthStatusFromToken(): void {
    const role = this.getRoleFromToken();
    this.isLoggedInSubject.next(!!this.getToken());
    this.isAdminSubject.next(role === 'ADMIN');
  }

  logout(): void {
    if (this.isBrowser()) {
      sessionStorage.clear();
    }
    this.isLoggedInSubject.next(false);
    this.isAdminSubject.next(false);
  }
}