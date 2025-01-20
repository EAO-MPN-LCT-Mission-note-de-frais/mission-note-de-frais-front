import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Expense} from '../../interfaces/expense';

@Component({
  selector: 'app-expense-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-table.component.html',
  styleUrl: './expense-table.component.css'
})
export class ExpenseTableComponent {
  @Input() expenses: Expense[] = [];
}
