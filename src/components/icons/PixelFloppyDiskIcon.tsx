
// src/components/icons/PixelFloppyDiskIcon.tsx
import type { SVGProps } from 'react';

export const PixelFloppyDiskIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    <path fill="#000080" d="M2 2h12v12H2z" /> {/* Navy Blue Body */}
    <path fill="#ADD8E6" d="M3 3h10v8H3z" /> {/* Light Blue Label Area */}
    <path fill="#C0C0C0" d="M5 10h6v3H5z" /> {/* Silver Shutter */}
    <path fill="#FFFFFF" d="M10 3h2v2h-2z" /> {/* White Corner Cut */}
    <path fill="#000000" d="M6 11h4v1H6z" /> {/* Black Shutter Slit */}
  </svg>
);
