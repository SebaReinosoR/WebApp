// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private usernameSubject = new BehaviorSubject<string | null>(null);

  constructor() {}

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getUsername(): Observable<string | null> {
    return this.usernameSubject.asObservable();
  }

  login(token: string): void {
    // Lógica de inicio de sesión (almacenamiento del token, etc.)
    // ...

    // Actualiza el estado de autenticación a true y emite el nombre de usuario
    this.isAuthenticatedSubject.next(true);
  }

  logout(): void {
    // Lógica de cierre de sesión (eliminación del token, etc.)
    // ...

    // Actualiza el estado de autenticación a false y emite null para el nombre de usuario
    this.isAuthenticatedSubject.next(false);
    this.usernameSubject.next(null);
  }
}
