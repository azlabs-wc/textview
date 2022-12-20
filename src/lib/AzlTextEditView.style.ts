import { css } from 'lit';

export const componentStyle = css`
  .text-edit-view-text {
    font-size: var(--azl-text-edit-view-text-font-size, 0.8rem);
    margin-right: var(--azl-text-edit-view-text-margin-right, 0.5rem);
    line-height: var(--azl-text-edit-view-text-line-height, 1.2rem);
    display: inline-block;
    cursor: pointer;
  }
  .icon,
  ::slotted(svg) {
    cursor: pointer;
    position: relative;
    top: -0.05rem;
  }
  svg > path {
    margin: 0 0.5rem;
    color: var(--text-view-icon-color, #666666);
    fill: var(--text-view-icon-color, #666666);
  }
`;
