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
        'flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors duration-150 ease-in-out rounded-md',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', // Added focus visibility
        isActive 
          ? 'bg-primary/10 text-primary font-semibold' 
          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
      )}
    >
      {icon && <span className={cn(isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")}>{icon}</span>}
      <span>{children}</span>
    </Link>
  );
}
