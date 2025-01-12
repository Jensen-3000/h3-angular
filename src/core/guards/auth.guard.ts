import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Role } from '../services/auth/auth.interface';

export const authGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const requiredRoles = route.data['roles'] as Role[];
  const snackBar = inject(MatSnackBar);

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  const hasAccess = authService.hasRequiredRole(requiredRoles);

  if (!hasAccess) {
    snackBar.open('401 Unauthorized - Access Denied', 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar'],
    });
    return false;
  }

  return true;
};

// https://youtu.be/ctPVzdkpRBI?t=1257
