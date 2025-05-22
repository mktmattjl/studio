
// src/components/icons/PixelCalendarIcon.tsx - DEPRECATED - Use fantasy/PixelMapIcon.tsx or similar
// This file can be deleted.
import type { SVGProps } from 'react';

export const PixelCalendarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    <path fill="#D3D3D3" d="M2 3h12v11H2z" /> {/* Light Grey Body */}
    <path fill="#A9A9A9" d="M2 5h12v2H2z" /> {/* Dark Grey Header Band */}
    <path fill="#FF0000" d="M4 2h2v2H4z M10 2h2v2h-2z" /> {/* Red Rings */}
    <path fill="#000000" d="M4 7h2v2H4z M7 7h2v2H7z M10 7h2v2h-2z M4 10h2v2H4z M7 10h2v2H7z" /> {/* Black Dots for days */}
  </svg>
);

    