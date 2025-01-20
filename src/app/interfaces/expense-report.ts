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
}
