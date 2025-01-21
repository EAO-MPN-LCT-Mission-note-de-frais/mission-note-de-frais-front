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

@Component({
  selector: 'app-expense-table',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './expense-table.component.html',
  styleUrl: './expense-table.component.css'
})
export class ExpenseTableComponent {

  expenses = input<Expense[]>([]);
  displayedColumns: string[] = [];

  columnDefinitions: ColumnDefinition[] = [
    { property: 'date', label: 'Date', sortable: true, formatter: (value: string) => new Date(value).toLocaleDateString()},
    { property: 'type', label: 'Nature de frais', sortable: true },
    { property: 'description', label: 'Description', sortable: false },
    { property: 'amount', label: 'Montant TTC (en €)', sortable: false, formatter: (value: number) => `${value.toFixed(2)} €` },
    { property: 'tax', label: '% de TVA', sortable: false, formatter: (value: number) => `${value} %`  },
  ];

  dataSource = new MatTableDataSource<Expense>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    effect(() => {
      this.displayedColumns = [...this.columnDefinitions.map(column => column.property), 'actions'];
      this.dataSource.data = this.expenses();
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
