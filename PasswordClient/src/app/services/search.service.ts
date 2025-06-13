import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  // Filtro de Búsqueda
  filter<T>(items: T[], term: string, keys: (keyof T)[]): T[] {
    const search = term.toLowerCase();
    return items.filter((item) =>
      keys.some((key) => String(item[key]).toLowerCase().includes(search))
    );
  }
}
