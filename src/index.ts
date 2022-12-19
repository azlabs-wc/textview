import { AzlTextView } from './lib/AzlTextView.js';

// Declare the web component typescript declaration
declare global {
    interface HTMLElementTagNameMap {
        'azl-text-view': AzlTextView
    }
}

// Export the web component
export { AzlTextView };
