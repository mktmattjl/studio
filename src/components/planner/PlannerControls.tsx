
'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PixelChevronLeftIcon, PixelChevronRightIcon } from '@/components/icons/fantasy'; 

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
        {/* Navigation buttons use outline style with accent hover */}
        <Button onClick={onPrev} variant="outline" size="icon" aria-label={`Previous ${viewMode}`} className="rounded-md p-2 hover:bg-accent/20 hover:border-accent border-secondary">
          <PixelChevronLeftIcon className="w-5 h-5" />
        </Button>
        <Button onClick={onNext} variant="outline" size="icon" aria-label={`Next ${viewMode}`} className="rounded-md p-2 hover:bg-accent/20 hover:border-accent border-secondary">
          <PixelChevronRightIcon className="w-5 h-5" />
        </Button>
        <Button onClick={onToday} variant="outline" size="default" className="rounded-md px-4 font-pixel hover:bg-accent/20 hover:border-accent border-secondary">
          Today's Scroll
        </Button>
      </div>
      <h2 className="text-xl md:text-2xl font-pixel text-primary order-first sm:order-none text-center">
        {currentViewLabel}
      </h2>
      <div className="flex items-center gap-2 p-1 bg-muted/70 rounded-lg">
        <Button 
            variant={viewMode === 'month' ? 'default' : 'ghost'} 
            size="sm" 
            onClick={() => onViewChange('month')}
            className={cn(
              "px-4 py-1.5 rounded-md font-pixel",
              viewMode === 'month' ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'
            )}
        >
          Month View
        </Button>
        <Button 
            variant={viewMode === 'week' ? 'default' : 'ghost'} 
            size="sm" 
            onClick={() => onViewChange('week')}
             className={cn(
              "px-4 py-1.5 rounded-md font-pixel",
              viewMode === 'week' ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'
            )}
        >
          Week View
        </Button>
      </div>
    </div>
  );
}
    