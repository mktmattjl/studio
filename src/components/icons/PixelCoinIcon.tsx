// src/components/icons/PixelCoinIcon.tsx
import type { SVGProps } from 'react';

export const PixelCoinIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 10 10" // Native size of the pixel art
    shapeRendering="crispEdges" // Ensures pixelated rendering
    // width and height will be controlled by className
    {...props} // Spread other props like className
  >
    {/* Outline (Darker Gold/Brownish) */}
    <path fill="#a16800" d="M3,0 h4 v1 h1 v1 h1 v4 h-1 v1 h-1 v1 H3 v-1 H2 v-1 H1 V2 h1 V1 h1z"/>
    {/* Main Fill (Brighter Gold) */}
    <path fill="#ffc600" d="M3,1 h4 v1 h1 v1 h1 v2 h-1 v1 h-1 v1 H3 v-1 H2 v-1 H1 V3 h1 V2 h1z"/>
    {/* Shine (Light Yellow) */}
    <path fill="#ffff8e" d="M3,2 h1 v1 h1 v1 H4 V3 H3z M6,5 H5 V4 H6V5z"/>
  </svg>
);
