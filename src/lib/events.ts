export interface SubmitEventType<T> extends CustomEvent<T> {
  /**
   * Event data getter declaration. It returns the data send though the custom event
   */
  data: T;
}

/**
 * Custom Event dispatched whenever the text-edit-view component
 * update close the edit view
 */
export class SubmitEvent<T> extends CustomEvent<T> {
  /**
   * Event data getter declaration. It returns the data send though the custom event
   */
  get data() {
    return this.detail;
  }
}
