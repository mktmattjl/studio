
// src/components/icons/fantasy/PixelQuillIcon.tsx
import type { SVGProps } from 'react';

export const PixelQuillIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    {/* Feather Part - Parchment Cream */}
    <path fill="#F3EADA" d="M3 3h2v1H3z M4 4h2v1H4z M5 5h2v1H5z M6 6h2v1H6z M7 7h2v1H7z M8 8h2v1H8z M9 9h2v1H9z M10 10h2v1h-2z M11 11h2v1h-2z" />
    {/* Quill Nib - Dark Brown */}
    <path fill="#4D423A" d="M12 12h1v2h-1z M11 13h1v1h-1z" />
    {/* Handle/Stem - Lighter Brown */}
    <path fill="#7A6C5F" d="M5 2h1v1H5z M6 3h1v1H6z M7 4h1v1H7z M8 5h1v1H8z M9 6h1v1H9z M10 7h1v1H_10z M11 8h1v1h-1z M12 9h1v1h-1z M13 10h1v1h-1z" />
  </svg>
);

    