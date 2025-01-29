import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from '../user-management/user-management.component';
import { TransportManagementComponent } from '../transport-management/transport-management.component';
import { ExpenseTypeManagementComponent } from '../expense-type-management/expense-type-management.component';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [
    CommonModule,
    UserManagementComponent,
    TransportManagementComponent,
    ExpenseTypeManagementComponent,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent {
  constructor(private router: Router) {}

  returnHome(): void {
    this.router.navigate(['/']);
  }
}
