import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {MissionSummaryComponent} from './mission-summary/mission-summary.component';
import {ExpenseTableComponent} from './expense-table/expense-table.component';
import {Status} from "../interfaces/status";
import {Mission} from "../interfaces/mission";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-expense-report',
  standalone: true,
  imports: [CommonModule, MissionSummaryComponent, ExpenseTableComponent, MatIcon, MatButton, MatIconButton],
  templateUrl: './expense-report.component.html',
  styleUrl: './expense-report.component.css'
})
export class ExpenseReportComponent {

  mission: Mission = {
    id: 1,
    startDate: new Date('2023-10-01'),
    endDate: new Date('2023-10-05'),
    startTown: 'Paris',
    endTown: 'Lyon',
    status: Status.EN_ATTENTE_VALIDATION,
    transportIds: [1],
    expenseReport: {
      id: 1,
      amount: 855,
      status: Status.VALIDEE,
      expenses: [
        { id: '1', date: '2023-10-01', description: 'Billet de train', type: 'Transport', amount: 150, tax: 20 },
        { id: '2', date: '2023-11-02', description: 'Hôtel', type: 'Logement', amount: 400, tax: 10 },
        { id: '3', date: '2023-10-03', description: undefined, type: 'Restauration', amount: 50, tax: 5 },
      ],
    }
  };

  constructor(private router: Router) {}

  returnHome() {
    this.router.navigate(['/missions']);
  }

  openCreateModal() {
    console.log('openCreateModal');
  }

  export() {
    console.log('export');
  }

  submit() {
    console.log('submit');
  }

  delete() {
    console.log('delete');
  }

}
