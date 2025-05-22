
// src/components/icons/fantasy/PixelPlusIcon.tsx
// Keeping this simple as it's often for "add" which is utilitarian
import type { SVGProps } from 'react';

export const PixelPlusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
    fill="currentColor" 
  >
    <path d="M7 2h2v5h5v2h-5v5H7v-5H2V7h5V2z" />
  </svg>
);

    