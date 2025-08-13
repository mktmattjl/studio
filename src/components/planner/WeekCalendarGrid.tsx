
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

const DEFAULT_HOUR_ROW_HEIGHT_REM = 3.5;
const CONDENSED_HOUR_ROW_HEIGHT_REM = 2.75; 

interface WeekCalendarGridProps {
  currentDate: Date;
  events: PlannerEvent[];
  startHour: number;
  endHour: number;
  onSlotClick?: (dateTime: Date) => void;
  onEventClick?: (event: PlannerEvent) => void;
  condensedMode?: boolean;
  daysToDisplay?: Date[];
}

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

  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); 
    return () => clearInterval(timerId); 
  }, []);

  const getEventsForDay = (day: Date) => {
    return events.filter(event => event.startTime && isSameDay(event.startTime, day));
  };
  
  const calculateCurrentTimePosition = (now: Date) => {
      const currentHour = getHours(now);
      const currentMinutes = getMinutes(now);
      if(currentHour >= startHour && currentHour <= endHour) {
          const totalMinutesInView = (endHour - startHour + 1) * 60;
          const minutesFromStart = (currentHour - startHour) * 60 + currentMinutes;
          return (minutesFromStart / totalMinutesInView) * (hourSegments.length * hourRowHeightRem) + 'rem';
      }
      return null;
  }

  return (
    <div className="flex-grow flex flex-col border-t border-l border-border rounded-b-md bg-card text-card-foreground overflow-auto styled-scrollbar">
      <div
        className={cn("grid min-w-[max-content]")}
        style={{ gridTemplateColumns: `auto repeat(${daysToUse.length}, minmax(0, 1fr))` }}
      >
        {/* Header Row */}
        <div className="border-b border-r border-border text-center sticky top-0 bg-card z-20 shadow-sm p-1 sm:p-2">
          <span className="text-muted-foreground font-semibold text-xs sm:text-sm">Time</span>
        </div>
        {daysToUse.map((day, index) => (
          <div
            key={index}
            className={cn(
              "border-b border-r border-border text-center sticky top-0 bg-card z-20 shadow-sm",
              condensedMode ? "p-1 min-w-[50px] sm:min-w-[60px]" : "p-1 sm:p-2 min-w-[70px] sm:min-w-[90px]", 
              isToday(day) && "bg-secondary/30" 
            )}
          >
            <div className={cn(
                "text-muted-foreground font-semibold", 
                condensedMode ? "text-[0.65rem] sm:text-[0.7rem]" : "text-xs sm:text-sm"
              )}>{format(day, 'EEE')}</div>
            <div className={cn(
                "font-semibold",
                isToday(day) ? "text-primary" : "text-foreground",
                condensedMode ? "text-[0.75rem] sm:text-lg" : "text-sm sm:text-lg"
              )}>{format(day, 'd')}</div>
          </div>
        ))}

        {/* Hour Rows */}
        {hourSegments.map((segment) => (
          <React.Fragment key={segment.hour}>
            <div className={cn(
              "border-b border-r border-border text-right text-muted-foreground sticky left-0 bg-card z-10 font-semibold", 
              condensedMode ? "px-1 py-0.5 text-[0.6rem] sm:text-[0.65rem]" : "px-1.5 py-1 text-xs" 
              )}
              style={{ height: `${hourRowHeightRem}rem` }}
            >
              {segment.label}
            </div>

            {daysToUse.map((day, dayIndex) => {
              const slotDateTime = setSeconds(setMinutes(setHours(day, segment.hour), 0),0);
              const dayEvents = getEventsForDay(day);
              const eventsInThisHourSlot = dayEvents.filter(event => getHours(event.startTime) === segment.hour);

              return (
                <div
                  key={`${segment.hour}-${dayIndex}`}
                  className={cn(
                    "border-b border-r border-border relative",
                    condensedMode ? "min-w-[50px] sm:min-w-[60px]" : "min-w-[70px] sm:min-w-[90px]",
                    onSlotClick ? "cursor-pointer hover:bg-muted/40 transition-colors duration-100 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none" : "hover:bg-muted/30"
                  )}
                  style={{ height: `${hourRowHeightRem}rem` }}
                  onClick={() => onSlotClick?.(slotDateTime)}
                  tabIndex={onSlotClick ? 0 : undefined} 
                >
                  {isToday(day) && currentTime && getHours(currentTime) === segment.hour && (
                     <div className="absolute w-full border-t-2 border-red-500 z-20" style={{top: `${(getMinutes(currentTime) / 60) * 100}%`}}>
                         <div className="w-2 h-2 bg-red-500 rounded-full -mt-1 -ml-1"></div>
                     </div>
                  )}

                  {eventsInThisHourSlot.map(event => {
                    const topOffsetPercent = (getMinutes(event.startTime) / 60) * 100;
                    const durationMinutes = event.endTime ? Math.max(15, differenceInMinutes(event.endTime, event.startTime)) : 60; 
                    const eventHeightRem = (durationMinutes / 60) * hourRowHeightRem;

                    const eventStyleClasses = event.color || 'bg-muted/30 border-l-muted';

                    return (
                      <div
                        key={event.id}
                        title={`${event.title} (${format(event.startTime, 'p')} - ${event.endTime ? format(event.endTime, 'p'): ''})`}
                        className={cn(
                          'absolute left-0.5 right-0.5 rounded-md overflow-hidden shadow text-white border-l-4',
                           eventStyleClasses, 
                           onEventClick ? 'cursor-pointer hover:brightness-125 hover:shadow-lg transition-all duration-150 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none' : '',
                           condensedMode ? "p-1 text-[0.65rem] leading-tight" : "p-1.5 text-xs leading-tight"
                        )}
                        style={{
                          top: `${topOffsetPercent}%`,
                          height: `${eventHeightRem}rem`,
                          zIndex: 10,
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onEventClick?.(event);
                        }}
                        tabIndex={onEventClick ? 0 : undefined} 
                      >
                        <p className={cn(
                          "font-bold truncate",
                          condensedMode && "text-[0.6rem]"
                          )}>{event.title}</p>
                        {!condensedMode && event.endTime && <p className="truncate opacity-80">{format(event.startTime, 'p')} - {format(event.endTime, 'p')}</p>}
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
