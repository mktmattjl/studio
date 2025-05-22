
'use client';

import React, { useState, useEffect } from 'react';
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

const DEFAULT_HOUR_ROW_HEIGHT_REM = 3;
const CONDENSED_HOUR_ROW_HEIGHT_REM = 2.75; 

export function WeekCalendarGrid({
  currentDate,
  events,
  startHour,
  endHour,
  onSlotClick,
  onEventClick,
  condensedMode = false,
  daysToDisplay,
}: WeekCalendarGridProps) {
  const daysToUse = daysToDisplay || getWeekDays(currentDate);
  const hourSegments = getHourSegments(startHour, endHour);
  const hourRowHeightRem = condensedMode ? CONDENSED_HOUR_ROW_HEIGHT_REM : DEFAULT_HOUR_ROW_HEIGHT_REM;

  const [clientCurrentHour, setClientCurrentHour] = useState<number | null>(null);

  useEffect(() => {
    setClientCurrentHour(getHours(new Date()));
    const timerId = setInterval(() => {
      setClientCurrentHour(getHours(new Date()));
    }, 60000); 
    return () => clearInterval(timerId); 
  }, []);


  const getEventsForDay = (day: Date) => {
    return events.filter(event => event.startTime && isSameDay(event.startTime, day));
  };

  return (
    <div className="flex-grow flex flex-col border-t border-l border-border rounded-b-md bg-card text-card-foreground overflow-auto styled-scrollbar">
      <div
        className={cn("grid min-w-[max-content]")}
        style={{ gridTemplateColumns: `auto repeat(${daysToUse.length}, minmax(0, 1fr))` }}
      >
        {/* Header Row */}
        <div className={cn(
            "border-b border-r border-border text-center sticky top-0 bg-card z-20 shadow-sm",
            condensedMode ? "p-1" : "p-1 sm:p-2" 
          )}>
          <span className={cn(
              "text-muted-foreground font-pixel", 
              condensedMode ? "text-[0.65rem] sm:text-[0.7rem]" : "text-xs sm:text-sm"
            )}>Time</span>
        </div>
        {daysToUse.map((day, index) => (
          <div
            key={index}
            className={cn(
              "border-b border-r border-border text-center sticky top-0 bg-card z-20 shadow-sm",
              condensedMode ? "p-1 min-w-[50px] sm:min-w-[60px]" : "p-1 sm:p-2 min-w-[70px] sm:min-w-[90px]", 
              isToday(day) && "bg-primary/20 ring-1 ring-inset ring-primary" 
            )}
          >
            <div className={cn(
                "text-muted-foreground font-pixel", 
                condensedMode ? "text-[0.65rem] sm:text-[0.7rem]" : "text-xs sm:text-sm"
              )}>{format(day, 'EEE')}</div>
            <div className={cn(
                "font-pixel",
                isToday(day) ? "text-primary font-semibold" : "text-foreground font-medium",
                condensedMode ? "text-[0.75rem] sm:text-[0.85rem]" : "text-sm sm:text-lg"
              )}>{format(day, 'd')}</div>
          </div>
        ))}

        {/* Hour Rows */}
        {hourSegments.map((segment) => (
          <React.Fragment key={segment.hour}>
            <div className={cn(
              "border-b border-r border-border text-right text-muted-foreground sticky left-0 bg-card z-10 font-pixel", 
              condensedMode ? "px-1 py-0.5 text-[0.6rem] sm:text-[0.65rem]" : "px-1.5 py-1 text-[0.7rem] sm:text-xs" 
              )}
              style={{ height: `${hourRowHeightRem}rem` }}
            >
              {condensedMode ? segment.label.split(' ')[0] : segment.label}
            </div>

            {daysToUse.map((day, dayIndex) => {
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
                    "border-b border-r border-border relative group",
                    condensedMode ? "min-w-[50px] sm:min-w-[60px]" : "min-w-[70px] sm:min-w-[90px]",
                    // Highlight current hour on today with primary accent
                    isToday(day) && clientCurrentHour !== null && segment.hour === clientCurrentHour && "bg-primary/10",
                    onSlotClick ? "cursor-pointer hover:bg-card/80 transition-colors duration-100 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none" : "hover:bg-card/90"
                  )}
                  style={{ height: `${hourRowHeightRem}rem` }}
                  onClick={() => onSlotClick?.(slotDateTime)}
                  tabIndex={onSlotClick ? 0 : undefined} 
                >
                  {eventsInThisHourSlot.map(event => {
                    const eventStartMinutes = getMinutes(event.startTime);
                    const topOffsetPercent = (eventStartMinutes / 60) * 100;
                    
                    const durationMinutes = event.endTime ? Math.max(15, differenceInMinutes(event.endTime, event.startTime)) : 60; 
                    
                    const eventHeightRem = Math.min(
                        (durationMinutes / 60) * hourRowHeightRem,
                        (endHour + 1 - getHours(event.startTime)) * hourRowHeightRem - (getMinutes(event.startTime) / 60) * hourRowHeightRem
                    );

                    const eventStyleClasses = event.color || 'bg-muted/30 border-l-muted'; // Event.color has bg and border

                    return (
                      <div
                        key={event.id}
                        title={!condensedMode ? `${event.title} (${format(event.startTime, 'p')} - ${event.endTime ? format(event.endTime, 'p'): ''})` : event.title}
                        className={cn(
                          'absolute left-0.5 right-0.5 rounded-sm overflow-hidden shadow-md text-foreground border-l-4', 
                           eventStyleClasses, 
                           onEventClick ? 'cursor-pointer hover:brightness-125 hover:shadow-lg transition-all duration-150 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none' : '',
                           condensedMode ? "p-0.5 text-[0.6rem] sm:text-[0.65rem] leading-tight" : "p-1.5 text-[0.7rem] sm:text-xs leading-tight"
                        )}
                        style={{
                          top: `${topOffsetPercent}%`,
                          height: `${Math.max(eventHeightRem, hourRowHeightRem / (condensedMode ? 2.5 : 4) )}rem`, 
                          zIndex: 10,
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onEventClick?.(event);
                        }}
                        tabIndex={onEventClick ? 0 : undefined} 
                      >
                        <p className={cn("font-semibold truncate", condensedMode && "text-[0.55rem] sm:text-[0.6rem]")}>{event.title}</p>
                        {!condensedMode && event.endTime && <p className="truncate hidden sm:block text-[0.65rem] opacity-80">{format(event.startTime, 'p')} - {format(event.endTime, 'p')}</p>}
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
    