import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ResponseMessage } from '../interfaces/response-message';
import { Usuario } from '../interfaces/usuario';
import { ResponseApi } from '../interfaces/response-api';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  // Inyección de dependencias
  private apiUrl = `${environment.apiUrl}/Usuario`;
  private http = inject(HttpClient);

  constructor() {}

  // Obtener los datos del Usuario Autenticado
  getPerfil(): Observable<ResponseApi<Usuario>> {
    return this.http.get<ResponseApi<Usuario>>(`${this.apiUrl}/Perfil`);
  }

  // Actualizar Perfil
  update(usuario: Usuario): Observable<ResponseApi<Usuario>> {
    return this.http.put<ResponseApi<Usuario>>(`${this.apiUrl}/Update`,usuario);
  }

  // Eliminar Cuenta
  delete(id: number): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(`${this.apiUrl}/Delete/${id}`);
  }
  
}
