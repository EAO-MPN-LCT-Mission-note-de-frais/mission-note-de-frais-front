import {Component, effect, input,ViewChild} from '@angular/core';
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

@Component({
  selector: 'app-expense-table',
  imports: [CommonModule, MatDialogModule, MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './expense-table.component.html',
  styleUrl: './expense-table.component.css'
})
export class ExpenseTableComponent {

  expenses = input<Expense[]>([]);
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

  constructor(public dialog: MatDialog) {
    effect(() => {
      this.displayedColumns = [...this.columnDefinitions.map(column => column.property), 'actions'];
      this.dataSource.data = this.expenses();
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  delete() {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '600px',
      data: {
        title: 'Confirmation de la suppression',
        description: 'Êtes-vous sûr de vouloir supprimer cette dépense ?',
        actionButtonLabel: 'Supprimer',
        cancelButtonLabel: 'Annuler'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('delete expense');
      }
    });
  }
}
