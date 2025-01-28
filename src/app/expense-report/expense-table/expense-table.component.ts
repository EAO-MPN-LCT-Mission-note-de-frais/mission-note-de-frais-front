import {Component, effect, EventEmitter, inject, input, Output, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Expense} from '../../interfaces/expense';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {ColumnDefinition} from '../../interfaces/column-definition';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {DeleteModalComponent} from '@/app/components/delete-modal/delete-modal.component';
import {Status} from '@/app/interfaces/status';
import {ExpenseService} from '@/app/services/expense.service';
import {ErrorHandlerService} from '@/app/utils/error-handler.service';

@Component({
  selector: 'app-expense-table',
  imports: [CommonModule, MatDialogModule, MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './expense-table.component.html',
  styleUrl: './expense-table.component.css'
})
export class ExpenseTableComponent {
  private expenseService = inject(ExpenseService);
  private dialog = inject(MatDialog);
  private errorHandlerService = inject(ErrorHandlerService);

  expenses = input<Expense[]>([]);
  expenseReportStatus = input<Status>(Status.INITIALE);
  @Output() refreshExpenses = new EventEmitter<void>()
  @Output() editExpense = new EventEmitter<Expense>();

  displayedColumns: string[] = [];

  columnDefinitions: ColumnDefinition[] = [
    { property: 'date', label: 'Date', sortable: true, formatter: (value: string) => new Date(value).toLocaleDateString()},
    { property: 'expenseType', label: 'Nature de frais', sortable: true },
    { property: 'description', label: 'Description', sortable: false },
    { property: 'amount', label: 'Montant TTC (en €)', sortable: false, formatter: (value: number) => `${value.toFixed(2)} €` },
    { property: 'tax', label: '% de TVA', sortable: false, formatter: (value: number) => `${value} %`  },
  ];

  dataSource = new MatTableDataSource<Expense>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    effect(() => {
      this.displayedColumns = [...this.columnDefinitions.map(column => column.property)];
      if (this.expenseReportStatus() === Status.INITIALE || this.expenseReportStatus() === Status.REJETEE) {
        this.displayedColumns.push('actions');
      }
      this.dataSource.data = this.expenses();
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  edit(expense: Expense) {
    this.editExpense.emit(expense);
  }

  validateDelete(): boolean {
    return this.expenseReportStatus() === Status.INITIALE || this.expenseReportStatus() === Status.REJETEE;
  }

  delete(expense: Expense) {
    if (this.validateDelete()) {
      const dialogRef = this.dialog.open(DeleteModalComponent, {
        width: '600px',
        data: {
          title: 'Confirmation de la suppression',
          description: 'Êtes-vous sûr de vouloir supprimer cette dépense ?',
          actionButtonLabel: 'Supprimer',
          cancelButtonLabel: 'Annuler',
          expenseId: expense.id
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result?.confirmed && result?.expenseId) {
          this.expenseService.deleteExpense(result.expenseId).subscribe({
            next: (message) => {
              console.log(message);
              this.refreshExpenses.emit()
            },
            error: (error) => {
              this.errorHandlerService.handleError(error, "Une erreur est survenue lors de la suppression.");
            }
          })
        }
      });
    }
  }

  protected readonly Status = Status;
}
