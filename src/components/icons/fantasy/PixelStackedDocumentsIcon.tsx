// src/components/icons/fantasy/PixelStackedDocumentsIcon.tsx
import type { SVGProps } from 'react';

export const PixelStackedDocumentsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
    // Using currentColor for potential theming, but fills are hardcoded for specific look
  >
    {/* Bottom-most paper (darkest brown edge) */}
    <path fill="#7A6C5F" d="M3 13h10v1H3z" />
    <path fill="#A07050" d="M3 7h10v6H3z" /> {/* Darker Parchment */}

    {/* Middle paper (medium brown edge) */}
    <path fill="#8B4513" d="M4 12h9v1H4z" />
    <path fill="#BEB5A9" d="M4 6h9v6H4z" /> {/* Medium Parchment */}
    
    {/* Top-most paper (lightest parchment, main view) */}
    <path fill="#A0522D" d="M5 11h8v1H5z" /> {/* Lightest brown edge for top paper */}
    <path fill="#F3EADA" d="M5 4h8v7H5z" /> {/* Light Parchment - Main visible paper */}

    {/* Content on top paper */}
    {/* Blue Highlight */}
    <path fill="#527ED9" d="M6 5h6v1H6z" /> {/* Sapphire Blue from palette */}
    {/* Text Lines (dark brown) */}
    <path fill="#4D423A" d="M6 7h6v1H6z M6 9h6v1H6z M6 11h4v1H6z" /> {/* Dark Sepia from palette */}

     {/* Subtle shadow/offsets for stacking effect */}
    <path fill="#000000" opacity="0.2" d="M3 14h10v1H3z M4 13h9v1H4z M5 12h8v1H5z" />

  </svg>
);
