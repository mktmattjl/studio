
'use client';

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
  dayNamesFull,
} from '@/lib/dateUtils';
import type { HourSegment } from '@/lib/dateUtils';

interface WeekCalendarGridProps {
  currentDate: Date; // Any date within the week to display
  events: PlannerEvent[];
  startHour: number; // e.g., 7 for 7 AM
  endHour: number;   // e.g., 23 for 11 PM (slots up to 23:59)
}

const HOUR_ROW_HEIGHT_REM = 3.5; // Each hour slot is 3.5rem high (approx 56px with 16px base)

export function WeekCalendarGrid({ currentDate, events, startHour, endHour }: WeekCalendarGridProps) {
  const weekDays = getWeekDays(currentDate);
  const hourSegments = getHourSegments(startHour, endHour); // Generates [{hour: 7, label: "7 AM"}, ...]

  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(event.startTime, day));
  };

  return (
    <div className="flex-grow flex flex-col border-t-2 border-l-2 border-accent bg-card text-card-foreground">
      {/* Grid container: Time column + 7 Day columns */}
      <div className="grid grid-cols-[auto_repeat(7,minmax(0,1fr))]"> {/* Time labels + 7 days */}
        {/* Header Row: Empty Top-Left + Day Names & Dates */}
        <div className="border-b-2 border-r-2 border-accent p-1 sm:p-2 text-center sticky top-0 bg-card z-10"> {/* Time col header */}
          <span className="text-xs text-muted-foreground">Time</span>
        </div>
        {weekDays.map((day, index) => (
          <div
            key={index}
            className={cn(
              "border-b-2 border-r-2 border-accent p-1 sm:p-2 text-center sticky top-0 bg-card z-10",
              isToday(day) && "bg-accent/30"
            )}
          >
            <div className="text-xs sm:text-sm text-muted-foreground">{format(day, 'EEE')}</div>
            <div className="text-sm sm:text-lg font-semibold text-primary-foreground">{format(day, 'd')}</div>
          </div>
        ))}

        {/* Hour Rows with events */}
        {hourSegments.map((segment) => (
          <React.Fragment key={segment.hour}>
            {/* Time Label Cell for current hour */}
            <div className={cn(
              "border-b-2 border-r-2 border-accent p-1 sm:p-2 text-right text-xs sm:text-sm text-muted-foreground sticky left-0 bg-card z-[5]",
              `h-[${HOUR_ROW_HEIGHT_REM}rem]` // Explicit height for time label cell
              )}
              style={{ height: `${HOUR_ROW_HEIGHT_REM}rem` }}
            >
              {segment.label}
            </div>

            {/* Day Cells for current hour */}
            {weekDays.map((day, dayIndex) => {
              const dayEvents = getEventsForDay(day);
              const eventsInThisHourSlot = dayEvents.filter(event => {
                const eventStartHour = getHours(event.startTime);
                // Check if the event STARTS in this hour slot
                return eventStartHour === segment.hour;
              });

              return (
                <div
                  key={`${segment.hour}-${dayIndex}`}
                  className={cn(
                    "border-b-2 border-r-2 border-accent relative", // Each hour slot for a day
                    isToday(day) && segment.hour === getHours(new Date()) && "bg-accent/10", // Highlight current hour on today
                    `min-h-[${HOUR_ROW_HEIGHT_REM}rem]`
                  )}
                  style={{ height: `${HOUR_ROW_HEIGHT_REM}rem` }}
                >
                  {eventsInThisHourSlot.map(event => {
                    const eventStartMinutes = getMinutes(event.startTime);
                    // Duration in minutes, ensure at least some visible height for short events
                    const durationMinutes = Math.max(30, differenceInMinutes(event.endTime, event.startTime)); 
                    
                    // Calculate top offset based on start minutes (percentage of hour slot height)
                    const topOffsetPercent = (eventStartMinutes / 60) * 100;
                    
                    // Calculate height based on duration (proportion of standard hour slot height)
                    // An event from 9:00 to 10:50 (110 mins) should span roughly 2 hour slots
                    // Each hour slot is HOUR_ROW_HEIGHT_REM.
                    // So height is (durationMinutes / 60) * HOUR_ROW_HEIGHT_REM
                    const eventHeightRem = (durationMinutes / 60) * HOUR_ROW_HEIGHT_REM;
                    
                    return (
                      <div
                        key={event.id}
                        title={`${event.title} (${format(event.startTime, 'p')} - ${format(event.endTime, 'p')})`}
                        className={cn(
                          'absolute left-0.5 right-0.5 rounded-none p-1 text-[0.6rem] sm:text-xs leading-tight overflow-hidden shadow-sm',
                          event.color || 'bg-primary/70 border-primary text-primary-foreground'
                        )}
                        style={{
                          top: `${topOffsetPercent}%`, 
                          height: `${eventHeightRem}rem`,
                          // Prevent event from exceeding bottom of its conceptual starting slot IF its too large
                          // This might need more sophisticated overlap handling later. For now, let it overflow.
                          zIndex: 10, // Ensure events are above the grid lines
                        }}
                      >
                        <p className="font-semibold truncate">{event.title}</p>
                        <p className="truncate">{format(event.startTime, 'p')} - {format(event.endTime, 'p')}</p>
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

// Helper needed in this file scope for dynamic Tailwind classes (if they were being used directly)
// For style prop, this is not strictly necessary but good practice to keep calculations clear.
const hourlyRowHeightClass = `h-[${HOUR_ROW_HEIGHT_REM}rem]`; // e.g. h-[3.5rem]
