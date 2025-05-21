
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
            className="py-2 px-1 text-center text-xs font-medium text-muted-foreground border-b border-r border-border" // Reduced py-2.5 to py-2
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
                'min-h-[5rem] sm:min-h-[5.5rem] md:min-h-[6rem] border-b border-r border-border p-1 sm:p-1.5 flex flex-col overflow-hidden relative group', // Reduced min-h and padding
                isCurrentMonth ? 'bg-card hover:bg-muted/30' : 'bg-muted/20 opacity-70 hover:bg-muted/40',
                isCurrentDay && 'bg-primary/10 ring-1 ring-inset ring-primary',
                day && onDateClick && 'cursor-pointer transition-colors duration-150'
              )}
              onClick={() => day && onDateClick?.(day)}
            >
              {day && (
                <>
                  <span
                    className={cn(
                      'text-xs font-medium self-start mb-0.5', // Reduced mb-1 to mb-0.5
                      isCurrentDay ? 'text-primary-foreground bg-primary px-1.5 py-0.5 rounded-md shadow-sm' : isCurrentMonth ? 'text-foreground' : 'text-muted-foreground/70'
                    )}
                  >
                    {format(day, 'd')}
                  </span>
                  <div className="space-y-0.5 overflow-y-auto text-xs max-h-[calc(100%-1.5rem)] styled-scrollbar flex-grow pr-0.5"> {/* Reduced space-y, max-h, pr */}
                    {dayEvents.slice(0, 2).map(event => ( // Show up to 2 events
                      <div
                        key={event.id}
                        title={`${event.title} (${format(event.startTime, 'p')})`}
                        className={cn(
                            'px-1 py-0.5 rounded-sm border-l-2 text-[0.6rem] sm:text-[0.65rem] leading-tight truncate cursor-pointer group-hover:opacity-80 shadow-sm', // Adjusted text size, leading
                            event.color 
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
                        <div className="text-muted-foreground text-[0.55rem] sm:text-[0.6rem] mt-0.5 px-0.5"> {/* Adjusted text size, margin, padding */}
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
    </div>
  );
}
