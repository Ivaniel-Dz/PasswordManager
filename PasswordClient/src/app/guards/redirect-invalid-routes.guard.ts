import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../services/jwt.service';

export const redirectInvalidRoutesGuard: CanActivateFn = () => {
  const jwtService = inject(JwtService);
  const router = inject(Router);

  if (jwtService.isAuthenticated()) {
    router.navigate(['/dashboard/passwords']);
  } else {
    router.navigate(['/auth/login']);
  }

  return false;
};
