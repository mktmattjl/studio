
'use client';

import { ContentCard } from '@/components/ui/ContentCard';
import { format, isToday, isTomorrow, differenceInDays, isSameDay } from '@/lib/dateUtils';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';
import type { PlannerEvent } from '@/app/planner/page';
import { 
    PixelScrollIcon, 
    PixelQuillIcon, 
    PixelMapIcon, 
    PixelHeartIcon, 
    PixelFlamingSwordIcon 
} from '@/components/icons/fantasy'; 

// Grayscale color mapping for event types (left border)
const eventTypeColorMap: Record<PlannerEvent['type'], string> = {
    'deadline': 'border-l-destructive', // Kept red for high importance
    'meeting': 'border-l-primary',      // Light Grey
    'class': 'border-l-primary',          // Light Grey
    'study_session': 'border-l-secondary',  // Medium Grey
    'exam': 'border-l-destructive', // Kept red for high importance
    'personal': 'border-l-muted',        // Muted Dark Grey
};

const eventTypeIcons: Record<PlannerEvent['type'], React.ElementType> = {
    'deadline': PixelQuillIcon,
    'meeting': PixelScrollIcon, 
    'class': PixelScrollIcon, 
    'study_session': PixelQuillIcon,
    'exam': PixelFlamingSwordIcon, 
    'personal': PixelHeartIcon,
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
      <div className="p-4 sm:p-6 mb-0 border-b border-border">
        {/* Title uses .font-pixel and --foreground color */}
        <h1 className="text-2xl sm:text-3xl font-pixel text-foreground"> 
          {title}
        </h1>
        {subtitle && <p className="text-md text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      <div className="space-y-6 p-4 sm:p-6 flex-grow overflow-y-auto styled-scrollbar max-h-[calc(100vh-20rem)] sm:max-h-[calc(100vh-22rem)] md:max-h-[60vh]">
        {!hasAnyEvents && (
             <div className="text-center py-10 flex-grow flex flex-col justify-center items-center">
                <PixelMapIcon className="w-16 h-16 mx-auto text-muted-foreground/50 mb-6" />
                <h3 className="text-xl font-pixel text-foreground mb-2">Thy Quest Log is Empty!</h3>
                <p className="text-muted-foreground">No pressing tasks. Perhaps a moment of respite or plan new adventures?</p>
            </div>
        )}

        {Object.entries(groupedEvents).map(([groupName, groupEvents]) => {
          if (groupEvents.length === 0) return null; 

          return (
            <div key={groupName}>
              {/* Group Name uses .font-pixel and --foreground color */}
              <h3 className="text-lg font-pixel text-foreground mb-3 border-b border-border/50 pb-2">
                {groupName}
                {groupName === "Today" && <span className="text-xs text-muted-foreground ml-2 font-sans">({format(today, 'EEEE, MMM d')})</span>}
              </h3>
              <ul className="space-y-3">
                {groupEvents.map((event) => {
                  const eventColorClass = eventTypeColorMap[event.type] || 'border-l-muted';
                  const EventIcon = eventTypeIcons[event.type] || PixelScrollIcon;

                  const displayTime = event.type.toLowerCase() === 'deadline' || (event.startTime && event.endTime && !isSameDay(event.startTime, event.endTime))
                      ? format(event.startTime, 'EEE, MMM d') 
                      : `${format(event.startTime, 'p')} - ${format(event.endTime, 'p')}`;

                  return (
                    <li
                      key={event.id}
                      className={cn(
                        "flex items-start gap-3 p-3.5 rounded-md border-l-4 transition-colors shadow-sm", 
                        "bg-black/[.05] hover:bg-black/[.10]", // Subtle dark background for items
                        eventColorClass,
                        "border-2 border-transparent hover:border-accent/30 focus-within:ring-2 focus-within:ring-ring" 
                      )}
                      tabIndex={0} 
                    >
                      <EventIcon className="w-6 h-6 mt-0.5 text-muted-foreground shrink-0" /> 
                      <div className="flex-grow">
                        <p className="font-semibold text-foreground text-md">{event.title}</p>
                        <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed"> 
                          {displayTime} - <span className="capitalize">{event.type.replace('_', ' ')}</span>
                        </p>
                        {event.description && <p className="text-xs text-muted-foreground/80 mt-1 leading-normal">{event.description}</p>}
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
    
