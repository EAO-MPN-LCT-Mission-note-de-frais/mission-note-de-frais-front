import { ExpenseReport } from './expense-report';
import { Status } from './status';

export interface Mission {
  /**
   * The unique identifier for the mission.
   */
  id: number;

  /**
   * The date the mission started.
   */
  startDate: Date;

  /**
   * The date the mission ended.
   */
  endDate: Date;

  /**
   * The town where the mission started.
   */
  startTown: string;

  /**
   * The town where the mission ended.
   */
  endTown: string;

  /**
   * The current status of the mission.
   */
  status: Status;

  /**
   * The transports of the mission
   */
  transportIds: number[];

  /**
   * The expense report of the mission
   */
  expenseReport: ExpenseReport;
}

export interface MissionPost extends Omit<Mission, 'id'> {}
