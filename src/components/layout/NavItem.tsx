
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
        'group flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors duration-150 ease-in-out rounded-md',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background',
        isActive
          ? 'bg-secondary text-primary'
          : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
      )}
    >
      {icon && <span className={cn(
        "w-5 h-5 transition-colors",
        isActive ? "text-primary" : "text-muted-foreground",
        "group-hover:text-foreground"
        )}>{icon}</span>}
      <span className="font-medium">
        {children}
      </span>
    </Link>
  );
}
