import {Component, inject} from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { AuthService } from '../services/auth.service';
import {ErrorHandlerService} from '@/app/utils/error-handler.service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButton,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  private authService = inject(AuthService);
  private errorHandlerService = inject(ErrorHandlerService);

  email = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    const email = this.email.value ?? '';
    const password = this.password.value ?? '';
    this.authService.authenticate(email, password).subscribe({
      next: () => {
        console.log('Authentifier avec succès.');
      },
      error: (error) => {
        this.errorHandlerService.handleError(error, "Le mot de passe est ou l'email est inconnu.");
      }
    });
  }
}
