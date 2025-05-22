
'use client';

import Link from 'next/link';
import { ContentCard } from '@/components/ui/ContentCard';
import type { ElementType } from 'react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface QuickActionCardProps {
  title: string;
  href: string;
  Icon: ElementType;
  iconBgClass?: string;
  iconTextClass?: string;
}

export function QuickActionCard({
  title,
  href,
  Icon,
  iconBgClass = 'bg-primary/10',
  iconTextClass = 'text-primary',
}: QuickActionCardProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          aria-label={title}
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background rounded-md"
        >
          <ContentCard
            className={cn(
              "group transition-all duration-150 ease-in-out hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center",
              "hover:border-accent/70 border-2 border-transparent" 
            )}
            interactive 
            padding="p-2.5" 
            style={{ 
              width: '48px', 
              height: '48px',
              boxShadow: "inset 2px 2px 0px hsl(var(--card) / 0.7), inset -2px -2px 0px hsl(var(--background) / 0.5), 1px 1px 2px hsl(var(--border))"
            }}
            elementType="div" 
          >
            <div className={cn("p-1 rounded-sm flex items-center justify-center", iconBgClass)}>
              <Icon className={cn('w-6 h-6 transition-transform group-hover:scale-110', iconTextClass)} />
            </div>
          </ContentCard>
        </Link>
      </TooltipTrigger>
      <TooltipContent 
        side="top" 
        align="center" 
        className="font-pixel bg-popover text-popover-foreground border-border shadow-lg rounded-sm" // Thematic tooltip
      >
        <p>{title}</p>
      </TooltipContent>
    </Tooltip>
  );
}
