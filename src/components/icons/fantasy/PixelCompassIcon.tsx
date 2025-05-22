
// src/components/icons/fantasy/PixelCompassIcon.tsx
import type { SVGProps } from 'react';

export const PixelCompassIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    <path fill="#7A6C5F" d="M2 2h12v12H2z" /> {/* Dark Wood/Metal Casing */}
    <path fill="#F3EADA" d="M3 3h10v10H3z" /> {/* Parchment Face */}
    {/* Needle */}
    <path fill="#C93D3D" d="M8 4v3H7v1h1v1h1V8h1V7H9V4z" /> {/* Ruby Red North part */}
    <path fill="#BEB5A9" d="M8 9v3H7v-1h1V9h1v1h1v-1z" /> {/* Grayish South part */}
    <path fill="#4D423A" d="M8 7h1v2H8z" /> {/* Dark Brown Center Pin */}
    {/* Markings */}
    <path fill="#4D423A" d="M8 3h1v1H8z M8 12h1v1H8z M3 8h1v1H3z M12 8h1v1h-1z" />
  </svg>
);

    