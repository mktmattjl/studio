
// src/components/icons/fantasy/PixelOrnateShieldIcon.tsx
import type { SVGProps } from 'react';

export const PixelOrnateShieldIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    {/* Main Shield Body - Dark Wood Brown */}
    <path fill="#4D423A" d="M3 2h10v10L8 15l-5-3V2z" />
    {/* Metal Border - Gold/Bronze */}
    <path fill="#A87C3D" d="M2 3h1v9L8 14l5-2V3h1V2H2v1zm1-1h10v1H3V2zm0 11l5 2 5-2V3H3v10z" />
    <path fill="#E0AA66" d="M4 3h8v8l-4 2-4-2V3z" />
    {/* Emblem - Sapphire Blue */}
    <path fill="#527ED9" d="M6 6h4v2H6z M7 5h2v1H7z M7 8h2v1H7z" />
  </svg>
);

    