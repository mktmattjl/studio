
'use client';

import { ContentCard } from '@/components/ui/ContentCard';
import { format, isToday, isTomorrow, differenceInDays, isSameDay } from '@/lib/dateUtils';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';
import type { PlannerEvent } from '@/app/planner/page';
import {
    PixelScrollIcon,
    PixelQuillIcon,
    PixelHeartIcon,
    PixelFlamingSwordIcon 
} from '@/components/icons/fantasy';


// Color mapping for event types (left border) using Heroic Fantasy Theme
const eventTypeColorMap: Record<PlannerEvent['type'], string> = {
    'deadline': 'border-l-destructive', // Ruby Red
    'meeting': 'border-l-secondary', // WAS: border-l-[hsl(var(--text-accent-thematic))] NOW: Emerald Green
    'class': 'border-l-secondary', // WAS: border-l-[hsl(var(--text-accent-thematic))] NOW: Emerald Green
    'study_session': 'border-l-secondary', // Emerald Green (Secondary Accent)
    'exam': 'border-l-destructive', // Ruby Red
    'personal': 'border-l-secondary', // Emerald Green (Secondary Accent)
};

interface DashboardAgendaViewProps {
  events: PlannerEvent[];
  title: ReactNode;
  subtitle?: string;
}

export function DashboardAgendaView({ events: rawEvents, title, subtitle }: DashboardAgendaViewProps) {

  const today = new Date();
  const events = rawEvents
    .filter(event => event.startTime && differenceInDays(event.startTime, today) >= -1)
    .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

  const groupedEvents: { Today: PlannerEvent[]; Tomorrow: PlannerEvent[]; Upcoming: PlannerEvent[] } = {
    Today: [],
    Tomorrow: [],
    Upcoming: [],
  };

  events.forEach(event => {
    if (event.startTime && isToday(event.startTime)) {
      groupedEvents.Today.push(event);
    } else if (event.startTime && isTomorrow(event.startTime)) {
      groupedEvents.Tomorrow.push(event);
    } else if (event.startTime && differenceInDays(event.startTime, today) > 0) {
      groupedEvents.Upcoming.push(event);
    }
  });

  const hasAnyEvents = groupedEvents.Today.length > 0 || groupedEvents.Tomorrow.length > 0 || groupedEvents.Upcoming.length > 0;


  return (
    <ContentCard className="w-full flex flex-col" padding="p-0">
      <div className="p-4 sm:p-6 mb-0 border-b-2 border-border">
        <h1 className="text-2xl sm:text-3xl font-pixel text-foreground">
          {title}
        </h1>
        {subtitle && <p className="text-md text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      <div className="space-y-6 p-4 sm:p-6 flex-grow overflow-y-auto styled-scrollbar max-h-[32rem]">
        {!hasAnyEvents && (
             <div className="text-center py-10 flex-grow flex flex-col justify-center items-center h-full">
                <PixelScrollIcon className="w-16 h-16 mx-auto text-muted-foreground/50 mb-6 font-pixel" />
                <h3 className="text-xl font-pixel text-foreground mb-2">Thy Quest Log is Empty!</h3>
                <p className="text-muted-foreground font-pixel">No pressing tasks. Perhaps a moment of respite or plan new adventures?</p>
            </div>
        )}

        {Object.entries(groupedEvents).map(([groupName, groupEvents], groupIndex) => {
          if (groupEvents.length === 0) return null;

          const isFirstTodayTask = groupIndex === 0 && groupName === "Today" && groupEvents.length > 0;

          return (
            <div key={groupName}>
              <h3 className={cn(
                "text-lg font-pixel mb-3 border-b border-border/50 pb-2",
                 groupName === "Today" ? "text-[hsl(var(--text-accent-thematic))]" : "text-[hsl(var(--text-accent-thematic))]" // All headers use thematic text accent
                )}>
                {groupName}
                {groupName === "Today" && <span className="text-xs text-muted-foreground ml-2 font-sans">({format(today, 'EEEE, MMM d')})</span>}
              </h3>
              <ul className="space-y-3">
                {groupEvents.map((event, eventIndex) => {
                  const eventColorClass = eventTypeColorMap[event.type] || eventTypeColorMap.personal;
                  const displayTime = (event.type.toLowerCase() === 'deadline' || (event.startTime && event.endTime && !isSameDay(event.startTime, event.endTime)))
                      ? format(event.startTime, 'EEE, MMM d')
                      : `${format(event.startTime, 'p')} - ${format(event.endTime, 'p')}`;

                  const isKeyTask = isFirstTodayTask && eventIndex === 0;

                  return (
                    <li
                      key={event.id}
                      className={cn(
                        "flex items-start gap-3 p-3.5 rounded-md border-l-4 transition-colors shadow-sm focus-within:ring-2 focus-within:ring-ring focus-visible:outline-none",
                        "bg-black/[.05] hover:bg-muted/30", // Background for task items
                        eventColorClass,
                        isKeyTask && "border-primary ring-1 ring-primary/50", 
                        "border-2 border-transparent hover:border-accent/30",
                         "focus-visible:border-accent focus-visible:bg-accent/10"
                      )}
                      tabIndex={0}
                    >
                      <div className="flex-grow">
                        <p className="font-semibold text-foreground text-md font-pixel">{event.title}</p>
                        <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                          {displayTime} - <span className="capitalize">{event.type.replace('_', ' ')}</span>
                        </p>
                        {event.description && <p className="text-xs text-muted-foreground/80 mt-1 leading-normal line-clamp-2">{event.description}</p>}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </ContentCard>
  );
}
    
