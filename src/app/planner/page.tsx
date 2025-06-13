
'use client';

import { ContentCard } from '@/components/ui/ContentCard';
import { Button } from '@/components/ui/button';
import React from 'react';
import { format, addMonths, subMonths, setHours, setMinutes, setSeconds, addWeeks, subWeeks, startOfWeek, endOfWeek } from '@/lib/dateUtils'; 
import { PlannerControls, type PlannerViewMode } from '@/components/planner/PlannerControls';
import { MonthCalendarGrid } from '@/components/planner/MonthCalendarGrid';
import { WeekCalendarGrid } from '@/components/planner/WeekCalendarGrid';
import { EventFormDialog } from '@/components/planner/EventFormDialog';
import { PixelQuillIcon } from '@/components/icons/fantasy'; 

export interface PlannerEvent {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  type: 'class' | 'deadline' | 'study_session' | 'exam' | 'meeting' | 'personal';
  description?: string;
  color: string; 
}

// Event Type Colors using Heroic Fantasy Theme
export const eventTypeColors: Record<PlannerEvent['type'], string> = {
  class: 'bg-secondary/40 border-l-secondary text-primary-foreground', // WAS: bg-secondary/20
  deadline: 'bg-destructive/40 border-l-destructive text-destructive-foreground', // WAS: bg-destructive/20
  study_session: 'bg-secondary/40 border-l-secondary text-secondary-foreground', // WAS: bg-secondary/20
  exam: 'bg-destructive/40 border-l-destructive text-destructive-foreground', // WAS: bg-destructive/20
  meeting: 'bg-secondary/40 border-l-secondary text-primary-foreground', // WAS: bg-secondary/20
  personal: 'bg-secondary/40 border-l-secondary text-secondary-foreground', // WAS: bg-secondary/20
};


const todayDate = new Date();
const sampleEventsData: Omit<PlannerEvent, 'id' | 'color'>[] = [
  {
    title: 'Lecture: Advanced Dragonomics',
    startTime: setSeconds(setMinutes(setHours(todayDate, 9), 0), 0),
    endTime: setSeconds(setMinutes(setHours(todayDate, 10), 50), 0),
    type: 'class',
    description: 'Grand Library, Chamber 3 / Loremaster Elara',
  },
  {
    title: 'Potion Brewing Practicum',
    startTime: setSeconds(setMinutes(setHours(todayDate, 14), 0), 0),
    endTime: setSeconds(setMinutes(setHours(todayDate, 15), 30), 0),
    type: 'study_session',
    description: 'Alchemist\'s Guild - Focus on Healing Draughts',
  },
  {
    title: 'Ancient Runes Translation DUE',
    startTime: setSeconds(setMinutes(setHours(todayDate, 23), 59), 0),
    endTime: setSeconds(setMinutes(setHours(todayDate, 23), 59), 0),
    type: 'deadline',
    description: 'Submit scroll to the Scribe Master - Tablet #V',
  },
];

const initialEvents: PlannerEvent[] = sampleEventsData.map((event, index) => ({
  ...event,
  id: `event-${index + 1}-${Date.now()}`,
  color: eventTypeColors[event.type],
}));


