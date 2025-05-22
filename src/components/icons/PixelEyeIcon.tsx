
// src/components/icons/PixelEyeIcon.tsx - DEPRECATED
// This file can be deleted if not used.
import type { SVGProps } from 'react';

export const PixelEyeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    <path fill="#FFFFFF" d="M2 6h12v4H2z" /> {/* White Sclera */}
    <path fill="#000000" d="M3 5h10v1H3z M3 10h10v1H3z M1 6h1v4H1z M14 6h1v4h-1z" /> {/* Black Outline */}
    <path fill="#0000FF" d="M6 7h4v2H6z" /> {/* Blue Iris */}
    <path fill="#000000" d="M7 8h2v1H7z" /> {/* Black Pupil */}
    <path fill="#FFFFFF" d="M8 7h1v1H8z" /> {/* White Shine */}
  </svg>
);

    