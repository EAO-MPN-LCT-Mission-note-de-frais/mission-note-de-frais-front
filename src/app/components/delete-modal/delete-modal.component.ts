import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

class CustomModalComponent {
}

@Component({
  selector: 'app-delete-modal',
  imports: [CommonModule, MatDialogModule, MatButton],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css'
})
export class DeleteModalComponent {

  constructor(
    public dialogRef: MatDialogRef<CustomModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string,
      description: string,
      actionButtonLabel: string,
      cancelButtonLabel: string,
      expenseId?: number }
  ) {}

  onConfirmClick(): void {
    this.dialogRef.close({ confirmed: true, expenseId: this.data.expenseId});
  }
}
