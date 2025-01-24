import { Injectable } from '@angular/core';
import {environment} from '@/environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {ExpenseReport} from '@/app/interfaces/expense-report';
import {ApiResponse} from '@/app/interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class ExpenseReportService {

  private apiUrl = environment.apiURL + '/expense-reports';
  constructor(private http: HttpClient) {}

  /**
   * Retrieves an expense report by its ID.
   * @param id The ID of the expense report.
   * @returns An Observable containing either the ExpenseReport object or null if not found.
   */
  getExpenseReport(id: number): Observable<ExpenseReport | null> {
    return this.http.get<ApiResponse<ExpenseReport>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  /**
   * Creates a new expense report.
   * @param expenseReport The expense report data to create.
   * @param missionId The ID of the mission associated with the expense report.
   * @returns An Observable containing the success/failure message from the backend.
   */
  createExpenseReport(expenseReport: ExpenseReport, missionId: number): Observable<string> {
    return this.http.post<ApiResponse<string>>(`${this.apiUrl}?missionId=${missionId}`, expenseReport).pipe(
      map(response => response.message)
    );
  }

  /**
   * Updates an existing expense report.
   * @param expenseReport The expense report data to update.
   * @returns An Observable containing the success/failure message from the backend.
   */
  updateExpenseReport(expenseReport: ExpenseReport): Observable<string> {
    return this.http.put<ApiResponse<string>>(`${this.apiUrl}/${expenseReport.id}`, expenseReport).pipe(
      map(response => response.message)
    );
  }

  /**
   * Deletes an expense report by its ID.
   * @param id The ID of the expense report to delete.
   * @returns An Observable containing the success/failure message from the backend.
   */
  deleteExpenseReport(id: number): Observable<string> {
    return this.http.delete<ApiResponse<string>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.message)
    );
  }

  /**
   * Exports an expense report to PDF.
   * @param id The ID of the expense report to export.
   * @returns An Observable of the PDF Blob.
   */
  exportExpenseReportToPdf(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/export-pdf`, { responseType: 'blob' });
  }

}
