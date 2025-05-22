
'use client';

import { ContentCard } from '@/components/ui/ContentCard';
import { format, isToday, isTomorrow, differenceInDays, parseISO, isSameDay } from '@/lib/dateUtils';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';
import type { PlannerEvent } from '@/app/planner/page';
import { PixelScrollIcon, PixelQuillIcon } from '@/components/icons/fantasy'; // Example icons

// Jewel tone color mapping for event types (left border)
const eventTypeColorMap: Record<PlannerEvent['type'], string> = {
    'deadline': 'border-l-[hsl(var(--destructive))]', // Ruby Red
    'meeting': 'border-l-[hsl(var(--accent))]',      // Amethyst Purple
    'class': 'border-l-[hsl(var(--primary))]',       // Sapphire Blue
    'study_session': 'border-l-[hsl(var(--secondary))]',// Emerald Green
    'exam': 'border-l-[hsl(var(--gold-accent))]',     // Gold
    'personal': 'border-l-orange-400', // A warm, non-jewel tone for personal
};

const eventTypeIcons: Record<PlannerEvent['type'], React.ElementType> = {
    'deadline': PixelQuillIcon, // Or a specific "urgent task" icon
    'meeting': PixelScrollIcon, // Or a "dialog" icon
    'class': PixelScrollIcon, // Or a "book" icon
    'study_session': PixelQuillIcon, // Or a "focus" icon
    'exam': PixelFlamingSwordIcon, // Or a "challenge" icon
    'personal': PixelHeartIcon, // Generic personal icon
};


interface DashboardAgendaViewProps {
  events: PlannerEvent[];
  title: ReactNode;
  subtitle?: string;
}

export function DashboardAgendaView({ events: rawEvents, title, subtitle }: DashboardAgendaViewProps) {
  
  const today = new Date();
  const events = rawEvents
    .filter(event => differenceInDays(event.startTime, today) >= -1) 
    .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

  if (!events || events.length === 0) {
    return (
      <ContentCard className="w-full flex flex-col" padding="p-0">
        <div className="p-4 sm:p-6 mb-0 border-b border-border">
          <h1 className="text-2xl sm:text-3xl font-pixel text-primary">
            {title}
          </h1>
          {subtitle && <p className="text-md text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        <div className="text-center py-12 flex-grow flex flex-col justify-center items-center">
          <PixelMapIcon className="w-16 h-16 mx-auto text-muted-foreground/50 mb-6" /> {/* Thematic Icon */}
          <h3 className="text-xl font-pixel text-foreground mb-2">Thy Quest Log is Empty!</h3>
          <p className="text-muted-foreground">No pressing tasks. Perhaps a moment of respite or plan new adventures?</p>
        </div>
      </ContentCard>
    );
  }

  const groupedEvents: { Today: PlannerEvent[]; Tomorrow: PlannerEvent[]; Upcoming: PlannerEvent[] } = {
    Today: [],
    Tomorrow: [],
    Upcoming: [],
  };

  events.forEach(event => {
    if (isToday(event.startTime)) {
      groupedEvents.Today.push(event);
    } else if (isTomorrow(event.startTime)) {
      groupedEvents.Tomorrow.push(event);
    } else if (differenceInDays(event.startTime, today) > 0) { 
      groupedEvents.Upcoming.push(event);
    }
  });

  return (
    <ContentCard className="w-full flex flex-col" padding="p-0">
      <div className="p-4 sm:p-6 mb-0 border-b border-border">
        <h1 className="text-2xl sm:text-3xl font-pixel text-primary">
          {title}
        </h1>
        {subtitle && <p className="text-md text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      <div className="space-y-6 p-4 sm:p-6 flex-grow overflow-y-auto styled-scrollbar max-h-[calc(100vh-20rem)] sm:max-h-[calc(100vh-22rem)] md:max-h-[60vh]">
        {Object.entries(groupedEvents).map(([groupName, groupEvents]) => {
          if (groupEvents.length === 0 && groupName !== "Today") return null; 

          return (
            <div key={groupName}>
              <h3 className="text-lg font-pixel text-secondary mb-3 border-b border-border/50 pb-2">
                {groupName}
                {groupName === "Today" && <span className="text-xs text-muted-foreground ml-2 font-sans">({format(today, 'EEEE, MMM d')})</span>}
              </h3>
              {groupEvents.length > 0 ? (
                <ul className="space-y-3">
                  {groupEvents.map((event) => {
                    const eventColorClass = eventTypeColorMap[event.type] || 'border-l-primary'; // Fallback to primary
                    const EventIcon = eventTypeIcons[event.type] || PixelScrollIcon; // Fallback icon

                    const displayTime = event.type.toLowerCase() === 'deadline' || (event.startTime && event.endTime && differenceInDays(event.endTime, event.startTime) >=1) || (event.startTime && event.endTime && !isSameDay(event.startTime, event.endTime))
                        ? format(event.startTime, 'EEE, MMM d') 
                        : `${format(event.startTime, 'p')} - ${format(event.endTime, 'p')}`;

                    return (
                      <li
                        key={event.id}
                        className={cn(
                          "flex items-start gap-3 p-3.5 bg-card-foreground/[.03] hover:bg-card-foreground/[.07] rounded-md border-l-4 transition-colors shadow-sm",
                          eventColorClass,
                          "border-2 border-transparent hover:border-accent/30" // Subtle hover border
                        )}
                      >
                        <EventIcon className="w-5 h-5 mt-0.5 text-muted-foreground" />
                        <div className="flex-grow">
                          <p className="font-semibold text-foreground text-md">{event.title}</p>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {displayTime} - <span className="capitalize">{event.type.replace('_', ' ')}</span>
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                 groupName === "Today" && (
                    <p className="text-muted-foreground text-sm py-2">Nothing decreed for today. Fortune favors the prepared!</p>
                 )
              )}
            </div>
          );
        })}
      </div>
    </ContentCard>
  );
}

    