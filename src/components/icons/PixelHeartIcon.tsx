
// src/components/icons/PixelHeartIcon.tsx
import type { SVGProps } from 'react';

export const PixelHeartIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16" // Changed to 16x16
    shapeRendering="crispEdges"
    {...props}
  >
    <path fill="#FF0000" d="M8 4 C6 2, 3 3, 3 6 C3 9, 8 13, 8 13 C8 13, 13 9, 13 6 C13 3, 10 2, 8 4 Z" />
    {/* Simplified path for pixel heart */}
    <path fill="#FF0000" d="M4 4h2v1H4z M10 4h2v1h-2z M3 5h2v1H3z M11 5h2v1h-2z M2 6h2v1H2z M12 6h2v1h-2z M2 7h3v1H2z M11 7h3v1h-3z M3 8h3v1H3z M10 8h3v1h-3z M4 9h3v1H4z M9 9h3v1H9z M5 10h2v1H5z M9 10h2v1H9z M6 11h1v1H6z M9 11h1v1H9z M7 12h2v1H7z" />
    <path fill="#FF6A6A" d="M8 5h1v1H8z M7 6h1v1H7z M8 6h1v1H8z" /> {/* Highlight */}
  </svg>
);
