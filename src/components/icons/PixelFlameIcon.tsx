
// src/components/icons/PixelFlameIcon.tsx - DEPRECATED, use PixelFlamingSwordIcon.tsx
// This file can be deleted.
import type { SVGProps } from 'react';

export const PixelFlameIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    {/* Outer Layer (OrangeRed #FF4500) */}
    <path fill="#FF4500" d="M8 1h1v1H8z M7 2h3v1H7z M6 3h5v2H6z M5 5h7v3H5z M6 8h5v2H6z M7 10h3v2H7z M8 12h1v2H8z"/>
    {/* Middle Layer (Orange #FFA500) */}
    <path fill="#FFA500" d="M8 3h1v1H8z M7 4h3v2H7z M6 6h5v2H6z M7 8h3v2H7z M8 10h1v2H8z"/>
    {/* Inner Core (Yellow #FFFF00) */}
    <path fill="#FFFF00" d="M8 5h1v1H8z M7 6h3v2H7z M8 8h1v2H8z"/>
  </svg>
);

    