import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Option } from '../interfaces/option';

@Injectable({
  providedIn: 'root',
})
export class OptionService {
  // Intención de dependencias
  private apiUrl = `${environment.apiUrl}/Option`;
  private http = inject(HttpClient);

  constructor() {}

  // Método para obtener las opciones para select
  getCategorias(): Observable<Option[]> {
    return this.http.get<Option[]>(`${this.apiUrl}/GetCategoria`);
  }

  getRedes(): Observable<Option[]> {
    return this.http.get<Option[]>(`${this.apiUrl}/GetRed`);
  }

  getTipos(): Observable<Option[]> {
    return this.http.get<Option[]>(`${this.apiUrl}/GetTipo`);
  }
}
