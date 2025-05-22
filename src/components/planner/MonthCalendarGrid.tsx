
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
    return events.filter(event => event.startTime && isSameDay(event.startTime, day)).sort((a,b) => a.startTime.getTime() - b.startTime.getTime());
  };

  return (
    <div className="flex-grow flex flex-col border-t border-l border-border rounded-b-md overflow-hidden">
      <div className="grid grid-cols-7 bg-card"> 
        {dayNames.map((dayName) => (
          <div
            key={dayName}
            className="py-2 px-1 text-center text-xs font-pixel text-muted-foreground border-b border-r border-border" 
          >
            <span className="hidden sm:inline">{dayName}</span>
            <span className="sm:hidden">{dayName.substring(0,1)}</span> 
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 grid-rows-6 flex-grow bg-card"> 
        {days.map((day, index) => {
          const isCurrentMonth = day ? isSameMonth(day, currentDate) : false;
          const isCurrentDay = day ? isToday(day) : false;
          const dayEvents = day ? getEventsForDay(day) : [];
          
          return (
            <div
              key={day ? day.toISOString() : `empty-${index}`}
              className={cn(
                'min-h-[5rem] sm:min-h-[6rem] md:min-h-[7rem] border-b border-r border-border p-1.5 sm:p-2 flex flex-col overflow-hidden relative group', 
                isCurrentMonth ? 'bg-card hover:bg-card/80' : 'bg-background/50 opacity-70 hover:bg-background/70',
                isCurrentDay && 'bg-primary/20 ring-2 ring-inset ring-primary', // Primary Accent for today highlight
                day && onDateClick && 'cursor-pointer transition-colors duration-150 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none'
              )}
              onClick={() => day && onDateClick?.(day)}
              tabIndex={day && onDateClick ? 0 : undefined} 
            >
              {day && (
                <>
                  <span
                    className={cn(
                      'text-sm font-pixel self-start mb-1', 
                      isCurrentDay ? 'text-primary-foreground bg-primary px-1.5 py-0.5 rounded-sm shadow-sm' : isCurrentMonth ? 'text-foreground' : 'text-muted-foreground/70'
                    )}
                  >
                    {format(day, 'd')}
                  </span>
                  <div className="space-y-1 overflow-y-auto text-xs max-h-[calc(100%-2rem)] styled-scrollbar flex-grow pr-1"> 
                    {dayEvents.slice(0, 2).map(event => {
                       const eventStyleClasses = event.color || 'bg-muted/30 border-l-muted';
                      return (
                      <div
                        key={event.id}
                        title={`${event.title} (${format(event.startTime, 'p')})`}
                        className={cn(
                            'px-1.5 py-1 rounded-sm border-l-2 text-[0.7rem] sm:text-[0.75rem] leading-tight truncate shadow-sm text-foreground',
                            eventStyleClasses, 
                            onEventClick ? 'cursor-pointer group-hover:opacity-80 hover:brightness-125 hover:shadow-lg focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none' : ''
                           )}
                        onClick={(e) => {
                            e.stopPropagation(); 
                            onEventClick?.(event);
                        }}
                        tabIndex={onEventClick ? 0 : undefined} 
                      >
                        {event.title}
                      </div>
                    )})}
                    {dayEvents.length > 2 && (
                        <div className="text-muted-foreground text-[0.65rem] sm:text-[0.7rem] mt-1 px-0.5"> 
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
    