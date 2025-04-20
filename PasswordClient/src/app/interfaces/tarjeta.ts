export interface Tarjeta {
  id: number;
  userId: number;
  numeracion: number;
  fechaExpiracion: Date;
  nombreTitular: string;
  redTarjeta: string;
  tipoTarjeta: string;
  descripcion: string;
}
