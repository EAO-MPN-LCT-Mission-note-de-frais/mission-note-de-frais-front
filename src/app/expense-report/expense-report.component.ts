import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MissionSummaryComponent} from './mission-summary/mission-summary.component';
import {ExpenseTableComponent} from './expense-table/expense-table.component';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {ActivatedRoute, Router} from "@angular/router";
import {ExpenseService} from '@/app/services/expense.service';
import {MatDialog} from '@angular/material/dialog';
import {DeleteModalComponent} from '@/app/components/delete-modal/delete-modal.component';
import {ExpenseReportService} from '@/app/services/expense-report.service';
import {ErrorHandlerService} from '../utils/error-handler.service';
import {ExpenseCreateModalComponent} from '@/app/expense-report/expense-create-modal/expense-create-modal.component';
import {Expense} from '../interfaces/expense';
import {MissionSummary} from '@/app/interfaces/mission';
import {MissionService} from '@/app/services/mission.service';
import {Status} from '@/app/interfaces/status';

@Component({
  selector: 'app-expense-report',
  imports: [CommonModule, MissionSummaryComponent, ExpenseTableComponent, MatIcon, MatButton, MatIconButton],
  templateUrl: './expense-report.component.html',
  styleUrl: './expense-report.component.scss'
})
export class ExpenseReportComponent implements OnInit {
  private expenseService = inject(ExpenseService);
  private expenseReportService = inject(ExpenseReportService)
  private missionService = inject(MissionService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private errorHandlerService = inject(ErrorHandlerService);
  private dialog = inject(MatDialog);

  isDeleteDisabled: boolean = false;

  mission = signal<MissionSummary>({
    id: 0,
    startDate: new Date(),
    endDate: new Date(),
    startTown: '',
    endTown: '',
    status: {
      id: 0,
      name: Status.INITIALE
    },
    transportIds: [],
    expenseReport: {
      id: 0,
      amount: 0,
      status: {
        id: 0,
        name: Status.INITIALE
      },
      expenses: []
    },
    missionType: {
      id: 0,
      label: '',
      isCharged: false,
      isBonus: false,
      averageDailyRate: 0,
      bonusPercentage: 0,
      startDate: '',
      endDate: ''
    }
  });

  ngOnInit(): void {
    this.loadExpenseReport()
  }

  loadExpenseReport() {
    const missionId = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(missionId)) {
      this.missionService.getMissionSummaryById(missionId).subscribe({
        next: (mission) => {
          if (mission && mission.expenseReport) {
            this.mission.set(mission);
            console.log(JSON.stringify(mission));
            this.loadExpense()
            this.isDeleteDisabled = !this.validateDelete();
          } else {
            this.errorHandlerService.handleError("","Erreur lors de la récupération de la mission.");
            this.router.navigate(['/missions']);
          }
        },
        error: (error) => {
          this.errorHandlerService.handleError(error, "Erreur lors de la récupération de la mission.");
          this.router.navigate(['/missions']);
        }
      })
    }
  }

  loadExpense() {
    const expenseReportId = this.mission().expenseReport.id;
    if (expenseReportId) {
      this.expenseService.getExpensesByExpenseReportId(expenseReportId).subscribe({
        next: (expenses) => {
          if (expenses) {
            this.mission.update((mission) => ({
              ...mission,
              expenseReport: {
                ...mission.expenseReport,
                expenses: expenses
              }
            }));
          }
        },
        error: (error) => {
          this.errorHandlerService.handleError(error, "Erreur lors de la récupération des dépenses.");
        }
      });
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
        result.expenseReportId = this.mission().expenseReport.id;
        this.expenseService.createExpense(result, this.mission().expenseReport.id).subscribe({
          next: (message) => {
            console.log(message);
            this.onRefreshExpenses();
          },
          error: (error) => {
            this.errorHandlerService.handleError(error, "Une erreur est survenue lors de l'ajout de la dépense'.");
          }
        });
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
        result.id = expense.id;
        result.expenseReportId = this.mission().expenseReport.id;
        this.expenseService.updateExpense(result).subscribe({
          next: (message) => {
            console.log(message);
            this.onRefreshExpenses();
          },
          error: (error) => {
            this.errorHandlerService.handleError(error, "Une erreur est survenue lors de la modification de la dépense'.");
          }
        });
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
    const expenseReportStatus = this.mission().expenseReport.status.name;
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
          this.expenseReportService.deleteExpenseReport(this.mission().expenseReport.id).subscribe({
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
