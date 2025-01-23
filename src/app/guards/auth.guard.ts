import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * This function checks if the user is authenticated.
 * If authenticated, access to the route is granted. Otherwise, the user is redirected to the login page.
 *
 * @returns {Promise<boolean>} - A promise that resolves to `true` if the user is authenticated, or `false` if redirected to login.
 */
export const AuthGuard: CanActivateFn = async (): Promise<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = await authService.isAuthenticated();

  if (isAuthenticated) {
    return true;
  } else {
    await router.navigate(['auth/login']);
    return false;
  }
};
