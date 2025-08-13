
'use client';

import { ContentCard } from '@/components/ui/ContentCard';
import { format, isToday, isTomorrow, differenceInDays, isSameDay } from '@/lib/dateUtils';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';
import type { PlannerEvent } from '@/app/planner/page';
import { Progress } from '@/components/ui/progress';
import { CalendarDays } from 'lucide-react';

const eventTypeColorMap: Record<PlannerEvent['type'], string> = {
    'deadline': 'border-l-red-400',
    'meeting': 'border-l-green-400',
    'class': 'border-l-blue-400',
    'study_session': 'border-l-indigo-400',
    'exam': 'border-l-purple-400',
    'personal': 'border-l-gray-400',
};

const eventTypeProgressBgClass: Record<PlannerEvent['type'], string> = {
    'deadline': 'bg-red-400',
    'meeting': 'bg-green-400',
    'class': 'bg-blue-400',
    'study_session': 'bg-indigo-400',
    'exam': 'bg-purple-400',
    'personal': 'bg-gray-400',
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

  const groupedEvents: Record<string, PlannerEvent[]> = {
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

  const hasAnyEvents = Object.values(groupedEvents).some(group => group.length > 0);

  return (
    <ContentCard className="w-full flex flex-col" padding="p-0">
      <div className="p-4 sm:p-6 mb-0 border-b border-border">
        <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">
          {title}
        </h1>
        {subtitle && <p className="text-md text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      <div className="space-y-6 p-4 sm:p-6 flex-grow overflow-y-auto styled-scrollbar max-h-[32rem]">
        {!hasAnyEvents && (
             <div className="text-center py-10 flex-grow flex flex-col justify-center items-center h-full">
                <CalendarDays className="w-16 h-16 mx-auto text-muted-foreground/50 mb-6" />
                <h3 className="text-xl font-semibold text-foreground mb-2">It's quiet...</h3>
                <p className="text-muted-foreground">No upcoming events. Time to plan ahead or take a break.</p>
            </div>
        )}

        {Object.entries(groupedEvents).map(([groupName, groupEvents]) => {
          if (groupEvents.length === 0) return null;

          return (
            <div key={groupName}>
              <h3 className="text-lg font-semibold mb-3 border-b border-border/50 pb-2 text-foreground">
                {groupName}
                {groupName === "Today" && <span className="text-xs text-muted-foreground ml-2 font-sans">({format(today, 'EEEE, MMM d')})</span>}
              </h3>
              <ul className="space-y-3">
                {groupEvents.map((event) => {
                  const eventColorClass = eventTypeColorMap[event.type] || eventTypeColorMap.personal;
                  const displayTime = (event.type.toLowerCase() === 'deadline' || (event.startTime && event.endTime && !isSameDay(event.startTime, event.endTime)))
                      ? format(event.startTime, 'EEE, MMM d')
                      : `${format(event.startTime, 'p')} - ${format(event.endTime, 'p')}`;
                  
                  const eventProgressColor = eventTypeProgressBgClass[event.type] || 'bg-primary';
                  const mockProgress = (event.title.length % 60) + 20;

                  return (
                    <li
                      key={event.id}
                      className={cn(
                        "flex items-start gap-3 p-3.5 rounded-md border-l-4 transition-colors",
                        "bg-muted/30 hover:bg-muted/60", 
                        eventColorClass
                      )}
                      tabIndex={0}
                    >
                      <div className="flex-grow">
                        <p className="font-semibold text-foreground text-md">{event.title}</p>
                        <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                          {displayTime} - <span className="capitalize">{event.type.replace('_', ' ')}</span>
                        </p>
                        {event.description && <p className="text-xs text-muted-foreground/80 mt-1 leading-normal line-clamp-2">{event.description}</p>}
                        <div className="mt-2.5">
                          <Progress value={mockProgress} className={cn("h-1", `[&>div]:${eventProgressColor}`)} />
                        </div>
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
