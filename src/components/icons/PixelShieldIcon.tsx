
// src/components/icons/PixelShieldIcon.tsx
import type { SVGProps } from 'react';

export const PixelShieldIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    <path fill="#C0C0C0" d="M3 2h10v1H3z M2 3h12v1H2z M2 4h1v8H2z M13 4h1v8h-1z M3 12h10v1H3z M4 13h8v1H4z M5 14h6v1H5z" /> {/* Silver outline */}
    <path fill="#A9A9A9" d="M4 4h8v8H4z" /> {/* Dark Gray inner */}
    <path fill="#ADD8E6" d="M6 6h4v4H6z" /> {/* Light Blue emblem */}
  </svg>
);
