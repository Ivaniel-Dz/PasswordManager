import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Option } from '../interfaces/option';
import { Password } from '../interfaces/password';
import { ResponseMessage } from '../interfaces/response-message';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  // Intención de dependencias
  private apiUrl = `${environment.apiUrl}/Password`;
  private http = inject(HttpClient);

  constructor() {}

  // Método para obtener toda la lista completa | term | categoría
getAll(term?: string, category?: string): Observable<Password[]> {
  const params: any = {};
  if (term) params.term = term;
  if (category) params.category = category;

  return this.http.get<Password[]>(`${this.apiUrl}/GetAll`, { params });
}


  // Método para obtener una contraseña
  get(id: number): Observable<Password> {
    return this.http.get<Password>(`${this.apiUrl}/Get/${id}`);
  }

  add(password: Password): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(`${this.apiUrl}/Add`, password);
  }

  update(id: number, password: Password): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>(`${this.apiUrl}/Update/${id}`, password);
  }

  // Método para eliminar una contraseña
  delete(id: number): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(`${this.apiUrl}/Delete/${id}`);
  }

}
