
// src/components/icons/PixelLightningIcon.tsx
import type { SVGProps } from 'react';

export const PixelLightningIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
    fill="#FFFF00" // Yellow
  >
    <path d="M7 0L5 5h3L6 9l5-5H8L7 0z M9 10l-2 6 2-3h2l-2-3z" />
  </svg>
);
