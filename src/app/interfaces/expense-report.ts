import {Expense} from './expense';
import {Status} from '@/app/interfaces/status';

export interface ExpenseReport {
  /**
   * The unique identifier for the expense report.
   */
  id: number;

  /**
   * The amount of the expenses made during the mission.
   */
  amount: number;

  /**
   * The status of the expense report.
   */
  status: Status;

  /**
   * The list of expenses associated with this expense report.
   */
  expenses: Expense[];
}

export interface ExpenseReportPost extends Omit<ExpenseReport, 'id'> {}
