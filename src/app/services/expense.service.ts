import { Injectable } from '@angular/core';
import {environment} from '@/environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Expense} from '@/app/interfaces/expense';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private apiUrl = environment.apiURL + '/expenses';
  constructor(private http: HttpClient) {}

  /**
   * Retrieves an expense by its ID.
   * @param id The ID of the expense.
   * @returns An Observable of the Expense object.
   */
  getExpenseById(id: number): Observable<Expense> {
    return this.http.get<Expense>(`${this.apiUrl}/${id}`);
  }

  /**
   * Retrieves all expenses for a given expense report ID.
   * @param expenseReportId The ID of the expense report.
   * @returns An Observable of an array of Expense objects.
   */
  getExpensesByExpenseReportId(expenseReportId: number): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/expense-report/${expenseReportId}`);
  }

  /**
   * Creates a new expense.
   * @param expense The expense data to create.
   * @param expenseReportId The ID of the expense report associated with the expense.
   * @returns An Observable of the backend's ResponseEntity. The response body contains a success/failure message.
   */
  createExpense(expense: Expense, expenseReportId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}?expenseReportId=${expenseReportId}`, expense);
  }

  /**
   * Updates an existing expense.
   * @param expense The expense data to update.
   * @returns An Observable of the backend's ResponseEntity. The response body contains a success/failure message.
   */
  updateExpense(expense: Expense): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${expense.id}`, expense);
  }

  /**
   * Deletes an expense by its ID.
   * @param id The ID of the expense to delete.
   * @returns An Observable of the backend's ResponseEntity. The response body contains a success/failure message.
   */
  deleteExpense(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
