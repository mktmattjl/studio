
// src/components/icons/fantasy/PixelFlamingSwordIcon.tsx
import type { SVGProps } from 'react';

export const PixelFlamingSwordIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    {/* Blade - Steel Gray */}
    <path fill="#BEB5A9" d="M7 1h2v7H7z" />
    <path fill="#F3EADA" d="M8 1h1v6H8z" /> {/* Highlight on blade */}
    {/* Crossguard - Bronze/Gold */}
    <path fill="#A87C3D" d="M5 7h6v1H5z" />
    <path fill="#E0AA66" d="M4 8h8v1H4z" />
    {/* Handle - Dark Brown */}
    <path fill="#4D423A" d="M7 9h2v3H7z" />
    {/* Pommel - Ruby Red */}
    <path fill="#C93D3D" d="M7 12h2v1H7z M6 13h4v1H6z" />
    {/* Flames - Ruby Red and Orange */}
    <path fill="#C93D3D" d="M6 0h1v2H6z M9 0h1v2H9z M5 1h1v2H5z M10 1h1v2h-1z M7 6h2v1H7z" />
    <path fill="#E0AA66" d="M7 0h2v1H7z M6 2h1v1H6z M9 2h1v1H9z" />
  </svg>
);

    