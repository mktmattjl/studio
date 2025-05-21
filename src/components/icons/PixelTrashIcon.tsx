
// src/components/icons/PixelTrashIcon.tsx
import type { SVGProps } from 'react';

export const PixelTrashIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    <path fill="#808080" d="M4 4h8v10H4z" /> {/* Gray Bin */}
    <path fill="#A9A9A9" d="M3 3h10v1H3z" /> {/* Gray Lid */}
    <path fill="#696969" d="M6 2h4v1H6z" /> {/* Dark Gray Handle */}
    <path fill="#FFFFFF" d="M6 6h1v6H6z M9 6h1v6H9z" /> {/* White lines */}
  </svg>
);
