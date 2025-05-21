
// src/components/icons/PixelJoystickIcon.tsx
import type { SVGProps } from 'react';

export const PixelJoystickIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    <path fill="#E04040" d="M6 2h4v2h1v1h1v3h-1v1h-1v2H6v-2H5V6H4V5h1V2h1z" /> {/* Red stick + base top */}
    <path fill="#303030" d="M4 10h8v3H4z" /> {/* Dark Grey Base body */}
    <path fill="#505050" d="M5 9h6v1H5z" /> {/* Medium Grey Base top */}
    <path fill="#FF0000" d="M12 6h2v2h-2z" /> {/* Red Button */}
    <path fill="#A0A0A0" d="M7 3h2v1H7z" /> {/* Stick accent */}
  </svg>
);
