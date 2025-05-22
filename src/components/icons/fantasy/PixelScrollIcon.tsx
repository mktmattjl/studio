
// src/components/icons/fantasy/PixelScrollIcon.tsx
import type { SVGProps } from 'react';

export const PixelScrollIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    <path fill="#F3EADA" d="M3 2h10v12H3z" /> {/* Parchment Paper */}
    <path fill="#D1BFA7" d="M2 3h1v10H2z M13 3h1v10h-1z M3 2h10v1H3z M3 13h10v1H3z" /> {/* Rolled Edges Shadow */}
    <path fill="#7A6C5F" d="M4 4h8v1H4z M4 6h8v1H4z M4 8h6v1H4z" /> {/* Faint Text Lines */}
    <path fill="#C93D3D" d="M2 1h1v2H2z M12 1h1v2h-1z M2 13h1v2H2z M12 13h1v2h-1z" /> {/* Ruby Red End Caps/Ribbon hints */}
  </svg>
);

    