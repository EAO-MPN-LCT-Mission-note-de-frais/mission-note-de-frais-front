import {Expense} from './expense';

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
  status: string;

  /**
   * The list of expenses associated with this expense report.
   */
  expenses: Expense[];

}

export interface ExpenseReportPost extends Omit<ExpenseReport, 'id'> {}
