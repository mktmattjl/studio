
// src/components/icons/PixelBellIcon.tsx
import type { SVGProps } from 'react';

export const PixelBellIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    <path fill="#FFD700" d="M4 4h8v7H4z" /> {/* Gold Bell Body */}
    <path fill="#DAA520" d="M3 3h10v1H3z M5 11h6v1H5z" /> {/* Darker Gold Accents */}
    <path fill="#A0522D" d="M7 2h2v2H7z" /> {/* Brown Handle */}
    <path fill="#000000" d="M7 12h2v2H7z" /> {/* Black Clapper */}
  </svg>
);
