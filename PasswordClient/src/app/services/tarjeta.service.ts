import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ResponseMessage } from '../interfaces/response-message';
import { Tarjeta } from '../interfaces/tarjeta';
import { Option } from '../interfaces/option';

@Injectable({
  providedIn: 'root',
})
export class TarjetaService {
  // Intención de dependencias
  private apiUrl = `${environment.apiUrl}/Tarjeta`;
  private http = inject(HttpClient);

  constructor() {}

  // Método para obtener toda la lista
  getAll(term?: string): Observable<Tarjeta[]> {
    let params = new HttpParams();
    if (term) {
      params = params.set('term', term);
    }

    return this.http.get<Tarjeta[]>(`${this.apiUrl}/GetAll`, {
      params,
    });
  }

  // Método para obtener una tarjeta
  get(id: number): Observable<Tarjeta> {
    return this.http.get<Tarjeta>(`${this.apiUrl}/Get/${id}`);
  }

  add(tarjeta: Tarjeta): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(`${this.apiUrl}/Add`, tarjeta);
  }

  update(tarjeta: Tarjeta): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>(`${this.apiUrl}/Update`, tarjeta);
  }

  // Método para eliminar una tarjeta
  delete(id: number): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(`${this.apiUrl}/Delete/${id}`);
  }

}
