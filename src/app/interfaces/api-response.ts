export interface ApiResponse<T> {
  /**
   * The type of the response (e.g., "Success", "Error").
   * Indicates whether the response is a success or an error.
   */
  type: string;

  /**
   * A message describing the status or action performed.
   * Can be used to display user-friendly feedback or for logging purposes.
   */
  message: string;

  /**
   * The HTTP status code associated with the response (e.g., 200, 404, 500).
   * Helps handle different scenarios on the frontend.
   */
  status: number;

  /**
   * The timestamp of the response generated by the backend.
   * Useful for debugging or displaying a timestamp in the UI.
   */
  timestamp: string;

  /**
   * The useful data payload from the response.
   * Can be an object, an array, or `null` if no data is included (e.g., successful deletion).
   */
  data: T | null;
}

