
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
        'group flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors duration-150 ease-in-out rounded-md font-pixel',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background',
        isActive
          ? 'bg-primary text-primary-foreground shadow-sm' // Dark Brown bg, Light Cream text
          : 'text-muted-foreground hover:bg-accent/70 hover:text-accent-foreground', // Dark Muted Brown text, hover to Purple bg & Light Cream text
      )}
    >
      {icon && <span className={cn(
        "transition-colors w-5 h-5", 
        isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-accent-foreground"
        )}>{icon}</span>}
      <span className={cn(
        // Explicitly set text color for the children, mirroring icon logic
        isActive 
          ? 'text-primary-foreground' 
          : 'text-muted-foreground group-hover:text-accent-foreground'
      )}>
        {children}
      </span>
    </Link>
  );
}
