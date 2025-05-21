
// src/components/icons/PixelMagnifyingGlassIcon.tsx
import type { SVGProps } from 'react';

export const PixelMagnifyingGlassIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    <path fill="#708090" d="M2 2h8v8H2z" /> {/* Slate Gray Lens Frame */}
    <path fill="#ADD8E6" d="M3 3h6v6H3z" /> {/* Light Blue Lens */}
    <path fill="#FFFFFF" d="M4 4h1v1H4z M7 4h1v1H7z" /> {/* Shine */}
    <path fill="#A9A9A9" d="M9 9h3v1H9z M10 10h3v1h-3z M11 11h3v1h-3z M12 12h2v2h-2z" /> {/* Handle */}
  </svg>
);
