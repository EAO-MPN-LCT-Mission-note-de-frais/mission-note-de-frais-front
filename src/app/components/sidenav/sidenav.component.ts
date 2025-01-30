import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {AuthService} from '@/app/services/auth.service';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-sidenav',
  imports: [CommonModule, RouterModule, MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  private authService = inject(AuthService);

  logout(): void {
    this.authService.logout();
  }
}
