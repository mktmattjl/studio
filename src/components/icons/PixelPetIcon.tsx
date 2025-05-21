
// src/components/icons/PixelPetIcon.tsx (Generic Pet Icon)
import type { SVGProps } from 'react';

export const PixelPetIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    {/* Simple Cat-like or Dog-like face */}
    <path fill="#D2B48C" d="M4 4h8v7H4z" /> {/* Tan Face */}
    <path fill="#000000" d="M5 6h2v2H5z M9 6h2v2H9z" /> {/* Black Eyes */}
    <path fill="#FFB6C1" d="M7 9h2v1H7z" /> {/* Pink Nose */}
    <path fill="#A0522D" d="M4 3h2v1H4z M10 3h2v1H10z" /> {/* Brown Ears */}
  </svg>
);
