import {Component, inject, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {Expense} from '@/app/interfaces/expense';
import {MatOption, MatSelect} from '@angular/material/select';
import {ExpenseType} from '@/app/interfaces/expense-type';
import {ExpenseTypeService} from '@/app/services/expense-type.service';

@Component({
  selector: 'app-expense-create-modal',
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelect, MatOption],
  templateUrl: './expense-create-modal.component.html',
  styleUrl: './expense-create-modal.component.css'
})
export class ExpenseCreateModalComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ExpenseCreateModalComponent>);
  private expenseTypeService = inject(ExpenseTypeService);

  expenseForm: FormGroup;
  expenseTypeOptions: ExpenseType[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { missionStartDate: Date, expense: Expense | null }
  ) {
    this.expenseForm = this.fb.group({
      date: [data.expense?.date || '', [Validators.required, this.notBeforeMissionValidator(data.missionStartDate)]],
      expenseType: [data.expense?.expenseType || '', [Validators.required]],
      description: [data.expense?.description || ''],
      amount: [data.expense?.amount || null, [Validators.required, this.strictlyPositiveValidator]],
      tax: [data.expense?.tax ?? null, [Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.expenseTypeService.getAllExpenseTypes().subscribe({
      next: (types) => {
        this.expenseTypeOptions = types;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des natures de frais', error);
      }
    });
  }

  notBeforeMissionValidator(missionStartDate: Date) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      if (control.value < missionStartDate) {
        return { dateBeforeMissionStart: true };
      }
      return null;
    };
  }

  strictlyPositiveValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === null || value === undefined || value <= 0) {
      return { strictlyPositive: true };
    }
    return null;
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      if (this.expenseForm.get('tax')?.value === null || this.expenseForm.get('tax')?.value === '') {
        this.expenseForm.get('tax')?.setValue(0);
      }
      const updatedExpense = { ...this.data.expense, ...this.expenseForm.value };
      this.dialogRef.close(updatedExpense);
    }
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}
