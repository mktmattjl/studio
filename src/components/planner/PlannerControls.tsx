
'use client';

import { Button } from '@/components/ui/button';
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
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4 sm:mb-6">
      <div className="flex items-center gap-2">
        <Button onClick={onPrev} variant="outline" size="icon" aria-label={`Previous ${viewMode}`} className="rounded-md">
          <ChevronLeft size={18} />
        </Button>
        <Button onClick={onNext} variant="outline" size="icon" aria-label={`Next ${viewMode}`} className="rounded-md">
          <ChevronRight size={18} />
        </Button>
        <Button onClick={onToday} variant="outline" size="default" className="rounded-md px-4">
          Today
        </Button>
      </div>
      <h2 className="text-xl md:text-2xl font-semibold text-foreground order-first sm:order-none text-center">
        {currentViewLabel}
      </h2>
      <div className="flex items-center gap-2 p-1 bg-muted rounded-lg"> {/* Group buttons in a styled container */}
        <Button 
            variant={viewMode === 'month' ? 'default' : 'ghost'} 
            size="sm" 
            onClick={() => onViewChange('month')}
            className={cn(
              "px-4 py-1.5 rounded-md",
              viewMode === 'month' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'
            )}
        >
          Month
        </Button>
        <Button 
            variant={viewMode === 'week' ? 'default' : 'ghost'} 
            size="sm" 
            onClick={() => onViewChange('week')}
             className={cn(
              "px-4 py-1.5 rounded-md",
              viewMode === 'week' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'
            )}
        >
          Week
        </Button>
      </div>
    </div>
  );
}
