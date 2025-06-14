import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

const USER_KEY = 'demo-user';

const DEFAULT_USER: Usuario = {
  id: 1,
  nombre: 'Ivaniel Diaz',
  correo: 'user@demo.com',
  clave: '12345',
};

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private userSubject = new BehaviorSubject<Usuario>(this.getUserFromStorage());

  get user$() {
    return this.userSubject.asObservable();
  }

  private getUserFromStorage(): Usuario {
    const value = localStorage.getItem(USER_KEY);
    return value ? JSON.parse(value) : DEFAULT_USER;
  }

  getUser(): Usuario {
    return this.userSubject.value;
  }

  saveUser(user: Usuario): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.userSubject.next(user);
  }

  resetUser(): void {
    localStorage.removeItem(USER_KEY);
    this.userSubject.next(DEFAULT_USER);
  }

  restoreStorage() {
    localStorage.clear();
    this.userSubject.next(DEFAULT_USER);
  }
}
