export interface ColumnDefinition {
  /**
   * The name of the object property to display in this column.
   * Must match a key in the object interface.
   */
  property: string;

  /**
   * The label for the column to display in the table header.
   */
  label: string;

  /**
   * Whether the column is sortable.
   */
  sortable: boolean;

  /**
   * Optional function to format the value displayed in the cell.
   * Receives the raw property value and should return a string.
   */
  formatter?: (value: any) => string;
}
