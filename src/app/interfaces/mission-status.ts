import {Status} from './status';

export interface MissionStatus {
  /**
   * The unique identifier for the mission.
   */
  id: number;

  /**
   * The name of the status.
   */
  name: Status;
}
