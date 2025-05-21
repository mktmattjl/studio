// src/components/icons/PixelPupIcon.tsx
import type { SVGProps } from 'react';

export const PixelPupIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12" // Slightly larger for a bit more detail
    shapeRendering="crispEdges"
    {...props}
  >
    {/* Outline (Dark Brown) */}
    <path fill="#784A32" d="M2,2 h1 v-1 h6 v1 h1 v1 h1 v5 h-1 v1 h-1 v1 H3 v-1 H2 v-1 H1 V3 h1z"/>
    {/* Main Fur (Medium Brown) */}
    <path fill="#A06B49" d="M3,2 h6 v1 h1 v5 h-1 v1 H3 V3 H2 V2z M9,8 H3V7h6z"/>
    {/* Lighter Fur (Snout/Ears inner) */}
    <path fill="#D3976A" d="M4,6 h4 v1 H4z M3,3 h1 v1 H3z M8,3 h1 v1 H8z"/>
    {/* Eyes (Black) */}
    <path fill="#000000" d="M4,4 h1 v1 H4z M7,4 h1 v1 H7z"/>
    {/* Nose (Darker Brown or Black) */}
    <path fill="#4A2F1F" d="M5,5 h2 v1 H5z"/>
     {/* Optional: Tongue (Pink) - if visible and desired */}
    {/* <path fill="#F08080" d="M5,7 h2 v1 H5z"/> */}
  </svg>
);
