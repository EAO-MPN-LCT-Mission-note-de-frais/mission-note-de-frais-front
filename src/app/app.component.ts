import {Component, input, signal} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {AuthService} from './services/auth.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'MissionNoteDeFrais';

  isAuthenticated = signal(false);

  constructor(private authService: AuthService, private router: Router) {
    this.authService.authenticated.subscribe((isAuthenticated) => {
      this.isAuthenticated.set(isAuthenticated);
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
