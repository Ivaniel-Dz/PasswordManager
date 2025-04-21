import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})

export class JwtService {
  constructor() {}

  // Método para almacenar el token en el local storage
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Método para obtener el token del local storage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Método para decodificar el token, sin roles
  decodeToken(): any {
    // Obtenemos el token
    const token = this.getToken();
    // si no hay token, retornamos null
    if (!token) return null;

    // Decodificamos el token
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error al decodificar el token', error);
      return null;
    }
  }

  // Método para verificar si el token ha expirado
  isTokenExpired(): boolean {
    const decodedToken = this.decodeToken();
    if (!decodedToken || !decodedToken.exp) return true;

    const expirationTime = decodedToken.exp * 1000; // Convertir segundos a milisegundos
    return Date.now() > expirationTime;
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !this.isTokenExpired();
  }

  // Verificar la expiración del token y cerrar sesión si es necesario
  checkTokenExpiration(): void {
    if (this.isTokenExpired()) {
      this.logout();
    }
  }

  // Método para eliminar el token del local storage (Cerrar sesión)
  logout(): void {
    localStorage.removeItem('token');
  }
  
}
