import { HttpInterceptorFn } from '@angular/common/http';
import { JwtService } from '../services/jwt.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  // Inyectar el servició
  const authService = inject(JwtService);
  // Obtener el token del servicio
  const token = authService.getToken();

  // Si hay un token, lo añadirá a la cabecera de la petición, si no, no hará nada
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  // Continuar con la petición
  return next(authReq);
};
