// src/components/icons/PixelRefreshIcon.tsx
import type { SVGProps } from 'react';

export const PixelRefreshIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    fill="currentColor"
    {...props}
  >
    {/* Simple square for testing server stability */}
    <path d="M6 6h4v4H6z" />
  </svg>
);
