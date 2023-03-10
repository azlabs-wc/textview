import { html } from 'lit';

export function pencilLineIcon(width: number = 32, height: number = 32) {
  return html`<svg
    version="1.1"
    width=${width}
    height=${height}
    class="icon"
    viewBox="0 0 36 36"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <title>pencil-line</title>
    <path
      class="icon-outline icon-outline-path-1"
      d="M33.87,8.32,28,2.42a2.07,2.07,0,0,0-2.92,0L4.27,23.2l-1.9,8.2a2.06,2.06,0,0,0,2,2.5,2.14,2.14,0,0,0,.43,0L13.09,32,33.87,11.24A2.07,2.07,0,0,0,33.87,8.32ZM12.09,30.2,4.32,31.83l1.77-7.62L21.66,8.7l6,6ZM29,13.25l-6-6,3.48-3.46,5.9,6Z"
    ></path>
    <rect x="0" y="0" width=${width} height=${height} fill-opacity="0" />
  </svg>`;
}
