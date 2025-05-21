
// src/components/icons/PixelSparkleIcon.tsx
import type { SVGProps } from 'react';

export const PixelSparkleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    <path fill="#FFD700" d="M8 0L9 3L12 4L9 5L8 8L7 5L4 4L7 3z" /> {/* Main Star - Gold */}
    <path fill="#FFFF00" d="M8 1L9 3L11 4L9 5L8 7L7 5L5 4L7 3z" /> {/* Inner Star - Yellow */}
    <path fill="#FFD700" d="M1 7h2v2H1z M13 7h2v2h-2z M7 1h2v2H7z M7 13h2v2H7z" /> {/* Small sparkles */}
  </svg>
);
