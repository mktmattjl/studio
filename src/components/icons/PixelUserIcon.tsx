
// src/components/icons/PixelUserIcon.tsx
import type { SVGProps } from 'react';

export const PixelUserIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    {/* Head */}
    <path fill="#87CEEB" d="M6 3h4v4H6z" /> {/* Sky Blue Head */}
    {/* Body */}
    <path fill="#4682B4" d="M4 7h8v6H4z" /> {/* Steel Blue Body */}
     {/* Shoulders */}
    <path fill="#5F9EA0" d="M3 7h1v2H3z M12 7h1v2h-1z" /> {/* Cadet Blue Shoulders */}
  </svg>
);
