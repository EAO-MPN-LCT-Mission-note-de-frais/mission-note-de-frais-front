import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExpenseType } from '@/app/interfaces/expense-type';
import { environment } from '@/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseTypeService {
  private apiUrl = environment.apiURL + '/expense-types';

  constructor(private http: HttpClient) {}

  /**
   * Retrieves all expense types
   * @returns An Observable containing an array of ExpenseType objects
  */
   getAllExpenseTypes(): Observable<ExpenseType[]> {
    return this.http.get<ExpenseType[]>(this.apiUrl);
  }
}
