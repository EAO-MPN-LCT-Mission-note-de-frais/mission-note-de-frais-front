import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

/**
 * Check if the user is not authenticated and continue to the login page.
 * Else, redirect to the home page.
 */
export const LoginGuard: CanActivateFn = async (): Promise<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isAuthenticated();

  if (isAuthenticated) {
    await router.navigate(['/']);
    return false;
  } else {
    return true;
  }
};
