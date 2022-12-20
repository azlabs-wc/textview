import '@azlabs-wc/layouts/azl-hbox.js';
import { TextInputEvent, TextInputEventType } from '@azlabs-wc/text-input';
import '@azlabs-wc/text-input/azl-text-input.js';
import { LitElement, html, nothing, PropertyValueMap } from 'lit';
import { property } from 'lit/decorators/property.js';
import { state } from 'lit/decorators/state.js';
import { queryAssignedElements } from 'lit/decorators/query-assigned-elements.js';
import { componentStyle } from './AzlTextEditView.style.js';
import { pencilLineIcon } from './Icon.js';
import { SubmitEvent } from './events.js';

type TextInputType =
  | 'text'
  | 'email'
  | 'password'
  | 'search'
  | 'tel'
  | 'url'
  | 'number'
  | 'date';

export class AzlTextEditView extends LitElement {
  static override get styles() {
    return [componentStyle];
  }

  // #region Class properties
  @queryAssignedElements({ slot: 'textview' })
  assignedNodes!: HTMLElement[];

  /**
   * @attr icon-size
   */
  @property({ type: Number, attribute: 'icon-size' })
  iconSize: number = 28;

  /**
   * Set the custom state of the text edit view component
   * When the property is set on the text-edit-view component,
   * the developper is expected to pass a custom input compnent
   * as child of the current instance
   *
   * ```html
   * <azl-text-edit-view custom>
   *  <input slot="textinput" name="..." value="..." />
   * </azl-text-edit-view>
   * ```
   *
   *
   * @attr custom
   */
  @property({ type: Boolean, attribute: 'custom' })
  custom: boolean = false;

  /**
   * @attr input-label
   */
  @property({ type: String, attribute: 'input-label' })
  label!: string;

  /**
   * @attr input-type
   */
  @property({ type: String, attribute: 'input-type' })
  inputType: TextInputType = 'text';

  /**
   * @attr value
   */
  @property({ type: String, attribute: 'value' })
  value!: string;

  /** Sets input name property of the input object. */
  /**
   * Set the name property for the internal text-input component
   *
   * ```html
   * <azl-text-edit-view input-name="my-input" >
   * </azl-text-edit-view>
   *
   * @attr input-name
   */
  @property({ type: String, attribute: 'input-name' })
  name!: string;

  /**
   * Sets input placeholder property for the internal text-input component
   *
   * ```html
   * <azl-text-edit-view input-name="my-input" placeholder="Enter...">
   * </azl-text-edit-view>
   * ```
   *
   * @attr placeholder
   */
  @property({ type: String, attribute: 'placeholder' })
  placeholder: string = '...';

  /**
   * Sets value validation pattern property for the internal text-input component
   *
   * ```html
   * <azl-text-edit-view input-name="my-input" placeholder="Enter..." pattern="[\d]">
   * </azl-text-edit-view>
   * ```
   *
   * @attr pattern
   */
  @property({ type: String, attribute: 'pattern' })
  pattern!: string;

  @state()
  editing: boolean = false;
  // #endregion Class properties

  override connectedCallback(): void {
    this.addEventListener('keypress', this.onSubmitEvent.bind(this));
    super.connectedCallback();
  }

  override disconnectedCallback(): void {
    this.removeEventListener('keypress', this.onSubmitEvent.bind(this));
    // Remove any dblclick event on slotted elements
    this.assignedNodes?.forEach(element => {
      element.removeEventListener('dblclick', this.onEditTextEvent.bind(this));
    });
    super.disconnectedCallback();
  }

  protected override firstUpdated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    this.assignedNodes?.forEach(element => {
      element.addEventListener('dblclick', this.onEditTextEvent.bind(this));
    });
    super.firstUpdated(_changedProperties);
  }

  render() {
    return html`
      <div class="text-view">
        ${!this.editing
          ? AzlTextEditView.createTextView(
              this.value,
              this.iconSize,
              this.onEditTextEvent
            )
          : AzlTextEditView.createInputView(
              this.inputType,
              this.onTextInputChangeEvent,
              this.custom,
              this.value,
              this.placeholder,
              this.name,
              this.pattern,
              this.label
            )}
      </div>
    `;
  }

  private onSubmitEvent(e: KeyboardEvent) {
    if ((e.code === 'Enter' || e.key === 'Escape') && this.editing) {
      this.editing = false;
      // We only fires the submit event only when user clicks on the `Enter` key as we treat
      // `Escape` key press as cancel action
      if (e.code === 'Enter') {
        this.dispatchEvent(
          new SubmitEvent('submit', {
            detail: this.value,
            bubbles: true,
            composed: true,
            cancelable: true,
          })
        );
      }
    }
    e.stopPropagation();
  }

  private onEditTextEvent(e: Event) {
    this.editing = true;
    e.preventDefault();
    e.stopPropagation();
  }

  private onTextInputChangeEvent(e: TextInputEventType<string>) {
    this.value = e.data;
    this.dispatchEvent(new TextInputEvent(e.type as any, e.data));
    e?.stopPropagation();
  }

  private static createTextView(
    text: string,
    iconSize: number,
    onEditText: (e: Event) => void
  ) {
    return text
      ? html`<azl-hbox
          align-items="flex-start"
          align-content="space-between"
          @dblclick=${onEditText}
        >
          <span class="text-edit-view-text">${text}</span>
          <a href="#" @click=${onEditText}
            >${pencilLineIcon(iconSize ?? 24, iconSize ?? 24)}</a
          ></azl-hbox
        >`
      : html`<slot name="textview"></slot>`;
  }

  private static createInputView(
    type: TextInputType,
    textInputChange: (e: TextInputEventType<string>) => void,
    custom: boolean,
    value: string,
    placeholder: string,
    name: string,
    pattern: string,
    label?: string
  ) {
    return custom
      ? html` <slot name="textinput"></slot> `
      : html` <azl-text-input
          @change=${textInputChange}
          value=${value}
          type=${type}
          placeholder=${placeholder}
          name=${name}
          pattern=${pattern}
          ?basic=${typeof label === 'undefined' ||
          label === null ||
          label !== ''}
        >
          ${label ? html`<label>${label} </label>` : nothing}
        </azl-text-input>`;
  }
}
