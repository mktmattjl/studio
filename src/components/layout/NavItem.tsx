
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface NavItemProps {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
}

export function NavItem({ href, children, icon }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors duration-150 ease-in-out rounded-md font-pixel', // Thematic font for nav items
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', 
        isActive 
          ? 'bg-primary/80 text-primary-foreground shadow-sm' // Sapphire Blue, active
          : 'text-muted-foreground hover:bg-accent/70 hover:text-accent-foreground', // Amethyst Purple for hover
      )}
    >
      {icon && <span className={cn("transition-colors", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-accent-foreground")}>{icon}</span>}
      <span>{children}</span>
    </Link>
  );
}

    