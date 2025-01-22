import {Injectable} from '@angular/core';
import {LoginResponse, LoginService} from './login.service';
import {isEmpty} from 'lodash';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';

/**
 * Constant key used to store the authentication session token in session storage.
 */
const SESSION_KEY = 'AUTH_SESSION_TOKEN';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #authenticated: BehaviorSubject<boolean>;

  constructor(private loginService: LoginService, private router: Router) {
    this.#authenticated = new BehaviorSubject(this.isAuthenticated());
  }

  /**
   * Observable that emits the current authentication state.
   */
  get authenticated(): Observable<boolean> {
    return this.#authenticated.asObservable();
  }

  /**
   * Authenticates the user by sending their credentials to the login service
   * and storing the received token in session storage.
   *
   * @param email - The user's email address.
   * @param password - The user's password.
   */
  authenticate(email: string, password: string): void {
    this.loginService
      .login({email, password})
      .subscribe((response: LoginResponse) => {
        sessionStorage.setItem(SESSION_KEY, response.token);
        this.#authenticated.next(true);
        this.router.navigate(['/']);
      });
  }

  /**
   * Checks if the user is currently authenticated.
   *
   * @returns `true` if the session token is present and not empty; otherwise, `false`.
   */
  isAuthenticated(): boolean {
    return !isEmpty(sessionStorage.getItem(SESSION_KEY));
  }

  /**
   * Logs out the user by removing the session token from session storage.
   */
  logout(): void {
    sessionStorage.removeItem(SESSION_KEY);
    this.#authenticated.next(false);
  }

  /**
   * Retrieves the session token from session storage.
   *
   * @returns The session token, or `null` if no token is stored.
   */
  getToken(): string | null {
    return sessionStorage.getItem(SESSION_KEY);
  }
}
