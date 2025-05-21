
// src/components/icons/PixelShopBagIcon.tsx
import type { SVGProps } from 'react';

export const PixelShopBagIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    <path fill="#D2B48C" d="M3 5h10v9H3z" /> {/* Tan Bag Body */}
    <path fill="#A0522D" d="M2 4h12v1H2z" /> {/* Brown Top Rim */}
    <path fill="#8B4513" d="M5 2h2v2H5z M9 2h2v2H9z" /> {/* Dark Brown Handles */}
    {/* Optional simple shop symbol */}
    <path fill="#FFFFFF" d="M7 8h2v2H7z" /> 
  </svg>
);
