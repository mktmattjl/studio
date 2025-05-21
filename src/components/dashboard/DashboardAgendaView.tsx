
'use client';

import { ContentCard } from '@/components/ui/ContentCard';
import { format, isToday, isTomorrow, parseISO, differenceInDays } from '@/lib/dateUtils';
import { cn } from '@/lib/utils';
import { PixelCalendarIcon } from '@/components/icons/PixelCalendarIcon';
import type { ReactNode } from 'react';

interface EventItem {
  id: string;
  title: string;
  date: string; // ISO string 'YYYY-MM-DD' or full ISO datetime
  type: string; // 'Deadline', 'Meeting', 'Study Session', etc.
  parsedDate: Date; // Added parsedDate to avoid parsing in render
}

interface DashboardAgendaViewProps {
  events: Omit<EventItem, 'parsedDate'>[]; // Accept events without pre-parsed date
  title: ReactNode;
  subtitle?: string;
}

// Cyberpunk Neon Theme color mapping for event types
const eventTypeColorMap: Record<string, string> = {
    'Deadline': 'border-l-[hsl(var(--destructive))]',
    'Meeting': 'border-l-[hsl(var(--secondary))]', 
    'Class': 'border-l-[hsl(var(--secondary))]',
    'Study Session': 'border-l-[hsl(var(--chart-3))]', 
    'Exam': 'border-l-[hsl(var(--chart-4))]',
    'Default': 'border-l-[hsl(var(--primary))]',
};


export function DashboardAgendaView({ events: rawEvents, title, subtitle }: DashboardAgendaViewProps) {
  
  const today = new Date();
  const events = rawEvents
    .map(event => ({ ...event, parsedDate: parseISO(event.date) }))
    .filter(event => differenceInDays(event.parsedDate, today) >= -1) 
    .sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime());

  if (!events || events.length === 0) {
    return (
      <ContentCard>
        <div className="mb-5">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">
            {title}
          </h1>
          {subtitle && <p className="text-md text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        <div className="text-center py-12">
          <PixelCalendarIcon className="w-12 h-12 mx-auto text-muted-foreground/50 mb-6" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No Upcoming Events</h3>
          <p className="text-muted-foreground">Your schedule is clear for now! Add some tasks in the planner.</p>
        </div>
      </ContentCard>
    );
  }

  const groupedEvents: { Today: EventItem[]; Tomorrow: EventItem[]; Upcoming: EventItem[] } = {
    Today: [],
    Tomorrow: [],
    Upcoming: [],
  };

  events.forEach(event => {
    if (isToday(event.parsedDate)) {
      groupedEvents.Today.push(event);
    } else if (isTomorrow(event.parsedDate)) {
      groupedEvents.Tomorrow.push(event);
    } else if (differenceInDays(event.parsedDate, today) > 0) { 
      groupedEvents.Upcoming.push(event);
    }
  });

  return (
    <ContentCard className="w-full flex flex-col" padding="p-0"> {/* Changed padding to p-0 */}
      <div className="p-4 sm:p-6 mb-0 border-b border-border"> {/* Header/Title Area */}
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">
          {title}
        </h1>
        {subtitle && <p className="text-md text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      <div className="space-y-6 p-4 sm:p-6 flex-grow overflow-y-auto styled-scrollbar max-h-[calc(100vh-20rem)] sm:max-h-[calc(100vh-22rem)] md:max-h-[60vh]"> {/* Scrollable content area with max-h */}
        {Object.entries(groupedEvents).map(([groupName, groupEvents]) => {
          if (groupEvents.length === 0 && groupName !== "Today") return null; 

          return (
            <div key={groupName}>
              <h3 className="text-lg font-medium text-primary mb-3 border-b border-border pb-2">
                {groupName}
                {groupName === "Today" && <span className="text-xs text-muted-foreground ml-2">({format(today, 'EEEE, MMM d')})</span>}
              </h3>
              {groupEvents.length > 0 ? (
                <ul className="space-y-3">
                  {groupEvents.map((event) => {
                    const eventColorClass = eventTypeColorMap[event.type] || eventTypeColorMap.Default;
                    return (
                      <li
                        key={event.id}
                        className={cn(
                          "flex items-start gap-3 p-3.5 bg-card-foreground/[.03] hover:bg-card-foreground/[.07] rounded-md border-l-4 transition-colors shadow-sm",
                          eventColorClass
                        )}
                      >
                        <div className="flex-grow">
                          <p className="font-semibold text-foreground text-md">{event.title}</p>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {format(event.parsedDate, (groupName === "Today" || groupName === "Tomorrow") && !event.type.toLowerCase().includes('deadline') ? 'p' : 'EEE, MMM d, p')} - {event.type}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                 groupName === "Today" && (
                    <p className="text-muted-foreground text-sm py-2">Nothing scheduled for today. Enjoy your day or plan ahead!</p>
                 )
              )}
            </div>
          );
        })}
      </div>
    </ContentCard>
  );
}
