import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MissionType } from '@/app/interfaces/mission-type';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-mission-type-modal',
  templateUrl: './mission-type-modal.component.html',
  styleUrls: ['./mission-type-modal.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
  ],
})
export class MissionTypeModalComponent {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<MissionTypeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MissionType | null,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      label: [data?.label || '', [Validators.required]],
      isCharged: [data?.isCharged || false],
      isBonus: [data?.isBonus || false],
      averageDailyRate: [
        data?.averageDailyRate || null,
        [
          Validators.min(0),
          this.conditionalValidator(() => this.form?.get('isCharged')?.value, Validators.required),
        ],
      ],
      bonusPercentage: [
        data?.bonusPercentage || null,
        [
          Validators.min(0),
          this.conditionalValidator(() => this.form?.get('isBonus')?.value, Validators.required),
        ],
      ],
    });
    this.form.get('isCharged')?.valueChanges.subscribe(() => this.updateValidation());
    this.form.get('isBonus')?.valueChanges.subscribe(() => this.updateValidation());
  }

  updateValidation(): void {
    const isCharged = this.form.get('isCharged')?.value;
    const isBonus = this.form.get('isBonus')?.value;
  
    if (isCharged) {
      this.form.get('averageDailyRate')?.setValidators([Validators.required, Validators.min(0)]);
    } else {
      this.form.get('averageDailyRate')?.setValue(null);
      this.form.get('averageDailyRate')?.clearValidators();
    }
    this.form.get('averageDailyRate')?.updateValueAndValidity();
  
    if (isBonus) {
      this.form.get('bonusPercentage')?.setValidators([Validators.required, Validators.min(0)]);
    } else {
      this.form.get('bonusPercentage')?.setValue(null);
      this.form.get('bonusPercentage')?.clearValidators();
    }
    this.form.get('bonusPercentage')?.updateValueAndValidity();
  }

  conditionalValidator(conditionFn: () => boolean, validator: any) {
    return (control: any) => {
      if (!control || !conditionFn()) {
        return null;
      }
      return validator(control);
    };
  }

  save(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
