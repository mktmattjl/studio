// src/components/icons/PixelSoupBowlIcon.tsx
import type { SVGProps } from 'react';

export const PixelSoupBowlIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 10 10" // Standard 10x10 viewbox
    shapeRendering="crispEdges"
    {...props}
  >
    {/* Bowl Outline (Dark Brown) */}
    <path fill="#7A5540" d="M1,4 h8 v1 H8 v1 H7 v1 H3 v-1 H2 v-1 H1z M2,5 h6 v1 H7 v1 H3 v-1 H2z"/>
    {/* Bowl Main (Lighter Brown) */}
    <path fill="#A07050" d="M2,4 h6 v1 H7 v1 H3 v-1 H2z"/>
    {/* Soup (Orange-Red) */}
    <path fill="#E07A5F" d="M2,3 h6 v1 H2z M3,2 h4 v1 H3z"/>
    {/* Steam (Light Gray/Off-white) */}
    <path fill="#F0F0F0" d="M3,0 h1 v1 h-1z M6,0 h1 v1 h-1z M4,1 h1 v1 h-1z M5,1 h1 v1 h-1z"/>
  </svg>
);
