import { cn } from '@/lib/utils';
import type { ReactNode, ElementType } from 'react';

interface PixelatedContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  padding?: string;
  interactive?: boolean;
}

export function PixelatedContainer({
  children,
  className,
  as: Component = 'div',
  padding = 'p-4 md:p-6',
  interactive = false,
}: PixelatedContainerProps) {
  return (
    <Component
      className={cn(
        'border-2 md:border-4 border-accent bg-card text-card-foreground',
        'shadow-[2px_2px_0px_hsl(var(--primary))] md:shadow-[4px_4px_0px_hsl(var(--primary))]',
        interactive && 'hover:shadow-[3px_3px_0px_hsl(var(--primary))] md:hover:shadow-[6px_6px_0px_hsl(var(--primary))] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-100',
        padding,
        'rounded-none', // Ensure sharp corners
        className
      )}
    >
      {children}
    </Component>
  );
}
