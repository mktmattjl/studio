
// src/components/icons/PixelBrainIcon.tsx - DEPRECATED - Use more thematic icon if needed
// This file can be deleted if not used.
import type { SVGProps } from 'react';

export const PixelBrainIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    <path fill="#FFC0CB" d="M4 3h8v2H4z M3 5h10v2H3z M2 7h12v3H2z M3 10h10v2H3z M5 12h6v1H5z" /> {/* Pink main brain */}
    <path fill="#FFB6C1" d="M5 4h6v1H5z M4 6h8v1H4z M3 8h10v1H3z M4 11h8v1H4z" /> {/* Lighter pink folds */}
    <path fill="#000000" d="M8 7h1v3H8z" /> {/* Center Line */}
  </svg>
);

    