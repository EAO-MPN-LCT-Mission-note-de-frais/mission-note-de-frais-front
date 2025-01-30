import { Component, OnInit } from '@angular/core';
import { ExpenseTypeService } from '@/app/services/expense-type.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ExpenseType {
  id: number;
  name: string;
}

@Component({
  selector: 'app-expense-type-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expense-type-management.component.html',
  styleUrls: ['./expense-type-management.component.css']
})
export class ExpenseTypeManagementComponent implements OnInit {
  expenseTypes: ExpenseType[] = [];
  newExpenseType = '';

  constructor(private expenseTypeService: ExpenseTypeService) { }

  ngOnInit(): void {
    this.loadExpenseTypes();
  }

  loadExpenseTypes(): void {
    this.expenseTypeService.getAllExpenseTypes().subscribe(data => this.expenseTypes = data);
  }

  addExpenseType(): void {
    if (!this.newExpenseType.trim()) return;
    this.expenseTypeService.createExpenseType(this.newExpenseType).subscribe(() => {
      this.loadExpenseTypes();
      this.newExpenseType = '';
    });
  }
}
