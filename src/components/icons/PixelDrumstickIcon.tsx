// src/components/icons/PixelDrumstickIcon.tsx
import type { SVGProps } from 'react';

export const PixelDrumstickIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 10 10"
    shapeRendering="crispEdges"
    {...props}
  >
    {/* Outline (Dark Brown) */}
    <path fill="#784A32" d="M2,0 h1 v1 h1 v1 h2 v-1 h1 v-1 h1 v1 h1 v2 h-1 v1 h-1 v1 h-1 v1 h1 v1 h1 v1 h-1 v1 h-1 v1 h-2 v-1 H3 v-1 H2 v-1 H1 V6 h1 V5 h1 V4 h-1 V3 H2 V1 H1 V0z"/>
    {/* Meat (Medium Brown) */}
    <path fill="#A06B49" d="M3,1 h1 v1 h2 v1 h1 v1 h1 v1 h-1 v1 h-1 v1 h1 v1 H5 V7 H4 V6 H3 V5 H2 V2 H3z"/>
    {/* Bone (Light Tan/Off-white) */}
    <path fill="#F7E9DE" d="M7,0 h1 v1 H7z M2,7 h1 v1 H2z M3,8 h1 v1 H3z"/>
    {/* Shine/Highlight on meat (Lighter Brown) */}
    <path fill="#D3976A" d="M4,2 h1 v1 H4z M6,3 h1 v1 H6z M7,4 h1 v1 H7z"/>
  </svg>
);