export default function PlannerPage() {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [viewMode, setViewMode] = React.useState<PlannerViewMode>('month');
  const [events, setEvents] = React.useState<PlannerEvent[]>(initialEvents);

  const [isEventDialogOpen, setIsEventDialogOpen] = React.useState(false);
  const [selectedEventForDialog, setSelectedEventForDialog] = React.useState<PlannerEvent | null>(null);
  const [newProposedStartTime, setNewProposedStartTime] = React.useState<Date | null>(null);


  const handlePrev = () => {
    if (viewMode === 'month') {
      setCurrentDate(prevDate => subMonths(prevDate, 1));
    } else { 
      setCurrentDate(prevDate => subWeeks(prevDate, 1));
    }
  };

  const handleNext = () => {
    if (viewMode === 'month') {
      setCurrentDate(prevDate => addMonths(prevDate, 1));
    } else { 
      setCurrentDate(prevDate => addWeeks(prevDate, 1));
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleViewChange = (newViewMode: PlannerViewMode) => {
    setViewMode(newViewMode);
  };
  
  const getCurrentViewLabel = () => {
    if (viewMode === 'month') {
      return format(currentDate, 'MMMM yyyy');
    } else { 
      const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 }); 
      const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
      if (format(weekStart, 'MMMM') === format(weekEnd, 'MMMM')) {
        return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'd, yyyy')}`;
      }
      return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`;
    }
  };

  const openNewEventDialog = (startTime?: Date) => {
    setSelectedEventForDialog(null);
    setNewProposedStartTime(startTime || new Date());
    setIsEventDialogOpen(true);
  };

  const handleSlotClick = (dateTime: Date) => {
    setSelectedEventForDialog(null);
    setNewProposedStartTime(dateTime);
    setIsEventDialogOpen(true);
  };

  const handleEventClick = (event: PlannerEvent) => {
    setSelectedEventForDialog(event);
    setNewProposedStartTime(null);
    setIsEventDialogOpen(true);
  };
  
  const handleSaveEvent = (eventData: Omit<PlannerEvent, 'id' | 'color'> & { id?: string }) => {
    if (eventData.id) { 
      setEvents(prevEvents => 
        prevEvents.map(e => 
          e.id === eventData.id ? { ...e, ...eventData, color: eventTypeColors[eventData.type] } : e
        )
      );
    } else { 
      const newEvent: PlannerEvent = {
        ...eventData,
        id: `event-${Date.now()}`,
        color: eventTypeColors[eventData.type],
      };
      setEvents(prevEvents => [...prevEvents, newEvent]);
    }
    setIsEventDialogOpen(false);
    setSelectedEventForDialog(null);
    setNewProposedStartTime(null);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prevEvents => prevEvents.filter(e => e.id !== eventId));
    setIsEventDialogOpen(false);
    setSelectedEventForDialog(null);
    setNewProposedStartTime(null);
  };


  return (
    <div className="flex flex-col h-[calc(100vh-var(--header-height,4rem)-2rem)] space-y-6">
      <ContentCard padding="p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-pixel text-[hsl(var(--text-accent-thematic))]">The Grand Almanac</h1>
            <p className="text-muted-foreground mt-1">Chart thy quests, trials, and scholarly pursuits.</p>
          </div>
          <Button onClick={() => openNewEventDialog()} className="btn-primary-action w-full sm:w-auto">
            <PixelQuillIcon className="w-4 h-4 mr-2" />
            Decree New Entry
          </Button>
        </div>
      </ContentCard>

      <ContentCard className="flex-grow flex flex-col overflow-hidden" padding="p-3 md:p-4">
        <PlannerControls
          currentDate={currentDate}
          onPrev={handlePrev}
          onNext={handleNext}
          onToday={handleToday}
          currentViewLabel={getCurrentViewLabel()}
          viewMode={viewMode}
          onViewChange={handleViewChange}
        />
        <div className="flex-grow overflow-auto styled-scrollbar">
            {viewMode === 'month' && (
            <MonthCalendarGrid 
                currentDate={currentDate} 
                events={events}
                onDateClick={(date) => { 
                    setViewMode('week');
                    setCurrentDate(date);
                }}
                onEventClick={handleEventClick}
            />
            )}
            {viewMode === 'week' && (
            <WeekCalendarGrid
                currentDate={currentDate}
                events={events}
                startHour={7} 
                endHour={23}  
                onSlotClick={handleSlotClick}
                onEventClick={handleEventClick}
            />
            )}
        </div>
      </ContentCard>

      <EventFormDialog
        isOpen={isEventDialogOpen}
        onClose={() => {
          setIsEventDialogOpen(false);
          setSelectedEventForDialog(null);
          setNewProposedStartTime(null);
        }}
        eventData={selectedEventForDialog}
        proposedStartTime={newProposedStartTime}
        onSave={handleSaveEvent}
        onDelete={selectedEventForDialog ? handleDeleteEvent : undefined}
      />
    </div>
  );
}
    
