
'use client';

import { ContentCard } from '@/components/ui/ContentCard';
import { format, isToday, isTomorrow, parseISO, differenceInDays } from '@/lib/dateUtils';
import { cn } from '@/lib/utils';
import { PixelCalendarIcon } from '@/components/icons/PixelCalendarIcon';
// Note: Specific event type icons (PixelAlertTriangleIcon, PixelBookIcon, PixelLightningIcon) are not used here
// to simplify and rely on border colors for differentiation, matching the current design.

interface EventItem {
  id: string;
  title: string;
  date: string; // ISO string 'YYYY-MM-DD' or full ISO datetime
  type: string; // 'Deadline', 'Meeting', 'Study Session', etc.
}

interface DashboardAgendaViewProps {
  events: EventItem[];
}

// Cyberpunk Neon Theme color mapping for event types
const eventTypeColorMap: Record<string, string> = {
    'Deadline': 'border-l-[hsl(var(--destructive))]',       // Red (from theme)
    'Meeting': 'border-l-[hsl(var(--secondary))]',          // Electric Cyan (Secondary Accent)
    'Class': 'border-l-[hsl(var(--secondary))]',             // Electric Cyan
    'Study Session': 'border-l-[hsl(var(--chart-3))]',       // Glitch Lime Green (Tertiary Accent)
    'Exam': 'border-l-[hsl(var(--chart-4))]',                // Neon Orange (from chart colors)
    'Default': 'border-l-[hsl(var(--primary))]',             // Vibrant Magenta (Primary Accent)
};


export function DashboardAgendaView({ events }: DashboardAgendaViewProps) {
  if (!events || events.length === 0) {
    return (
      <ContentCard>
        <div className="text-center py-12">
          <PixelCalendarIcon className="w-12 h-12 mx-auto text-muted-foreground/50 mb-6" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No Upcoming Events</h3>
          <p className="text-muted-foreground">Your schedule is clear for now! Add some tasks in the planner.</p>
        </div>
      </ContentCard>
    );
  }

  const today = new Date();
  const sortedEvents = events
    .map(event => ({ ...event, parsedDate: parseISO(event.date) }))
    .filter(event => differenceInDays(event.parsedDate, today) >= -1) // Show today, or events that started yesterday but might still be relevant
    .sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime());

  const groupedEvents: { Today: EventItem[]; Tomorrow: EventItem[]; Upcoming: EventItem[] } = {
    Today: [],
    Tomorrow: [],
    Upcoming: [],
  };

  sortedEvents.forEach(event => {
    if (isToday(event.parsedDate)) {
      groupedEvents.Today.push(event);
    } else if (isTomorrow(event.parsedDate)) {
      groupedEvents.Tomorrow.push(event);
    } else if (differenceInDays(event.parsedDate, today) > 0) { // Only future events for upcoming
      groupedEvents.Upcoming.push(event);
    }
  });

  return (
    <ContentCard className="w-full" padding="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-5">What's On Your Plate?</h2>
      <div className="space-y-6">
        {Object.entries(groupedEvents).map(([groupName, groupEvents], index) => {
          if (groupEvents.length === 0 && groupName !== "Today") return null; // Always show Today section even if empty for context

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
                        {/* Optional: Add a button/link to planner details */}
                        {/* <Button variant="ghost" size="sm" className="text-primary self-center">Details</Button> */}
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
