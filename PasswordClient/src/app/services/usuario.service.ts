import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

const USER_KEY = 'demo-user';

const DEFAULT_USER: Usuario = {
  id: 1,
  nombre: 'Ivaniel Diaz',
  correo: 'user@demo.com',
  clave: '12345'
};

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  // Obtener usuario desde localStorage
  getUser(): Usuario {
    const value = localStorage.getItem(USER_KEY);
    return value ? JSON.parse(value) : DEFAULT_USER;
  }

  // Guardar usuario en localStorage
  saveUser(user: Usuario): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  // Eliminar usuario (o limpiar todo localStorage si lo deseas)
  resetUser(): void {
    localStorage.removeItem(USER_KEY);
  }

  // Borra todo los datos guardados del LocalStorage
  restoreStorage() {
    localStorage.clear();
  }

}
