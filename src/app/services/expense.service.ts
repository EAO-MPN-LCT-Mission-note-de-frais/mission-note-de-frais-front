import { Injectable } from '@angular/core';
import {environment} from '@/environments/environment.development';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Expense, ExpensePost} from '@/app/interfaces/expense';
import {Observable, map} from 'rxjs';
import {ApiResponse} from '@/app/interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private apiUrl = environment.apiURL + '/expenses';
  constructor(private http: HttpClient) {}

  /**
   * Retrieves an expense by its ID.
   * @param id The ID of the expense.
   * @returns An Observable containing either the Expense object or null if not found.
   */
  getExpenseById(id: number): Observable<Expense | null> {
    return this.http.get<ApiResponse<Expense>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  /**
   * Retrieves all expenses for a given expense report ID.
   * @param expenseReportId The ID of the expense report.
   * @returns An Observable containing either an array of Expense objects or null if not found.s.
   */
  getExpensesByExpenseReportId(expenseReportId: number): Observable<Expense[] | null> {
    return this.http.get<ApiResponse<Expense[]>>(`${this.apiUrl}/expense-report/${expenseReportId}`).pipe(
      map(response => response.data)
    );
  }

  /**
   * Creates a new expense.
   * @param expense The expense data to create.
   * @param expenseReportId The ID of the expense report associated with the expense.
   * @returns An Observable containing the success/failure message from the backend.
   */
  createExpense(expense: ExpensePost, expenseReportId: number): Observable<string> {
    const params = new HttpParams().set('expenseReportId', expenseReportId.toString());
    return this.http.post<ApiResponse<string>>(this.apiUrl, expense, { params }).pipe(
      map(response => response.message)
    );
  }

  /**
   * Updates an existing expense.
   * @param expense The expense data to update.
   * @returns An Observable containing the success/failure message from the backend.
   */
  updateExpense(expense: Expense): Observable<string> {
    return this.http.put<ApiResponse<string>>(`${this.apiUrl}/${expense.id}`, expense).pipe(
      map(response => response.message)
    );
  }

  /**
   * Deletes an expense by its ID.
   * @param id The ID of the expense to delete.
   * @returns An Observable containing the success/failure message from the backend.
   */
  deleteExpense(id: number): Observable<string> {
    return this.http.delete<ApiResponse<string>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.message)
    );
  }
}
