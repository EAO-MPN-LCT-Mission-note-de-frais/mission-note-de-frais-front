import {ExpenseReport} from './expense-report';
import {MissionStatus} from '@/app/interfaces/mission-status';
import {MissionType} from '@/app/interfaces/mission-type';

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
  status: MissionStatus;

  /**
   * The transports of the mission
   */
  transportIds: number[];

  /**
   * The expense report of the mission
   */
  expenseReport?: ExpenseReport;

  /**
   * The type of the mission
   */
  missionType: MissionType;
}

export interface MissionPost extends Omit<Mission, 'id'> {}
export type MissionSummary = Omit<Mission, "expenseReport"> & {  expenseReport: ExpenseReport}


