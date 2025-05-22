
// src/components/icons/fantasy/PixelSoupBowlIcon.tsx
// (Represents food/satiation)
import type { SVGProps } from 'react';

export const PixelSoupBowlIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    {/* Bowl - Muted Brown */}
    <path fill="#7A6C5F" d="M2 8h12v2H2z M3 10h10v1H3z M4 11h8v1H4z M5 12h6v1H5z" />
    {/* Bowl Inner/Highlight - Lighter Muted Brown */}
    <path fill="#BEB5A9" d="M3 8h10v1H3z" />
    {/* Soup - Could be a stew color (e.g., dark orange/brown) */}
    <path fill="#A0522D" d="M4 6h8v2H4z M5 5h6v1H5z" /> 
    {/* Steam - Light Parchment */}
    <path fill="#F3EADA" d="M6 2h1v2H6z M9 2h1v2H9z M7 3h1v2H7z M8 4h1v1H8z" />
  </svg>
);

    