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
import {AuthService} from '@/app/services/auth.service';
import {MissionStatus} from '@/app/interfaces/mission-status';
import {StatusMappingService} from '@/app/utils/status-mapping.service';

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
  private authService = inject(AuthService);
  private errorHandlerService = inject(ErrorHandlerService);
  private statusMappingService = inject(StatusMappingService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  expenseReportId: number = 0;
  expenseReportStatus: MissionStatus = {
    id: 0,
    name: Status.INITIALE
  }
  isManager: boolean = false;
  isEnAttente: boolean = false;
  isInitialOrRejected: boolean = true;


  mission = signal<MissionSummary>({
    id: 0,
    startDate: new Date(),
    endDate: new Date(),
    startTown: '',
    endTown: '',
    status: this.expenseReportStatus,
    transportIds: [],
    expenseReport: {
      id: 0,
      amount: 0,
      status: this.expenseReportStatus,
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
    this.checkUserRole();
    this.loadExpenseReport()
  }

  checkUserRole(): void {
    const userRoles = this.authService.getUserRole();
    this.isManager = userRoles ? userRoles.includes('MANAGER') : false;
  }

  loadExpenseReport() {
    const missionId = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(missionId)) {
      this.missionService.getMissionSummaryById(missionId).subscribe({
        next: (mission) => {
          if (mission && mission.expenseReport) {
            this.mission.set(mission);
            this.expenseReportId = this.mission().expenseReport.id;
            this.expenseReportStatus = this.mission().expenseReport.status;
            this.isEnAttente = this.expenseReportStatus.name === Status.EN_ATTENTE_VALIDATION;
            this.isInitialOrRejected = this.expenseReportStatus.name === Status.INITIALE || this.expenseReportStatus.name === Status.REJETEE;
            this.loadExpense()
          } else {
            this.errorHandlerService.handleError("","Erreur lors de la récupération de la mission.");
            this.returnHome()
          }
        },
        error: (error) => {
          this.errorHandlerService.handleError(error, "Erreur lors de la récupération de la mission.");
          this.returnHome()
        }
      })
    }
  }

  loadExpense() {
    if (this.expenseReportId) {
      this.expenseService.getExpensesByExpenseReportId(this.expenseReportId).subscribe({
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
        this.expenseService.createExpense(result, this.expenseReportId).subscribe({
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
        result.expenseReportId = this.expenseReportId
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
    const startDate = this.mission().startDate;
    const endDate = this.mission().endDate
    const startTown = this.mission().startTown;
    const endTown = this.mission().endTown;
    if (this.expenseReportId) {
      this.expenseReportService.exportExpenseReportToPdf(this.expenseReportId).subscribe({
        next: (pdfBlob) => {
          const url = window.URL.createObjectURL(pdfBlob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `Note de frais - ${startTown} (${startDate}) - ${endTown} (${endDate}).pdf`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        },
        error: (error) => {
          this.errorHandlerService.handleError(error, "Une erreur est survenue lors de l'exportation du PDF.");
        }
      });
    }
  }

  submit() {
    if (this.isInitialOrRejected) {
      const statusId = this.statusMappingService.getStatusIdByName(Status.EN_ATTENTE_VALIDATION);
      this.mission.update((mission) => ({
        ...mission,
        expenseReport: {
          ...mission.expenseReport,
          status: {
            ...mission.expenseReport.status,
            id: statusId,
            name: Status.EN_ATTENTE_VALIDATION
          }
        }
      }));
      this.expenseReportService.updateExpenseReport(this.mission().expenseReport).subscribe({
        next: (message) => {
          console.log(message);
          this.loadExpenseReport();
        },
        error: (error) => {
          this.errorHandlerService.handleError(error, "Une erreur est survenue lors de la soumission de la note de frais.");
          this.loadExpenseReport();
        }
      });
    } else {
      console.log('Le statut de la note de frais ne permet pas la soumission.');
    }
  }

  cancelSubmission() {
    if (this.isEnAttente) {
      const statusId = this.statusMappingService.getStatusIdByName(Status.INITIALE);
      this.mission.update((mission) => ({
        ...mission,
        expenseReport: {
          ...mission.expenseReport,
          status: {
            ...mission.expenseReport.status,
            id: statusId,
            name: Status.INITIALE
          }
        }
      }));
      this.expenseReportService.updateExpenseReport(this.mission().expenseReport).subscribe({
        next: (message) => {
          console.log(message);
          this.loadExpenseReport();
        },
        error: (error) => {
          this.errorHandlerService.handleError(error, "Une erreur est survenue lors de l'annulation de la soumission de la note de frais.");
          this.loadExpenseReport();
        }
      });
    } else {
      console.log('Le statut de la note de frais ne permet pas l\'annulation de la soumission.');
    }
  }

  validateSubmission() {
    if (this.isManager && this.isEnAttente) {
      const statusId = this.statusMappingService.getStatusIdByName(Status.VALIDEE);
      this.mission.update((mission) => ({
        ...mission,
        expenseReport: {
          ...mission.expenseReport,
          status: {
            ...mission.expenseReport.status,
            id: statusId,
            name: Status.VALIDEE
          }
        }
      }));
      this.expenseReportService.updateExpenseReport(this.mission().expenseReport).subscribe({
        next: (message) => {
          console.log(message);
          this.loadExpenseReport();
        },
        error: (error) => {
          this.errorHandlerService.handleError(error, "Une erreur est survenue lors de la validation de la note de frais.");
          this.loadExpenseReport();
        }
      });
    } else {
      if (!this.isManager) {
        console.log('Vous devez être manager peut valider une note de frais.');
      }
      console.log('Le statut de la note de frais ne permet pas la validation');
    }
  }

  rejectSubmission() {
    if (this.isManager && this.isEnAttente) {
      const statusId = this.statusMappingService.getStatusIdByName(Status.REJETEE);
      this.mission.update((mission) => ({
        ...mission,
        expenseReport: {
          ...mission.expenseReport,
          status: {
            ...mission.expenseReport.status,
            id: statusId,
            name: Status.REJETEE
          }
        }
      }));
      this.expenseReportService.updateExpenseReport(this.mission().expenseReport).subscribe({
        next: (message) => {
          console.log(message);
          this.loadExpenseReport();
        },
        error: (error) => {
          this.errorHandlerService.handleError(error, "Une erreur est survenue lors du rejet de la note de frais.");
          this.loadExpenseReport();
        }
      });
    } else {
      if (!this.isManager) {
        console.log('Vous devez être manager pour rejeter une note de frais.');
      }
      console.log('Le statut de la note de frais ne permet pas le rejet.');
    }
  }

  delete() {
    if (this.isInitialOrRejected) {
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
          this.expenseReportService.deleteExpenseReport(this.expenseReportId).subscribe({
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
