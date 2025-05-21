
// src/components/icons/PixelWandIcon.tsx
import type { SVGProps } from 'react';

export const PixelWandIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    <path fill="#8B4513" d="M2 10h8v2H2z M3 9h6v1H3z M4 8h4v1H4z M9 2L11 4l2 1-2 1-1 2-1-2-2-1 2-1z" /> {/* Brown Stick & Yellow Star Top */}
    <path fill="#FFD700" d="M9 2L11 4l2 1-2 1-1 2-1-2-2-1 2-1z" />
    <path fill="#FFFFFF" d="M10 3L11 4l1 0-1-1z" /> {/* Shine on star */}
  </svg>
);
