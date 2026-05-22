import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface User { id: number; name: string; email: string; role: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  // private apiUrl = 'http://localhost:3000/api/auth';
 
private apiUrl = environment.apiUrl + '/api/auth';
  private userSubject = new BehaviorSubject<User | null>(this.getStoredUser());
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.userSubject.next(res.user);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null { return localStorage.getItem('token'); }
  isLoggedIn(): boolean { return !!this.getToken(); }
  getUser(): User | null { return this.userSubject.value; }
  isAdmin(): boolean { return this.getUser()?.role === 'admin'; }
  isFaculty(): boolean { return ['admin','faculty'].includes(this.getUser()?.role || ''); }

  private getStoredUser(): User | null {
    try { const u = localStorage.getItem('user'); return u ? JSON.parse(u) : null; }
    catch { return null; }
  }
}
