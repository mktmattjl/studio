
'use client';

import Link from 'next/link';
import { ContentCard } from '@/components/ui/ContentCard';
import type { ElementType } from 'react';
import { cn } from '@/lib/utils';

interface QuickActionCardProps {
  title: string;
  description: string; // Kept for aria-label or potential tooltips
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
    <Link href={href} passHref legacyBehavior>
      <a
        aria-label={title}
        title={title} // Tooltip for desktop users
        className="block"
      >
        <ContentCard
          className="group transition-all duration-150 ease-in-out hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center"
          interactive
          padding="p-2.5" // Reduced padding for a more square look
          style={{ width: '44px', height: '44px' }} // Small square size
        >
          <div className={cn("p-1.5 rounded-md flex items-center justify-center", iconBgClass)}>
            <Icon className={cn('w-5 h-5 transition-transform group-hover:scale-110', iconTextClass)} />
          </div>
          {/* Text elements removed for compact icon-only button */}
        </ContentCard>
      </a>
    </Link>
  );
}
