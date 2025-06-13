export interface Tarjeta {
  id: number;
  numeracion: string;
  fechaExpiracion: Date;
  titular: string;
  nombre: string;
  red: string;
  tipo: string;
  descripcion?: string;
}
