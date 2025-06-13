export interface Tarjeta {
  id: number;
  numeracion: string;
  fechaExpiracion: string;
  titular: string;
  nombre: string;
  red: string;
  tipo: string;
  descripcion?: string;
}
