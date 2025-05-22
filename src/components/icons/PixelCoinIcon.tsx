
// src/components/icons/PixelCoinIcon.tsx - DEPRECATED, use fantasy/PixelGoldCoinIcon.tsx
// This file can be deleted.
import type { SVGProps } from 'react';

export const PixelCoinIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16" 
    shapeRendering="crispEdges"
    {...props}
  >
    <path fill="#DAA520" d="M4,2 h8 v1 h1 v1 h1 v8 h-1 v1 h-1 v1 H4 v-1 H3 v-1 H2 V4 h1 V3 h1 V2 z" />
    <path fill="#FFD700" d="M5,3 h6 v1 H5z M4,4 h8 v8 H4z M5,12 h6 v1 H5z" />
    <path fill="#FFFFE0" d="M6,5 h1 v1 H6z M9,5 h1 v1 H9z M5,7 h1 v1 H5z M10,7 h1 v1 h-1z M7,9 h2 v1 H7z" />
    <path fill="#B8860B" d="M7,7 h2 v2 H7z" /> 
  </svg>
);

    