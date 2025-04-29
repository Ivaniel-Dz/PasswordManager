import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../services/jwt.service';

// Guardia para verificar si el usuario está autenticado (Sin roles)
export const authGuard: CanActivateFn = (route, state) => {
  // Inyecta el servicio
  const jwtService = inject(JwtService);
  // Inyecta el router
  const router = inject(Router);

  // Verifica si el token ha expirado
  if (jwtService.isTokenExpired()) {
    jwtService.logout(); // Cierra sesión si expiró
    return router.navigate(['/auth/login']); // Redirige al login
  }

  // Si está autenticado, permite el acceso
  return jwtService.isAuthenticated() ? true : router.navigate(['/auth/login']);;
};
