/**
 * @internal
 * Safe function to add/define a custom element in the web api
 */
export function registerElement(name: string, elementClass: any) {
  if (
    typeof window !== 'undefined' &&
    window !== null &&
    typeof window.customElements !== 'undefined' &&
    window.customElements !== null
  ) {
    const customElement = window.customElements.get(name);
    if (typeof customElement === 'undefined' || customElement === null) {
      window.customElements.define(name, elementClass);
    }
  }
}
