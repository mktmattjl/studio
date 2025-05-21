
// src/components/icons/PixelSoupBowlIcon.tsx
import type { SVGProps } from 'react';

export const PixelSoupBowlIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16" // Changed to 16x16
    shapeRendering="crispEdges"
    {...props}
  >
    {/* Bowl Outline (Dark Brown) */}
    <path fill="#7A5540" d="M2 8h12v2H2z M3 10h10v1H3z M4 11h8v1H4z M5 12h6v1H5z" />
    {/* Bowl Main (Lighter Brown) */}
    <path fill="#A07050" d="M3 8h10v2H3z" />
    {/* Soup (Orange-Red) */}
    <path fill="#E07A5F" d="M4 6h8v2H4z M5 5h6v1H5z" />
    {/* Steam (Light Gray/Off-white) */}
    <path fill="#F0F0F0" d="M6 2h1v2H6z M9 2h1v2H9z M7 3h1v2H7z M8 4h1v1H8z" />
  </svg>
);
