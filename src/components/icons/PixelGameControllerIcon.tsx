
// src/components/icons/PixelGameControllerIcon.tsx
import type { SVGProps } from 'react';

export const PixelGameControllerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    <path fill="#505050" d="M2 6h12v5H2z" /> {/* Main body dark gray */}
    <path fill="#707070" d="M3 5h1V4h1V3h4v1h1v1h1v1H3z M1 7h1v3H1z M14 7h1v3h-1z" /> {/* Lighter gray accents & handles */}
    {/* D-pad */}
    <path fill="#303030" d="M4 7h1v1H4z M5 6h1v1H5z M5 8h1v1H5z M6 7h1v1H6z" />
    {/* Buttons */}
    <path fill="#E04040" d="M11 6h1v1h-1z M13 7h1v1h-1z" /> {/* Red buttons */}
    <path fill="#40E040" d="M10 8h1v1h-1z M12 9h1v1h-1z" /> {/* Green buttons */}
  </svg>
);
