import { cn } from '@/lib/utils';
import type { ReactNode, ElementType } from 'react';

interface ContentCardProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  padding?: string;
  interactive?: boolean;
  elementType?: 'div' | 'section' | 'article' | 'aside'; // More semantic options
}

export function ContentCard({
  children,
  className,
  as: Component, // Use 'as' prop for component override
  padding = 'p-4 sm:p-6',
  interactive = false,
  elementType = 'div', // Default to div if 'as' is not provided
}: ContentCardProps) {
  const ActualComponent = Component || elementType;

  return (
    <ActualComponent
      className={cn(
        'bg-card text-card-foreground border border-border shadow-sm',
        'rounded-lg', // Uses --radius from globals.css
        interactive && 'transition-all duration-150 hover:shadow-lg hover:border-primary/50',
        padding,
        className
      )}
    >
      {children}
    </ActualComponent>
  );
}
