
// src/components/icons/fantasy/PixelTrashIcon.tsx
// Simple wooden crate or broken pot for "delete"
import type { SVGProps } from 'react';

export const PixelTrashIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    {/* Wooden Crate Body */}
    <path fill="#7A6C5F" d="M4 4h8v9H4z" /> {/* Dark Wood */}
    <path fill="#4D423A" d="M3 3h10v1H3z M5 5h6v1H5z M5 7h6v1H5z M5 9h6v1H5z M5 11h6v1H5z" /> {/* Darker lines/planks */}
    {/* Lid / Top */}
    <path fill="#BEB5A9" d="M5 2h6v2H5z" /> {/* Lighter wood for lid */}
    {/* Crack for "broken" feel */}
    <path fill="#20242B" d="M7 6h1v3H7z M9 8h1v3H9z" />
  </svg>
);

    