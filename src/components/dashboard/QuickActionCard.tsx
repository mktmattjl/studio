
'use client';

import Link from 'next/link';
import { ContentCard } from '@/components/ui/ContentCard';
import type { ElementType } from 'react'; // Changed from LucideIcon
import { ArrowRight } from 'lucide-react'; // Keep for the "Go to" link, or replace with pixel version if available
import { cn } from '@/lib/utils';

interface QuickActionCardProps {
  title: string;
  description: string;
  href: string;
  Icon: ElementType; // Changed from LucideIcon
  iconBgClass?: string; 
  iconTextClass?: string; 
}

export function QuickActionCard({ 
  title, 
  description, 
  href, 
  Icon, 
  iconBgClass = 'bg-primary/10', 
  iconTextClass = 'text-primary' // This class will apply if the SVG uses currentColor
}: QuickActionCardProps) {
  return (
    <Link href={href} passHref className="flex">
      <ContentCard 
        className="h-full w-full flex flex-col group transition-all duration-150 ease-in-out hover:shadow-xl hover:-translate-y-1" 
        interactive
        padding="p-5"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className={cn("p-2.5 rounded-lg", iconBgClass)}>
             {/* Removed size={22}, added w-6 h-6 for sizing pixel icons */}
             <Icon className={cn('w-6 h-6 transition-transform group-hover:scale-110', iconTextClass)} />
          </div>
           <h3 className="text-md font-semibold text-foreground group-hover:text-primary transition-colors">{title}</h3>
        </div>
        <p className="text-sm text-muted-foreground flex-grow mb-3 leading-relaxed">{description}</p>
        <div className="mt-auto">
          {/* Using Lucide ArrowRight here, can be swapped for a pixel version if one exists */}
          <span className="text-xs text-primary font-medium flex items-center">
            Go to {title.split(' ')[0]} <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </ContentCard>
    </Link>
  );
}
