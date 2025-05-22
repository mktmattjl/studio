
// src/components/icons/fantasy/PixelGoldCoinIcon.tsx
import type { SVGProps } from 'react';

export const PixelGoldCoinIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
    // currentColor will be overridden by explicit fills
  >
    <path fill="#A87C3D" d="M4 2h8v1h1v1h1v8h-1v1h-1v1H4v-1H3v-1H2V4h1V3h1V2z" /> {/* Bronze/Dark Gold Outline */}
    <path fill="#E0AA66" d="M5 3h6v10H5z M4 4h1v8H4z M11 4h1v8h-1z" /> {/* Gold Main Body */}
    <path fill="#F3EADA" d="M6 5h1v1H6z M9 5h1v1H9z M7 7h1v1H7z" /> {/* Light Shine/Parchment highlight */}
    {/* Optional simple emblem (e.g., a gem or symbol) */}
    <path fill="#7A6C5F" d="M7 8h2v1H7z" />
  </svg>
);

    