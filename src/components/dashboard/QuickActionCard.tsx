
'use client';

import Link from 'next/link';
import { ContentCard } from '@/components/ui/ContentCard';
import type { ElementType } from 'react'; 
import { PixelChevronRightIcon } from '@/components/icons/PixelChevronRightIcon'; // Changed from ArrowRight
import { cn } from '@/lib/utils';

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
  iconTextClass = 'text-primary'
}: QuickActionCardProps) {
  return (
    <Link href={href} passHref className="flex">
      <ContentCard 
        className="h-full w-full flex flex-col group transition-all duration-150 ease-in-out hover:shadow-xl hover:-translate-y-0.5" // Reduced hover translate
        interactive
        padding="p-3" // Reduced padding from p-5
      >
        <div className="flex items-center gap-2.5 mb-2"> {/* Reduced gap and mb */}
          <div className={cn("p-2 rounded-md", iconBgClass)}> {/* Reduced padding, consistent rounded-md */}
             <Icon className={cn('w-5 h-5 transition-transform group-hover:scale-110', iconTextClass)} /> {/* Reduced icon size */}
          </div>
           <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{title}</h3> {/* Reduced font size from text-base */}
        </div>
        <p className="text-xs text-muted-foreground flex-grow mb-2 leading-snug">{description}</p> {/* Reduced font size and leading */}
        <div className="mt-auto">
          <span className="text-xs text-primary font-medium flex items-center"> {/* Reduced font size */}
            Go to {title.split(' ')[0]} <PixelChevronRightIcon className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-0.5" /> {/* Changed icon and size */}
          </span>
        </div>
      </ContentCard>
    </Link>
  );
}
