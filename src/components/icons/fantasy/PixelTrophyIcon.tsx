
// src/components/icons/fantasy/PixelTrophyIcon.tsx
// (Used for Challenges page)
import type { SVGProps } from 'react';

export const PixelTrophyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    {/* Cup - Gold */}
    <path fill="#E0AA66" d="M4 2h8v1H4z M5 3h6v5H5z M6 8h4v2H6z" />
    {/* Handles - Darker Gold/Bronze */}
    <path fill="#A87C3D" d="M3 4h1v3H3z M12 4h1v3h-1z M4 7h1v1H4z M11 7h1v1h-1z" />
    {/* Base - Dark Wood Brown */}
    <path fill="#4D423A" d="M6 10h4v2H6z M5 12h6v1H5z M4 13h8v1H4z" />
    {/* Gem - Ruby Red */}
    <path fill="#C93D3D" d="M7 5h2v1H7z" />
  </svg>
);

    