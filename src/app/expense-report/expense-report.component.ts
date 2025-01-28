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
import {MatDialog} from '@angular/material/dialog';
import {DeleteModalComponent} from '@/app/components/delete-modal/delete-modal.component';
import {ExpenseReportService} from '@/app/services/expense-report.service';
import { ErrorHandlerService } from '../utils/error-handler.service';
import {ExpenseCreateModalComponent} from '@/app/expense-report/expense-create-modal/expense-create-modal.component';
import { Expense } from '../interfaces/expense';

@Component({
  selector: 'app-expense-report',
  imports: [CommonModule, MissionSummaryComponent, ExpenseTableComponent, MatIcon, MatButton, MatIconButton],
  templateUrl: './expense-report.component.html',
  styleUrl: './expense-report.component.css'
})
export class ExpenseReportComponent implements OnInit {
  private expenseService = inject(ExpenseService);
  private expenseReportService = inject(ExpenseReportService)
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private errorHandlerService = inject(ErrorHandlerService);
  private dialog = inject(MatDialog);

  isDeleteDisabled: boolean = false;

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

  ngOnInit(): void {
    this.loadExpenseReport()
  }

  //TODO: à refaire sans le mock quand Mission service sera près
  loadExpenseReport() {
    const expenseReportId = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(expenseReportId)) {
      this.expenseService.getExpensesByExpenseReportId(expenseReportId).subscribe({
        next: (expenses) => {
          if (expenses) {
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
                status: Status.VALIDEE,
                expenses: expenses
              }
            };
            this.mission.set(mockMission);
            this.isDeleteDisabled = !this.validateDelete();
          } else {
            this.errorHandlerService.handleError("","Erreur lors de la récupération des dépenses.");
          }
        },
        error: (error) => {
          this.errorHandlerService.handleError(error, "Erreur lors de la récupération de la note de frais.");
        }
      })
    }
  }
  onRefreshExpenses() {
    this.loadExpenseReport();
  }

  returnHome() {
    this.router.navigate(['/missions']);
  }

  openCreateModal() {
    const dialogRef = this.dialog.open(ExpenseCreateModalComponent, {
      width: '600px',
      data: null,
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("Dépense ajoutée avec succès")
      }
    })
  }

  openEditModal(expense: Expense) {
    const dialogRef = this.dialog.open(ExpenseCreateModalComponent, {
      width: '600px',
      data: expense,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("Dépense modifiée avec succès");
        this.onRefreshExpenses();
      }
    });
  }

  export() {
    console.log('export');
  }

  //TODO - logique à développer :
  // Soumettre si INITIALE ou REJETEE
  // Annuler la soumission si EN ATTENTE VALIDATION
  // Pas de bouton si VALIDEE OU ANNULEE
  submit() {
    console.log('submit');
    this.isDeleteDisabled = !this.validateDelete();
  }

  validateDelete(): boolean {
    const expenseReportStatus = this.mission().expenseReport.status;
    return expenseReportStatus == Status.INITIALE || expenseReportStatus == Status.REJETEE;
  }

  delete() {
    if (this.validateDelete()) {
      const dialogRef = this.dialog.open(DeleteModalComponent, {
        width: '600px',
        data: {
          title: 'Confirmation de la suppression',
          description: 'Êtes-vous sûr de vouloir supprimer cette note de frais ?',
          actionButtonLabel: 'Supprimer',
          cancelButtonLabel: 'Annuler'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result?.confirmed) {
          const expenseReportId = this.mission().expenseReport.id;
          this.expenseReportService.deleteExpenseReport(expenseReportId).subscribe({
            next: (message) => {
              console.log(message);
              this.router.navigate(['/missions']);
            },
            error: (error) => {
              this.errorHandlerService.handleError(error, "Une erreur est survenue lors de la suppression.");
            }
          });
        }
      });
    }
  }

  protected readonly Status = Status;
}
