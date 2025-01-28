import {Component, Inject} from '@angular/core';
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

@Component({
  selector: 'app-expense-create-modal',
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelect, MatOption],
  templateUrl: './expense-create-modal.component.html',
  styleUrl: './expense-create-modal.component.css'
})
export class ExpenseCreateModalComponent {

  expenseForm: FormGroup;
  //TODO implement missionStartDate et expenseTypeOption
  missionStartDate = new Date('2024-01-01');
  expenseTypeOptions = ['Transport', 'Hotel', 'Repas', 'Divers'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ExpenseCreateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Expense | null,
  ) {
    this.expenseForm = this.fb.group({
      date: [data?.date || '', [Validators.required, this.notBeforeMissionValidator(this.missionStartDate)]],
      expenseType: [data?.expenseType || '', [Validators.required]],
      description: [data?.description || ''],
      amount: [data?.amount || null, [Validators.required, this.strictlyPositiveValidator]],
      tax: [data?.tax ?? null, [Validators.min(0)]],
    });
  }

  notBeforeMissionValidator(missionStartDate: Date) {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate = new Date(control.value);
      if (control.value && selectedDate < missionStartDate) {
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
      this.dialogRef.close(this.expenseForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}
