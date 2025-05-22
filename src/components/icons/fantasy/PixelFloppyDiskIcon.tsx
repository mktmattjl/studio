// src/components/icons/fantasy/PixelFloppyDiskIcon.tsx
// Themed as a "Save Scroll" or "Archive Tome" icon
import type { SVGProps } from 'react';

export const PixelFloppyDiskIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    {/* Tome Cover - Dark Wood Brown */}
    <path fill="hsl(var(--border))" d="M2 2h12v12H2z" />
    {/* Page Edge/Label Area - Parchment */}
    <path fill="hsl(var(--parchment-bg))" d="M3 3h10v10H3z" />
    {/* Metal Clasp/Binding - Gold Accent */}
    <path fill="hsl(var(--gold-accent))" d="M7 1h2v2H7z M7 13h2v2H7z M1 7h2v2H1z M13 7h2v2h-2z" />
    {/* "Save" Symbol - e.g., a simple downward arrow or a stylized 'S' - using primary text color */}
    <path fill="hsl(var(--foreground))" d="M7 5h2v3H7z M6 8h4v1H6z M5 9h6v1H5z" />
  </svg>
);
