export interface Password {
  id: number;
  userId: number;
  nombre: string;
  url: string;
  userEmail: string;
  clave: string;
  notas: string;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  categoriaId: number;
  categoriaNombre: string;
}
