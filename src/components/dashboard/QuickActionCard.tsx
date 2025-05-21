
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
  description: string; // Kept for prop consistency, though not displayed directly
  href: string;
  Icon: ElementType;
  iconBgClass?: string;
  iconTextClass?: string;
}

export function QuickActionCard({
  title,
  // description, // description is not visibly used in the compact icon-only button
  href,
  Icon,
  iconBgClass = 'bg-primary/10', // Example default, theme might override
  iconTextClass = 'text-primary', // Example default
}: QuickActionCardProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          aria-label={title}
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md" // Ensure Link itself can receive focus styling
        >
          <ContentCard
            className="group transition-all duration-150 ease-in-out hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center"
            interactive // ContentCard is interactive, adds hover/focus styles
            padding="p-2.5"
            style={{ width: '44px', height: '44px' }}
            elementType="div" // Explicitly a div, receives focus if interactive
          >
            <div className={cn("p-1.5 rounded-md flex items-center justify-center", iconBgClass)}>
              <Icon className={cn('w-5 h-5 transition-transform group-hover:scale-110', iconTextClass)} />
            </div>
          </ContentCard>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="top" align="center">
        <p>{title}</p>
      </TooltipContent>
    </Tooltip>
  );
}
