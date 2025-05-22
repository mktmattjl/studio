
// src/components/icons/PixelMagnifyingGlassIcon.tsx
// Re-theme for fantasy
import type { SVGProps } from 'react';

export const PixelMagnifyingGlassIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    {/* Lens Frame - Dark wood/metal */}
    <path fill="#4D423A" d="M2 2h8v8H2z" />
    {/* Lens - Light blue/amethyst to simulate glass */}
    <path fill="#A480CC" d="M3 3h6v6H3z" />
    {/* Shine/Highlight - Parchment */}
    <path fill="#F3EADA" d="M4 4h1v1H4z M6 4h1v1H6z" />
    {/* Handle - Dark wood */}
    <path fill="#7A6C5F" d="M9 9h3v1H9z M10 10h3v1h-3z M11 11h3v1h-3z M12 12h2v2h-2z" />
  </svg>
);


    