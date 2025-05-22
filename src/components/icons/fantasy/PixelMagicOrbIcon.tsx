
// src/components/icons/fantasy/PixelMagicOrbIcon.tsx
import type { SVGProps } from 'react';

export const PixelMagicOrbIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    {/* Orb Body - Amethyst Purple */}
    <path fill="#A480CC" d="M4 4h8v8H4z" />
    <path fill="#B299D9" d="M5 3h6v1H5z M3 5h1v6H3z M12 5h1v6h-1z M5 12h6v1H5z" /> {/* Lighter purple outline */}
    {/* Shine/Highlight - Parchment Cream */}
    <path fill="#F3EADA" d="M6 5h2v1H6z M5 6h1v2H5z" />
    {/* Inner Swirl/Darker Core */}
    <path fill="#7A60B3" d="M7 7h2v2H7z" />
  </svg>
);

    