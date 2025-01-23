import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '@/app/services/auth.service';

/**
 * Intercepts HTTP requests to add an authorization token to the headers.
 * @param req - The outgoing HTTP request.
 * @param next - The next handler in the chain.
 */
export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const token = authService.getToken()

  let newRequest = req;
  if (token) {
    newRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(newRequest);
};
