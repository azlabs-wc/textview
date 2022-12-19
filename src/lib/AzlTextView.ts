import '@azlabs-wc/layouts/azl-hbox.js';
import { TextInputEventType } from '@azlabs-wc/text-input';
import '@azlabs-wc/text-input/azl-text-input.js';
import { LitElement, html, nothing } from 'lit';
import { property } from 'lit/decorators/property.js';
import { state } from 'lit/decorators/state.js';
import { componentStyle } from './AzlTextView.style.js';
import { pencilLineIcon } from './Icon.js';

type TextInputType =
  | 'text'
  | 'email'
  | 'password'
  | 'search'
  | 'tel'
  | 'url'
  | 'number'
  | 'date';

export class AzlTextView extends LitElement {
  static override get styles() {
    return [componentStyle];
  }

  // #region Class properties
  /**
   * @attr input-label
   */
  @property({ type: String, attribute: 'input-label' })
  label!: string;

  /**
   * @attr input-type
   */
  @property({ type: String, attribute: 'input-type' })
  inputType: TextInputType | 'unknown' = 'text';

  /**
   * @attr value
   */
  @property({ type: String, attribute: 'value' })
  value!: string;

  /** Sets input name property of the input object. */
  /**
   * @attr name
   */
  @property({ type: String, attribute: 'name' })
  name!: string;

  /** Sets input placeholder property of the input object. */
  /**
   * @attr placeholder
   */
  @property({ type: String, attribute: 'placeholder' })
  placeholder: string = '...';

  /**
   * @attr pattern
   */
  @property({ type: String, attribute: 'pattern' })
  pattern!: string;

  @state()
  editing: boolean = false;
  // #endregion Class properties

  override connectedCallback(): void {
    this.addEventListener('keypress', this.onKeyPressEvent.bind(this));
  }

  override disconnectedCallback(): void {
    this.removeEventListener('keypress', this.onKeyPressEvent.bind(this));
  }

  private onKeyPressEvent(e: KeyboardEvent) {
    if ((e.key === 'Enter' || e.key === 'Cancel') && this.editing) {
      this.editing = false;
    }
    e.stopPropagation();
  }

  private toggleView() {
    this.editing = !this.editing;
  }

  private onTextViewDblClickEvent(e: Event) {
    this.editing = true;
    e.preventDefault();
    e.stopPropagation();
  }

  private textInputChange(e: TextInputEventType<string>) {
    this.value = e.data;
  }

  private static createTextView(text: string) {
    return text
      ? html`<azl-hbox align-items="flex-start" align-content="space-between"
          >${text} ${pencilLineIcon(36, 36)}</azl-hbox
        >`
      : html`<slot name="textview"></slot>`;
  }

  private static createInputView(
    type: TextInputType | 'unknown',
    textInputChange: (e: TextInputEventType<string>) => void,
    onTextViewDblClickEvent: (e: Event) => void,
    value: string,
    placeholder: string,
    name: string,
    pattern: string,
    label?: string
  ) {
    return type === 'unknown'
      ? html` <slot name="textinput"></slot> `
      : html` <azl-text-input
          @change=${textInputChange}
          @dblclick=${onTextViewDblClickEvent}
          value=${value}
          type=${type}
          placeholder=${placeholder}
          name=${name}
          pattern=${pattern}
        >
          ${label ? html`<label>${label} </label>` : nothing}
        </azl-text-input>`;
  }

  render() {
    return html`
      <div class="text-view">
        ${this.editing
          ? AzlTextView.createTextView(this.value)
          : AzlTextView.createInputView(
              this.inputType,
              this.textInputChange,
              this.onTextViewDblClickEvent,
              this.value,
              this.placeholder,
              this.name,
              this.pattern,
              this.label
            )}
      </div>
    `;
  }
}
