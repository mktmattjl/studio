
'use client';

import Link from 'next/link';
import { ContentCard } from '@/components/ui/ContentCard';
import type { ElementType } from 'react'; 
import { ArrowRight } from 'lucide-react'; // Will be replaced if pixel version needed
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
        className="h-full w-full flex flex-col group transition-all duration-150 ease-in-out hover:shadow-xl hover:-translate-y-1" 
        interactive
        padding="p-5"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className={cn("p-2.5 rounded-lg", iconBgClass)}>
             <Icon className={cn('w-6 h-6 transition-transform group-hover:scale-110', iconTextClass)} />
          </div>
           <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">{title}</h3> {/* text-md to text-base */}
        </div>
        <p className="text-sm text-muted-foreground flex-grow mb-3 leading-relaxed">{description}</p>
        <div className="mt-auto">
          <span className="text-sm text-primary font-medium flex items-center"> {/* text-xs to text-sm */}
            Go to {title.split(' ')[0]} <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </ContentCard>
    </Link>
  );
}
