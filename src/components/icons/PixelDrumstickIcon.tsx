// src/components/icons/PixelDrumstickIcon.tsx
import type { SVGProps } from 'react';

export const PixelDrumstickIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 10 10" // Standard 10x10 viewbox
    shapeRendering="crispEdges"
    {...props}
  >
    {/* Outline (Dark Brown #784A32) */}
    <path fill="#784A32" d="M3,0 h3 v1 h1 v1 h1 v1 h2 v1 h1 v1 h1 v1 h-1 v1 h-1 v1 h-2 v1 h-1 v1 h-1 v1 h-2 v-1 h-1 v-1 h-1 v-1 H1 v-1 H0 V2 h1 V1 h1 V0 h1z"/>
    {/* Meat (Medium Brown #A06B49) */}
    <path fill="#A06B49" d="M2,2 v4 h1 v1 h3 V6 h1 V2 H6 v1 H5 v1 H3 V3 H2zm4,1h1v3h-1z"/>
    {/* Bone (Light Tan/Off-white #F7E9DE) */}
    <path fill="#F7E9DE" d="M2,1 h2 v1 h-2z"/>
    {/* Shine/Highlight on meat (Lighter Brown #D3976A) */}
    <path fill="#D3976A" d="M3,5 h1 v1 h-1z"/>
  </svg>
);
