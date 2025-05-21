
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
    <div className="flex-grow flex flex-col border-t border-l border-border rounded-b-lg overflow-hidden">
      <div className="grid grid-cols-7 bg-card"> {/* Header row background */}
        {dayNames.map((dayName) => (
          <div
            key={dayName}
            className="py-2.5 px-1 text-center text-xs font-medium text-muted-foreground border-b border-r border-border"
          >
            <span className="hidden sm:inline">{dayName}</span>
            <span className="sm:hidden">{dayName.substring(0,1)}</span> {/* Monogram for small screens */}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 grid-rows-6 flex-grow bg-card"> {/* Grid background */}
        {days.map((day, index) => {
          const isCurrentMonth = day ? isSameMonth(day, currentDate) : false;
          const isCurrentDay = day ? isToday(day) : false;
          const dayEvents = day ? getEventsForDay(day) : [];

          return (
            <div
              key={day ? day.toISOString() : `empty-${index}`}
              className={cn(
                'min-h-[6rem] sm:min-h-[7rem] md:min-h-[8rem] border-b border-r border-border p-1.5 sm:p-2 flex flex-col overflow-hidden relative group', 
                isCurrentMonth ? 'bg-card hover:bg-muted/30' : 'bg-muted/20 opacity-70 hover:bg-muted/40', // Slightly darker for non-current month
                isCurrentDay && 'bg-primary/10 ring-1 ring-inset ring-primary', // Highlight today
                day && onDateClick && 'cursor-pointer transition-colors duration-150'
              )}
              onClick={() => day && onDateClick?.(day)}
            >
              {day && (
                <>
                  <span
                    className={cn(
                      'text-xs sm:text-sm font-medium self-start mb-1',
                      isCurrentDay ? 'text-primary-foreground bg-primary px-1.5 py-0.5 rounded-md shadow-sm' : isCurrentMonth ? 'text-foreground' : 'text-muted-foreground/70'
                    )}
                  >
                    {format(day, 'd')}
                  </span>
                  <div className="space-y-1 overflow-y-auto text-xs max-h-[calc(100%-1.75rem)] styled-scrollbar flex-grow pr-1">
                    {dayEvents.slice(0, 2).map(event => (
                      <div
                        key={event.id}
                        title={`${event.title} (${format(event.startTime, 'p')})`}
                        className={cn(
                            'px-1.5 py-0.5 rounded-sm border-l-2 text-[0.6rem] sm:text-[0.7rem] leading-snug truncate cursor-pointer group-hover:opacity-80 shadow-sm',
                            event.color // Use the pre-assigned color from PlannerEvent
                           )}
                        onClick={(e) => {
                            e.stopPropagation(); 
                            onEventClick?.(event);
                        }}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                        <div className="text-muted-foreground text-[0.6rem] sm:text-xs mt-0.5 px-1">
                            + {dayEvents.length - 2} more
                        </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
      <style jsx>{`
        .styled-scrollbar::-webkit-scrollbar {
          width: 5px; /* Slightly thicker scrollbar */
          height: 5px;
        }
        .styled-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--muted-foreground) / 0.4); /* More subtle thumb */
          border-radius: var(--radius);
        }
        .styled-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--muted-foreground) / 0.6);
        }
        .styled-scrollbar::-webkit-scrollbar-track {
          background: transparent; /* Or hsl(var(--card)) if want track visible */
        }
      `}</style>
    </div>
  );
}
