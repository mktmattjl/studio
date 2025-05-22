
// src/components/icons/fantasy/PixelChestIcon.tsx
import type { SVGProps } from 'react';

export const PixelChestIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    {/* Main Chest Body - Dark Wood Brown */}
    <path fill="#4D423A" d="M2 6h12v7H2z" />
    {/* Lid Top - Slightly Lighter Wood Brown */}
    <path fill="#7A6C5F" d="M2 4h12v2H2z M3 3h10v1H3z" />
    {/* Metal Bindings/Lock - Gold/Bronze */}
    <path fill="#A87C3D" d="M1 5h1v7H1z M14 5h1v7h-1z M7 5h2v1H7z M7 10h2v1H7z" />
    <path fill="#E0AA66" d="M7 8h2v2H7z" /> {/* Lock Plate */}
  </svg>
);

    