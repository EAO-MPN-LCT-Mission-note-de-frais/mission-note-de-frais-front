import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { UserManagementComponent } from '../user-management/user-management.component';
import { TransportManagementComponent } from '../transport-management/transport-management.component';
import { ExpenseTypeManagementComponent } from '../expense-type-management/expense-type-management.component';

import { TransportService } from '@/app/services/transport.service';
import { ExpenseTypeService } from '@/app/services/expense-type.service';

import { Transport } from '@/app/interfaces/transport';
import { ExpenseType } from '@/app/interfaces/expense-type';
import { ConfigurationModalComponent } from '@/app/components/configuration/configuration-modal/configuration-modal.component';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [
    CommonModule,
    UserManagementComponent,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  transports: Transport[] = [];
  expenseTypes: ExpenseType[] = [];
  private dialog = inject(MatDialog);

  constructor(
    private router: Router,
    private transportService: TransportService,
    private expenseTypeService: ExpenseTypeService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Charge les types de transport et les natures de frais depuis l'API.
   */
  loadData(): void {
    this.transportService.getAllTransports().subscribe(data => this.transports = data);
    this.expenseTypeService.getAllExpenseTypes().subscribe(data => this.expenseTypes = data);
  }

  /**
   * Ouvre une modale pour ajouter un Transport ou une Nature de Frais.
   * @param type 'Transport' ou 'ExpenseType'
   */
  openModal(type: 'Transport' | 'ExpenseType'): void {
    const dialogRef = this.dialog.open(ConfigurationModalComponent, {
      data: { type },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (type === 'Transport') {
          this.transportService.createTransport(result).subscribe(() => this.loadData());
        } else {
          this.expenseTypeService.createExpenseType(result).subscribe(() => this.loadData());
        }
      }
    });
  }

  /**
   * Retour à l'accueil.
   */
  returnHome(): void {
    this.router.navigate(['/']);
  }
}
