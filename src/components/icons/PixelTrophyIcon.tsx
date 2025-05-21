
// src/components/icons/PixelTrophyIcon.tsx
import type { SVGProps } from 'react';

export const PixelTrophyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    <path fill="#FFD700" d="M4 2h8v1H4z M5 3h6v5H5z M6 8h4v2H6z" /> {/* Gold Cup */}
    <path fill="#DAA520" d="M3 3h1v1H3z M12 3h1v1h-1z M4 8h1v2H4z M11 8h1v2H9z" /> {/* Darker Gold Handles Outline */}
    <path fill="#B8860B" d="M6 10h4v2H6z M7 12h2v2H7z" /> {/* Dark Gold Base */}
    <path fill="#FFFFE0" d="M7 4h2v1H7z M6 5h1v1H6z M9 5h1v1H9z" /> {/* Shine */}
  </svg>
);
