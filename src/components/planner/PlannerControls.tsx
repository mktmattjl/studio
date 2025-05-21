
'use client';

import type { ReactNode } from 'react';
import { PixelatedButton } from '@/components/PixelatedButton';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type PlannerViewMode = 'month' | 'week';

interface PlannerControlsProps {
  currentDate: Date;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  currentViewLabel: string;
  viewMode: PlannerViewMode;
  onViewChange: (viewMode: PlannerViewMode) => void;
}

export function PlannerControls({
  currentDate,
  onPrev,
  onNext,
  onToday,
  currentViewLabel,
  viewMode,
  onViewChange,
}: PlannerControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
      <div className="flex items-center gap-2">
        <PixelatedButton onClick={onPrev} size="sm" aria-label={`Previous ${viewMode}`}>
          <ChevronLeft size={18} />
        </PixelatedButton>
        <PixelatedButton onClick={onNext} size="sm" aria-label={`Next ${viewMode}`}>
          <ChevronRight size={18} />
        </PixelatedButton>
        <PixelatedButton onClick={onToday} variant="outline" size="sm">
          Today
        </PixelatedButton>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground order-first sm:order-none text-center flex-grow sm:flex-grow-0">
        {currentViewLabel}
      </h2>
      <div className="flex items-center gap-2 sm:min-w-[200px] justify-end">
        <PixelatedButton 
            variant={viewMode === 'month' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => onViewChange('month')}
            className={cn(viewMode === 'month' ? 'bg-accent text-accent-foreground' : '')}
        >
          Month
        </PixelatedButton>
        <PixelatedButton 
            variant={viewMode === 'week' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => onViewChange('week')}
            className={cn(viewMode === 'week' ? 'bg-accent text-accent-foreground' : '')}
        >
          Week
        </PixelatedButton>
      </div>
    </div>
  );
}
