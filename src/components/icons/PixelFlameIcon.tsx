
// src/components/icons/PixelFlameIcon.tsx
import type { SVGProps } from 'react';

export const PixelFlameIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    <path fill="#FF4500" d="M8 1L7 3H6L5 6H6L7 9H8L9 12H7L6 14H10L9 11H10L11 8H10L9 5H10L11 2H9L8 1Z" /> {/* OrangeRed main flame */}
    <path fill="#FFA500" d="M8 3L7 5H6L7 8H8L9 10H8L7 12H9L8 9H9L10 6H9L8 3Z" /> {/* Orange inner flame */}
    <path fill="#FFFF00" d="M8 5L7 7H8L9 8H8L7 10H8L9 7H8 5Z" /> {/* Yellow core flame */}
  </svg>
);
