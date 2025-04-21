import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Registro } from '../interfaces/registro';
import { Login } from '../interfaces/login';
import { ResponseMessage } from '../interfaces/response-message';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Inyección de dependencias
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Auth`;

  constructor() {}

  // Registrar usuario
  register(data: Registro): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(`${this.apiUrl}/Registro`, data);
  }

  // Iniciar sesión
  login(data: Login): Observable<ResponseMessage>{
    return this.http.post<ResponseMessage>(`${this.apiUrl}/Login`, data);
  }

}
