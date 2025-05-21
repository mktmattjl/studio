
'use client';

import React from 'react';
import type { PlannerEvent } from '@/app/planner/page';
import { cn } from '@/lib/utils';
import { 
  getWeekDays, 
  getHourSegments, 
  format, 
  isSameDay, 
  getHours, 
  getMinutes,
  differenceInMinutes,
  isToday,
  setHours,
  setMinutes,
  setSeconds,
} from '@/lib/dateUtils';
import type { HourSegment } from '@/lib/dateUtils';

interface WeekCalendarGridProps {
  currentDate: Date; // Any date within the week to display
  events: PlannerEvent[];
  startHour: number; // e.g., 7 for 7 AM
  endHour: number;   // e.g., 23 for 11 PM (slots up to 23:59)
  onSlotClick?: (dateTime: Date) => void;
  onEventClick?: (event: PlannerEvent) => void;
}

const HOUR_ROW_HEIGHT_REM = 3.5; // Each hour slot is 3.5rem high (approx 56px with 16px base)

export function WeekCalendarGrid({ 
  currentDate, 
  events, 
  startHour, 
  endHour,
  onSlotClick,
  onEventClick 
}: WeekCalendarGridProps) {
  const weekDays = getWeekDays(currentDate); 
  const hourSegments = getHourSegments(startHour, endHour); 

  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(event.startTime, day));
  };

  return (
    <div className="flex-grow flex flex-col border-t-2 border-l-2 border-accent bg-card text-card-foreground overflow-auto styled-scrollbar-week">
      {/* Grid container: Time column + 7 Day columns */}
      <div className="grid grid-cols-[auto_repeat(7,minmax(0,1fr))] min-w-[max-content]"> {/* Time labels + 7 days */}
        {/* Header Row: Empty Top-Left + Day Names & Dates */}
        <div className="border-b-2 border-r-2 border-accent p-1 sm:p-2 text-center sticky top-0 bg-card z-20"> {/* Time col header */}
          <span className="text-xs text-muted-foreground">Time</span>
        </div>
        {weekDays.map((day, index) => (
          <div
            key={index}
            className={cn(
              "border-b-2 border-r-2 border-accent p-1 sm:p-2 text-center sticky top-0 bg-card z-20 min-w-[80px] sm:min-w-[100px]",
              isToday(day) && "bg-accent/30 ring-1 ring-inset ring-accent" // Enhanced today highlight
            )}
          >
            <div className="text-xs sm:text-sm text-muted-foreground">{format(day, 'EEE')}</div>
            <div className={cn("text-sm sm:text-lg font-semibold", isToday(day) ? "text-accent-foreground" : "text-primary-foreground")}>{format(day, 'd')}</div>
          </div>
        ))}

        {/* Hour Rows with events */}
        {hourSegments.map((segment) => (
          <React.Fragment key={segment.hour}>
            {/* Time Label Cell for current hour */}
            <div className={cn(
              "border-b-2 border-r-2 border-accent p-1 pr-2 sm:p-2 text-right text-xs sm:text-sm text-muted-foreground sticky left-0 bg-card z-10",
              )}
              style={{ height: `${HOUR_ROW_HEIGHT_REM}rem` }}
            >
              {segment.label}
            </div>

            {/* Day Cells for current hour */}
            {weekDays.map((day, dayIndex) => {
              const slotDateTime = setSeconds(setMinutes(setHours(day, segment.hour), 0),0);
              const dayEvents = getEventsForDay(day);
              const eventsInThisHourSlot = dayEvents.filter(event => {
                const eventStartHour = getHours(event.startTime);
                return eventStartHour === segment.hour;
              });

              return (
                <div
                  key={`${segment.hour}-${dayIndex}`}
                  className={cn(
                    "border-b-2 border-r-2 border-accent relative cursor-pointer min-w-[80px] sm:min-w-[100px]", 
                    isToday(day) && segment.hour === getHours(new Date()) && "bg-accent/10",
                    "hover:bg-accent/10 transition-colors duration-100" // Subtle hover for empty slots
                  )}
                  style={{ height: `${HOUR_ROW_HEIGHT_REM}rem` }}
                  onClick={() => onSlotClick?.(slotDateTime)}
                >
                  {eventsInThisHourSlot.map(event => {
                    const eventStartMinutes = getMinutes(event.startTime);
                    const durationMinutes = Math.max(15, differenceInMinutes(event.endTime, event.startTime)); 
                    const topOffsetPercent = (eventStartMinutes / 60) * 100;
                    // Calculate height ensuring it's at least a quarter of an hour, but not exceeding the remaining space in the day view if event spans overnight (simple version for now)
                    const eventHeightRem = Math.min(
                        (durationMinutes / 60) * HOUR_ROW_HEIGHT_REM,
                        (endHour + 1 - getHours(event.startTime)) * HOUR_ROW_HEIGHT_REM - (getMinutes(event.startTime) / 60) * HOUR_ROW_HEIGHT_REM
                    );
                    
                    return (
                      <div
                        key={event.id}
                        title={`${event.title} (${format(event.startTime, 'p')} - ${format(event.endTime, 'p')})`}
                        className={cn(
                          'absolute left-0.5 right-0.5 rounded-none p-1 text-[0.6rem] sm:text-xs leading-tight overflow-hidden',
                          event.color || 'bg-primary/70 border-primary text-primary-foreground', // Event specific color
                          'shadow-[1px_1px_0px_hsl(var(--primary))]', // Pixel shadow for event
                          'cursor-pointer hover:opacity-80 transition-opacity'
                        )}
                        style={{
                          top: `${topOffsetPercent}%`, 
                          height: `${Math.max(eventHeightRem, HOUR_ROW_HEIGHT_REM / 4)}rem`, 
                          zIndex: 10, 
                        }}
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent slot click from firing
                            onEventClick?.(event);
                        }}
                      >
                        <p className="font-semibold truncate">{event.title}</p>
                        <p className="truncate hidden sm:block">{format(event.startTime, 'p')} - {format(event.endTime, 'p')}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
      <style jsx>{`
        .styled-scrollbar-week::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .styled-scrollbar-week::-webkit-scrollbar-thumb {
          background: hsl(var(--accent) / 0.6);
          border-radius: 0px;
        }
        .styled-scrollbar-week::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--accent));
        }
        .styled-scrollbar-week::-webkit-scrollbar-track {
          background: hsl(var(--background) / 0.5);
        }
      `}</style>
    </div>
  );
}
