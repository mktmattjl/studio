
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
  currentDate: Date; 
  events: PlannerEvent[];
  startHour: number; 
  endHour: number;   
  onSlotClick?: (dateTime: Date) => void;
  onEventClick?: (event: PlannerEvent) => void;
}

const HOUR_ROW_HEIGHT_REM = 3; // Kept compact

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
    <div className="flex-grow flex flex-col border-t border-l border-border rounded-b-lg bg-card text-card-foreground overflow-auto styled-scrollbar">
      <div className="grid grid-cols-[auto_repeat(7,minmax(0,1fr))] min-w-[max-content]">
        {/* Header Row */}
        <div className="border-b border-r border-border p-1 sm:p-2 text-center sticky top-0 bg-card z-20 shadow-sm">
          <span className="text-xs text-muted-foreground">Time</span>
        </div>
        {weekDays.map((day, index) => (
          <div
            key={index}
            className={cn(
              "border-b border-r border-border p-1 sm:p-2 text-center sticky top-0 bg-card z-20 shadow-sm min-w-[80px] sm:min-w-[100px]",
              isToday(day) && "bg-primary/10" // Today highlight uses primary accent
            )}
          >
            <div className="text-xs sm:text-sm text-muted-foreground">{format(day, 'EEE')}</div>
            <div className={cn("text-sm sm:text-lg font-semibold", isToday(day) ? "text-primary" : "text-foreground")}>{format(day, 'd')}</div>
          </div>
        ))}

        {/* Hour Rows */}
        {hourSegments.map((segment) => (
          <React.Fragment key={segment.hour}>
            <div className={cn(
              "border-b border-r border-border px-1.5 py-1 text-right text-[0.65rem] sm:text-xs text-muted-foreground sticky left-0 bg-card z-10", // Smaller padding/text
              )}
              style={{ height: `${HOUR_ROW_HEIGHT_REM}rem` }}
            >
              {segment.label}
            </div>

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
                    "border-b border-r border-border relative cursor-pointer min-w-[80px] sm:min-w-[100px] group", 
                    isToday(day) && segment.hour === getHours(new Date()) && "bg-primary/5", // Very subtle current hour highlight
                    "hover:bg-muted/30 transition-colors duration-100"
                  )}
                  style={{ height: `${HOUR_ROW_HEIGHT_REM}rem` }}
                  onClick={() => onSlotClick?.(slotDateTime)}
                >
                  {eventsInThisHourSlot.map(event => {
                    const eventStartMinutes = getMinutes(event.startTime);
                    const durationMinutes = Math.max(15, differenceInMinutes(event.endTime, event.startTime)); 
                    const topOffsetPercent = (eventStartMinutes / 60) * 100;
                    const eventHeightRem = Math.min(
                        (durationMinutes / 60) * HOUR_ROW_HEIGHT_REM,
                        (endHour + 1 - getHours(event.startTime)) * HOUR_ROW_HEIGHT_REM - (getMinutes(event.startTime) / 60) * HOUR_ROW_HEIGHT_REM
                    );
                    
                    return (
                      <div
                        key={event.id}
                        title={`${event.title} (${format(event.startTime, 'p')} - ${format(event.endTime, 'p')})`}
                        className={cn(
                          'absolute left-0.5 right-0.5 rounded-md p-1.5 text-[0.7rem] sm:text-xs leading-tight overflow-hidden shadow-md',
                          event.color, // Use pre-assigned color
                          'cursor-pointer hover:brightness-110 transition-all duration-150 group-hover:shadow-lg'
                        )}
                        style={{
                          top: `${topOffsetPercent}%`, 
                          height: `${Math.max(eventHeightRem, HOUR_ROW_HEIGHT_REM / 4)}rem`, 
                          zIndex: 10, 
                        }}
                        onClick={(e) => {
                            e.stopPropagation(); 
                            onEventClick?.(event);
                        }}
                      >
                        <p className="font-semibold truncate">{event.title}</p>
                        <p className="truncate hidden sm:block text-[0.65rem] opacity-90">{format(event.startTime, 'p')} - {format(event.endTime, 'p')}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
