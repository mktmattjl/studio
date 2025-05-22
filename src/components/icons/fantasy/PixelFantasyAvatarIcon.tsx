
// src/components/icons/fantasy/PixelFantasyAvatarIcon.tsx
// Simple hooded figure or helmet
import type { SVGProps } from 'react';

export const PixelFantasyAvatarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    {/* Hood/Helmet - Dark Wood Brown */}
    <path fill="#4D423A" d="M4 3h8v1H4z M3 4h10v7H3z M4 11h8v1H4z" />
    {/* Face Shadow - Darker Stone Gray */}
    <path fill="#20242B" d="M5 5h6v4H5z" />
    {/* Eyes - Gold Accent (subtle glow) */}
    <path fill="#E0AA66" d="M6 7h1v1H6z M9 7h1v1H9z" />
  </svg>
);

    