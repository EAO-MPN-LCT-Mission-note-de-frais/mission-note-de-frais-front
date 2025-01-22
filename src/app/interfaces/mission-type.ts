export interface MissionType {
  /**
   * The unique identifier for the mission type.
   */
  id: number;

  /**
   * The name of the mission type.
   */
  label: string;

  /**
   * Indicates whether the mission type is chargeable.
   */
  isCharged: boolean;

  /**
   * Indicates whether the mission type includes a bonus.
   */
  isBonus: boolean;

  /**
   * The average daily rate for this mission type, if applicable.
   * This is an optional field.
   */
  averageDailyRate?: number;

  /**
   * The bonus percentage for this mission type, if applicable.
   * This is an optional field.
   */
  bonusPercentage?: number;

  /**
   * The start date for the validity of the mission type (ISO format: 'YYYY-MM-DD').
   */
  startDate: string;

  /**
   * The end date for the validity of the mission type, if applicable (ISO format: 'YYYY-MM-DD').
   * This is an optional field.
   */
  endDate?: string;

  /**
   * The list of mission IDs associated with this mission type, if applicable.
   * This is an optional field.
   */
  missionIds?: number[];
}