import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '@/app/services/auth.service';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit {
  private authService = inject(AuthService);
  isAdmin: boolean = false;

  ngOnInit(): void {
    const userRoles = this.authService.getUserRole();
    this.isAdmin = userRoles ? userRoles.includes('ADMINISTRATOR') : false;
  }

  logout(): void {
    this.authService.logout();
  }
}
