
// src/components/icons/fantasy/PixelLightningIcon.tsx
// (Represents XP or Energy) - Using Gold/Yellow
import type { SVGProps } from 'react';

export const PixelLightningIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    <path fill="#E0AA66" d="M7 0L5 5h3L6 9l5-5H8L7 0z M9 10l-2 6 2-3h2l-2-3z" /> {/* Main Gold Bolt */}
    <path fill="#F3EADA" d="M8 1L7 3h2L8 1z M7 6l1-2h-1L7 6z M10 6l-1 2h1L10 6z M8 11l1 2h-1L8 11z" /> {/* Parchment Highlights */}
  </svg>
);

    