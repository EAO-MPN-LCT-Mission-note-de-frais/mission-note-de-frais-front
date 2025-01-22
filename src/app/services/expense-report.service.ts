import { Injectable } from '@angular/core';
import {environment} from '@/environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ExpenseReport} from '@/app/interfaces/expense-report';

@Injectable({
  providedIn: 'root'
})
export class ExpenseReportService {

  private apiUrl = environment.apiURL + '/expense-reports';
  constructor(private http: HttpClient) {}

  /**
   * Retrieves an expense report by its ID.
   * @param id The ID of the expense report.
   * @returns An Observable of the Mission object.
   */
  getExpenseReport(id: number): Observable<ExpenseReport> {
    return this.http.get<ExpenseReport>(`${this.apiUrl}/${id}`);
  }

  /**
   * Creates a new expense report.
   * @param expenseReport The expense report data to create.
   * @param missionId The ID of the mission associated with the expense report.
   * @returns An Observable of the backend's ResponseEntity. The response body contains a success/failure message.
   */
  createExpenseReport(expenseReport: ExpenseReport, missionId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}?missionId=${missionId}`, expenseReport);
  }

  /**
   * Updates an existing expense report.
   * @param expenseReport The expense report data to update.
   * @returns An Observable of the backend's ResponseEntity. The response body contains a success/failure message.
   */
  updateExpenseReport(expenseReport: ExpenseReport): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${expenseReport.id}`, expenseReport);
  }

  /**
   * Deletes an expense report by its ID.
   * @param id The ID of the expense report to delete.
   * @returns An Observable of the backend's ResponseEntity. The response body contains a success/failure message.
   */
  deleteExpenseReport(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
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
