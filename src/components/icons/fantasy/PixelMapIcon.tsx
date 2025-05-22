
// src/components/icons/fantasy/PixelMapIcon.tsx
import type { SVGProps } from 'react';

export const PixelMapIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    <path fill="#F3EADA" d="M2 2h12v12H2z" /> {/* Parchment Background */}
    <path fill="#D1BFA7" d="M1 3h1v10H1z M14 3h1v10h-1z M2 2h12v1H2z M2 13h12v1H2z" /> {/* Rolled Edges */}
    {/* Land features - simple shapes */}
    <path fill="#3BA668" d="M4 5h3v2H4z M8 7h4v3H8z" /> {/* Emerald Green Land */}
    <path fill="#527ED9" d="M5 9h2v2H5z M10 4h2v2h-2z" /> {/* Sapphire Blue Water */}
    <path fill="#C93D3D" d="M7 6h1v1H7z" /> {/* Ruby Red 'X marks the spot' */}
  </svg>
);

    