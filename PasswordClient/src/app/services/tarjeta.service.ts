import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseApi } from '../interfaces/response-api';
import { Tarjeta } from '../interfaces/tarjeta';

@Injectable({
  providedIn: 'root',
})
export class TarjetaService {
  // Intención de dependencias
  private apiUrl = `${environment.apiUrl}/Tarjeta`;
  private http = inject(HttpClient);

  constructor() {}

  getAll(term?: string): Observable<Tarjeta[]> {
    let params = new HttpParams();
    if (term) {
      params = params.set('term', term);
    }

    return this.http.get<Tarjeta[]>(`${this.apiUrl}/GetAll`, {
      params,
    });
  }
}
