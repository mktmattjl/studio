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
        'flex items-center gap-2 px-3 py-2 text-sm sm:text-base font-medium transition-all duration-150 ease-in-out',
        'border-2 border-transparent hover:border-accent hover:text-accent-foreground hover:bg-accent',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:border-accent',
        isActive ? 'bg-accent text-accent-foreground border-accent shadow-[2px_2px_0px_hsl(var(--primary))]' : 'text-foreground hover:shadow-[2px_2px_0px_hsl(var(--primary))]', // Changed text-primary-foreground to text-foreground
        'rounded-none' // Ensure sharp corners for pixel look
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}
