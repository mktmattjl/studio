
'use client';

import type { ReactNode } from 'react';
import { PixelatedButton } from '@/components/PixelatedButton';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PlannerControlsProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  currentMonthLabel: string;
}

export function PlannerControls({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onToday,
  currentMonthLabel,
}: PlannerControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
      <div className="flex items-center gap-2">
        <PixelatedButton onClick={onPrevMonth} size="sm" aria-label="Previous month">
          <ChevronLeft size={18} />
        </PixelatedButton>
        <PixelatedButton onClick={onNextMonth} size="sm" aria-label="Next month">
          <ChevronRight size={18} />
        </PixelatedButton>
        <PixelatedButton onClick={onToday} variant="outline" size="sm">
          Today
        </PixelatedButton>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground order-first sm:order-none text-center flex-grow sm:flex-grow-0">
        {currentMonthLabel}
      </h2>
      <div className="flex items-center gap-2 sm:min-w-[180px] justify-end"> {/* Adjusted for balance */}
        {/* Placeholder for View Switcher (Month/Week/Day) */}
        {/* <PixelatedButton variant="outline" size="sm" disabled>Month</PixelatedButton> */}
        {/* <PixelatedButton variant="ghost" size="sm" disabled>Week</PixelatedButton> */}
      </div>
    </div>
  );
}

