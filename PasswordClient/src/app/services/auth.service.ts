import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';
import { Response } from '../interfaces/response';
import { Registro } from '../interfaces/registro';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Inyección de dependencias
  private http = Inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Auth`;

  constructor() {}

  // Registrar usuario
  register(registro: Registro): Observable<Response> {
    return this.http.post(`${this.apiUrl}/Registro`, registro);
  }

  // Iniciar sesión
  login(login: Login): Observable<Response>{
    return this.http.post(`${this.apiUrl}/Login`, login);
  }


}
