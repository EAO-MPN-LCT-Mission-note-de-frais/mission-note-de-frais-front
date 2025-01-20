export enum Status {
  /**
   * The demand is in the initial state.
   */
  INITIALE = 'INITIALE',

  /**
   * The demand is waiting for validation
   */
  EN_ATTENTE_VALIDATION = 'EN_ATTENTE_VALIDATION',

  /**
   * The demand is validated
   */
  VALIDEE = 'VALIDEE',

  /**
   * The demand is rejected
   */
  REJETEE = 'REJETEE',

  /**
   * The demand is cancelled
   */
  ANNULEE = 'ANNULEE',
}
