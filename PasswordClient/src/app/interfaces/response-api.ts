export interface ResponseApi<T> {
  isSuccess: boolean;
  message?: string;
  // Para Otros Interfaces 
  response?: T;
}
