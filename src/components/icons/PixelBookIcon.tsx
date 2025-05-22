
// src/components/icons/PixelBookIcon.tsx - DEPRECATED - Use fantasy/PixelScrollIcon.tsx or similar
// This file can be deleted.
import type { SVGProps } from 'react';

export const PixelBookIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    <path fill="#8B4513" d="M3 2h10v11H3z" /> {/* Book Cover Brown */}
    <path fill="#A0522D" d="M4 3h8v9H4z" /> {/* Lighter Cover Inset */}
    <path fill="#FFFFFF" d="M5 4h6v1H5z M5 6h6v1H5z M5 8h6v1H5z M5 10h4v1H5z" /> {/* Pages */}
    <path fill="#000000" d="M8 2v11h1V2z" /> {/* Spine */}
  </svg>
);

    