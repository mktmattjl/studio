
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
  description: string; 
  href: string;
  Icon: ElementType;
  iconBgClass?: string;
  iconTextClass?: string;
}

export function QuickActionCard({
  title,
  description,
  href,
  Icon,
  iconBgClass = 'bg-primary/10',
  iconTextClass = 'text-primary',
}: QuickActionCardProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href={href} passHref legacyBehavior>
          <a
            aria-label={title}
            // title attribute removed to prevent duplicate tooltips
            className="block"
          >
            <ContentCard
              className="group transition-all duration-150 ease-in-out hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center"
              interactive
              padding="p-2.5" 
              style={{ width: '44px', height: '44px' }} 
            >
              <div className={cn("p-1.5 rounded-md flex items-center justify-center", iconBgClass)}>
                <Icon className={cn('w-5 h-5 transition-transform group-hover:scale-110', iconTextClass)} />
              </div>
            </ContentCard>
          </a>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="top" align="center">
        <p>{title}</p>
      </TooltipContent>
    </Tooltip>
  );
}
