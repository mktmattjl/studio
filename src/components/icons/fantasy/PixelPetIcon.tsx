
// src/components/icons/fantasy/PixelPetIcon.tsx (Generic Fantasy Pet Icon)
import type { SVGProps } from 'react';

export const PixelPetIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    {/* Example: Small Dragon-like or Griffon-like head */}
    {/* Head Color - Could be Emerald Green or Sapphire Blue */}
    <path fill="#3BA668" d="M5 4h6v1H5z M4 5h8v5H4z M5 10h6v1H5z" /> {/* Main head shape */}
    {/* Eyes - Gold Accent */}
    <path fill="#E0AA66" d="M6 6h1v2H6z M9 6h1v2H9z" />
    {/* Horns/Ears - Muted Brown */}
    <path fill="#7A6C5F" d="M5 3h1v1H5z M10 3h1v1H10z" />
    {/* Snout Detail - Darker shade of head color */}
    <path fill="#2E9A57" d="M7 8h2v1H7z" />
  </svg>
);

    