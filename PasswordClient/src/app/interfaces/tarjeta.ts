export interface Tarjeta {
  id: number;
  userId: number;
  numeracion: string;
  fechaExpiracion: string;
  nombreTitular: string;
  nombreTarjeta: string;
  descripcion?: string;
  redId: number;
  tipoId: number;
  redNombre: string;
  tipoNombre: string;
}
