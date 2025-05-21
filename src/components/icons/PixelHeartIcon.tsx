// src/components/icons/PixelHeartIcon.tsx
import type { SVGProps } from 'react';

export const PixelHeartIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 9 8" // Classic small pixel heart
    shapeRendering="crispEdges"
    {...props}
  >
    {/* Main Heart Color (Red) */}
    <path fill="#E53E3E" d="M0,2 h1 v-1 h1 v-1 h1 v1 h1 v1 h1 v-1 h1 v-1 h1 v1 h1 v1 h1 v1 h1 v1 H8 v1 H7 v1 H6 v1 H5 v1 H4 v-1 H3 v-1 H2 v-1 H1 v-1 H0z"/>
    {/* Optional: Shine/Highlight (Lighter Red/Pink) */}
    <path fill="#FC8181" d="M1,2 h1 v1 h1 v-1 H2 V1 H1z M6,1 h1 v1 h1 V1h-1V0h-1z"/>
  </svg>
);
