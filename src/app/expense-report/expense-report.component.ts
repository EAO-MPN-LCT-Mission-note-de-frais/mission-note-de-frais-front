import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MissionSummaryComponent} from './mission-summary/mission-summary.component';
import {ExpenseTableComponent} from './expense-table/expense-table.component';
import {Status} from "../interfaces/status";
import {Mission} from "../interfaces/mission";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {ActivatedRoute, Router} from "@angular/router";
import {ExpenseService} from '@/app/services/expense.service';

@Component({
  selector: 'app-expense-report',
  imports: [CommonModule, MissionSummaryComponent, ExpenseTableComponent, MatIcon, MatButton, MatIconButton],
  templateUrl: './expense-report.component.html',
  styleUrl: './expense-report.component.css'
})
export class ExpenseReportComponent implements OnInit {
  private expenseService = inject(ExpenseService);
  private route = inject(ActivatedRoute);
  mission = signal<Mission>({
    id: 0,
    startDate: new Date(),
    endDate: new Date(),
    startTown: '',
    endTown: '',
    status: Status.INITIALE,
    transportIds: [],
    expenseReport: {
      id: 0,
      amount: 0,
      status: Status.INITIALE,
      expenses: []
    }
  });

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadExpenseReport()
    //TODO: à supprimer après verif quand authent effective
    this.expenseService.getExpensesByExpenseReportId(123).subscribe(expenses => {
      console.log('Données récupérées par le service des dépenses :', expenses);
    });
  }

  //TODO: à refaire sans le mock quand Mission service sera près
  loadExpenseReport() {
    const expenseReportId = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(expenseReportId)) {
      this.expenseService.getExpensesByExpenseReportId(expenseReportId).subscribe({
        next: (expenses) => {
          const mockMission: Mission = {
            id: 0,
            startDate: new Date(),
            endDate: new Date(),
            startTown: 'Placeholder',
            endTown: 'Placeholder',
            status: Status.INITIALE,
            transportIds: [],
            expenseReport: {
              id: expenseReportId,
              amount: expenses.reduce((sum, e) => sum + e.amount, 0),
              status: Status.INITIALE,
              expenses: expenses
            }
          };
          this.mission.set(mockMission);
        },
        error: (error) => {
          console.error('Erreur lors de la récupération de la note de frais: ', error);
        }
      })
    }
  }

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
