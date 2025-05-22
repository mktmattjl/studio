
// src/components/icons/fantasy/PixelFantasySettingsIcon.tsx
// A runestone or ancient gear
import type { SVGProps } from 'react';

export const PixelFantasySettingsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    {/* Stone Gear Base */}
    <path fill="#7A6C5F" d="M6 2h4v1h1v1h1v2h-1v1h-1v2h1v1h1v2h-1v1h-1v1H6v-1H5v-1H4v-2h1v-1h1v-2H4V4h1V3h1V2z" />
    {/* Lighter Stone Highlights */}
    <path fill="#BEB5A9" d="M7 3h2v1H7z M6 4h1v1H6z M9 4h1v1H9z M5 6h1v1H5z M10 6h1v1h-1z M5 9h1v1H5z M10 9h1v1h-1z M6 11h1v1H6z M9 11h1v1H9z M7 12h2v1H7z" />
    {/* Central Gem - Ruby Red */}
    <path fill="#C93D3D" d="M7 7h2v2H7z" />
  </svg>
);

    