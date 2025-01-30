import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'MissionNoteDeFrais';

  isAuthenticated = signal(false);

  constructor(private authService: AuthService) {
    this.authService.authenticated.subscribe((isAuthenticated) => {
      this.isAuthenticated.set(isAuthenticated);
    });
  }
}
