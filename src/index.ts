import { AzlTextEditView } from './lib/AzlTextEditView.js';
import { SubmitEventType } from './lib/events.js';

// Declare the web component typescript declaration
declare global {
  interface HTMLElementTagNameMap {
    'azl-text-edit-view': AzlTextEditView;
  }
}

// Export the web component
export { AzlTextEditView, SubmitEventType };
