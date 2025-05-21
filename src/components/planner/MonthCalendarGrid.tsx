
'use client';

import type { PlannerEvent } from '@/app/planner/page'; 
import { cn } from '@/lib/utils';
import { getDaysInMonthGrid, dayNames, format, isSameDay, isSameMonth, isToday } from '@/lib/dateUtils';

interface MonthCalendarGridProps {
  currentDate: Date;
  events: PlannerEvent[];
  onDateClick?: (date: Date) => void;
  onEventClick?: (event: PlannerEvent) => void;
}

export function MonthCalendarGrid({ currentDate, events, onDateClick, onEventClick }: MonthCalendarGridProps) {
  const days = getDaysInMonthGrid(currentDate);

  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(event.startTime, day)).sort((a,b) => a.startTime.getTime() - b.startTime.getTime());
  };

  return (
    <div className="flex-grow flex flex-col border-t-2 border-l-2 border-accent">
      {/* Day Headers */}
      <div className="grid grid-cols-7">
        {dayNames.map((dayName) => (
          <div
            key={dayName}
            className="py-2 px-1 text-center font-semibold text-primary-foreground border-b-2 border-r-2 border-accent bg-card"
          >
            <span className="hidden sm:inline">{dayName}</span>
            <span className="sm:hidden">{dayName.charAt(0)}</span>
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 grid-rows-6 flex-grow">
        {days.map((day, index) => {
          const isCurrentMonth = day ? isSameMonth(day, currentDate) : false;
          const isCurrentDay = day ? isToday(day) : false;
          const dayEvents = day ? getEventsForDay(day) : [];

          return (
            <div
              key={day ? day.toISOString() : `empty-${index}`}
              className={cn(
                'min-h-[6rem] sm:min-h-[8rem] md:min-h-[10rem] border-b-2 border-r-2 border-accent p-1 sm:p-2 flex flex-col overflow-hidden', // Added overflow-hidden
                isCurrentMonth ? 'bg-background/30' : 'bg-muted/20 opacity-80', // Slightly adjusted non-current month
                isCurrentDay && 'bg-accent/30 ring-2 ring-accent inset-0', // Enhanced today highlight
                day && onDateClick && 'cursor-pointer hover:bg-accent/20 transition-colors'
              )}
              onClick={() => day && onDateClick?.(day)}
            >
              {day && (
                <>
                  <span
                    className={cn(
                      'text-xs sm:text-sm font-semibold self-start mb-1',
                      isCurrentDay ? 'text-accent-foreground bg-accent px-1.5 py-0.5 rounded-sm' : 'text-primary-foreground' // rounded-sm for pixel
                    )}
                  >
                    {format(day, 'd')}
                  </span>
                  <div className="space-y-0.5 overflow-y-auto text-xs max-h-[calc(100%-1.75rem)] styled-scrollbar flex-grow"> {/* Adjusted max-height, added flex-grow */}
                    {dayEvents.slice(0, 3).map(event => ( 
                      <div
                        key={event.id}
                        title={`${event.title} (${format(event.startTime, 'p')})`}
                        className={cn(
                            'p-1 rounded-none border-l-2 text-[0.6rem] sm:text-xs leading-tight truncate cursor-pointer hover:opacity-80',
                            event.color || 'bg-primary/70 border-primary text-primary-foreground', // Event specific color
                            'shadow-[1px_1px_0px_hsl(var(--primary))]' // Pixel shadow for event
                           )}
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent date click
                            onEventClick?.(event);
                        }}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                        <div className="text-muted-foreground text-[0.6rem] sm:text-xs mt-0.5 px-1">
                            + {dayEvents.length - 3} more
                        </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
      {/* Custom scrollbar style for webkit browsers */}
      <style jsx>{`
        .styled-scrollbar::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        .styled-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--accent) / 0.5);
          border-radius: 0px; /* Sharp edges for pixel style */
        }
        .styled-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--accent));
        }
        .styled-scrollbar::-webkit-scrollbar-track {
          background: transparent; /* Or hsl(var(--background) / 0.5) for a subtle track */
        }
      `}</style>
    </div>
  );
}
