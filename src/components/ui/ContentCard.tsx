
import { cn } from '@/lib/utils';
import type { ReactNode, ElementType } from 'react';

interface ContentCardProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  padding?: string;
  interactive?: boolean;
  elementType?: 'div' | 'section' | 'article' | 'aside';
}

export function ContentCard({
  children,
  className,
  as: Component, 
  padding = 'p-4 sm:p-6',
  interactive = false,
  elementType = 'div', 
}: ContentCardProps) {
  const ActualComponent = Component || elementType;

  return (
    <ActualComponent
      className={cn(
        'bg-card text-card-foreground border border-border shadow-sm',
        'rounded-lg', 
        interactive && 'transition-all duration-150 hover:shadow-lg hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        padding,
        className
      )}
      // Add tabIndex for focusability if interactive and not inherently focusable (like a link/button)
      tabIndex={interactive && ActualComponent === 'div' ? 0 : undefined}
    >
      {children}
    </ActualComponent>
  );
}
