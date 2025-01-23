import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { z } from 'zod';
import { Observable } from 'rxjs';

// Define a schema for validating the login request
const schema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

export type LoginRequest = z.infer<typeof schema>;

export type LoginResponse = {
  token: string;
};

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  /**
   * Sends a login request to the server.
   *
   * @param {LoginRequest} request - The login request object containing user credentials.
   * @returns {Observable<LoginResponse>} An observable containing the server's response.
   */
  login(request: LoginRequest): Observable<LoginResponse> {
    // Send the request to the server
    return this.http.post<LoginResponse>(
      `${environment.apiURL}/auth/login`,
      schema.parse(request)
    );
  }
}
