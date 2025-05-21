
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
  condensedMode?: boolean; // New prop
}

const DEFAULT_HOUR_ROW_HEIGHT_REM = 3;
const CONDENSED_HOUR_ROW_HEIGHT_REM = 2; // Or adjust as needed

export function WeekCalendarGrid({ 
  currentDate, 
  events, 
  startHour, 
  endHour,
  onSlotClick,
  onEventClick,
  condensedMode = false,
}: WeekCalendarGridProps) {
  const weekDays = getWeekDays(currentDate); 
  const hourSegments = getHourSegments(startHour, endHour); 
  const hourRowHeightRem = condensedMode ? CONDENSED_HOUR_ROW_HEIGHT_REM : DEFAULT_HOUR_ROW_HEIGHT_REM;

  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(event.startTime, day));
  };

  return (
    <div className="flex-grow flex flex-col border-t border-l border-border rounded-b-lg bg-card text-card-foreground overflow-auto styled-scrollbar">
      <div className={cn(
          "grid min-w-[max-content]",
          condensedMode ? "grid-cols-[auto_repeat(7,minmax(0,1fr))]" : "grid-cols-[auto_repeat(7,minmax(0,1fr))]" // Adjust column template if needed for condensed
        )}>
        {/* Header Row */}
        <div className={cn(
            "border-b border-r border-border text-center sticky top-0 bg-card z-20 shadow-sm",
            condensedMode ? "p-0.5 sm:p-1" : "p-1 sm:p-2"
          )}>
          <span className={cn(
              "text-muted-foreground",
              condensedMode ? "text-[0.6rem] sm:text-xs" : "text-xs sm:text-sm"
            )}>Time</span>
        </div>
        {weekDays.map((day, index) => (
          <div
            key={index}
            className={cn(
              "border-b border-r border-border text-center sticky top-0 bg-card z-20 shadow-sm",
              condensedMode ? "p-0.5 sm:p-1 min-w-[50px] sm:min-w-[60px]" : "p-1 sm:p-2 min-w-[80px] sm:min-w-[100px]",
              isToday(day) && "bg-primary/10" 
            )}
          >
            <div className={cn(
                "text-muted-foreground",
                condensedMode ? "text-[0.6rem] sm:text-xs" : "text-xs sm:text-sm"
              )}>{format(day, 'EEE')}</div>
            <div className={cn(
                "font-semibold", 
                isToday(day) ? "text-primary" : "text-foreground",
                condensedMode ? "text-xs sm:text-sm" : "text-sm sm:text-lg"
              )}>{format(day, 'd')}</div>
          </div>
        ))}

        {/* Hour Rows */}
        {hourSegments.map((segment) => (
          <React.Fragment key={segment.hour}>
            <div className={cn(
              "border-b border-r border-border text-right text-muted-foreground sticky left-0 bg-card z-10",
              condensedMode ? "px-1 py-0.5 text-[0.55rem] sm:text-[0.6rem]" : "px-1.5 py-1 text-[0.65rem] sm:text-xs"
              )}
              style={{ height: `${hourRowHeightRem}rem` }}
            >
              {condensedMode ? segment.label.split(' ')[0] : segment.label} {/* Show only hour number in condensed */}
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
                    "border-b border-r border-border relative cursor-pointer group", 
                    condensedMode ? "min-w-[50px] sm:min-w-[60px]" : "min-w-[80px] sm:min-w-[100px]",
                    isToday(day) && segment.hour === getHours(new Date()) && "bg-primary/5", 
                    onSlotClick ? "hover:bg-muted/30 transition-colors duration-100" : ""
                  )}
                  style={{ height: `${hourRowHeightRem}rem` }}
                  onClick={() => onSlotClick?.(slotDateTime)}
                >
                  {eventsInThisHourSlot.map(event => {
                    const eventStartMinutes = getMinutes(event.startTime);
                    const durationMinutes = Math.max(15, differenceInMinutes(event.endTime, event.startTime)); 
                    const topOffsetPercent = (eventStartMinutes / 60) * 100;
                    const eventHeightRem = Math.min(
                        (durationMinutes / 60) * hourRowHeightRem,
                        (endHour + 1 - getHours(event.startTime)) * hourRowHeightRem - (getMinutes(event.startTime) / 60) * hourRowHeightRem
                    );
                    
                    return (
                      <div
                        key={event.id}
                        title={!condensedMode ? `${event.title} (${format(event.startTime, 'p')} - ${format(event.endTime, 'p')})` : event.title}
                        className={cn(
                          'absolute left-0.5 right-0.5 rounded-sm overflow-hidden shadow-md',
                          event.color, 
                          onEventClick ? 'cursor-pointer hover:brightness-110 transition-all duration-150 group-hover:shadow-lg' : '',
                          condensedMode ? "p-0.5 text-[0.55rem] sm:text-[0.6rem] leading-tight" : "p-1.5 text-[0.7rem] sm:text-xs leading-tight"
                        )}
                        style={{
                          top: `${topOffsetPercent}%`, 
                          height: `${Math.max(eventHeightRem, hourRowHeightRem / (condensedMode ? 2 : 4) )}rem`, 
                          zIndex: 10, 
                        }}
                        onClick={(e) => {
                            e.stopPropagation(); 
                            onEventClick?.(event);
                        }}
                      >
                        <p className={cn("font-semibold truncate", condensedMode && "text-[0.5rem] sm:text-[0.55rem]")}>{event.title}</p>
                        {!condensedMode && <p className="truncate hidden sm:block text-[0.65rem] opacity-90">{format(event.startTime, 'p')} - {format(event.endTime, 'p')}</p>}
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
