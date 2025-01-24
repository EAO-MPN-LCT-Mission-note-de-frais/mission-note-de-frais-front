export interface Expense {
  /**
   * Unique identifier for the expense.
   */
  id: string;

  /**
   * Date of the expense (in ISO format).
   */
  date: string;

  /**
   * Description of the expense. Optional field.
   */
  description?: string;

  /**
   * Type of the expense, e.g., "Transport", "Accommodation", "Dining", etc.
   */
  expenseType: string;

  /**
   * Expense amount (in EUR or default currency).
   */
  amount: number;

  /**
   * Tax percentage (e.g., VAT) applied to the expense.
   */
  tax: number;
}

export interface ExpensePost extends Omit<Expense, 'id'> {}
