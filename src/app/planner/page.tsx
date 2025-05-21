
'use client';

import { ContentCard } from '@/components/ui/ContentCard';
import { Button } from '@/components/ui/button';
import React from 'react';
import { format, addMonths, subMonths, setHours, setMinutes, setSeconds, addWeeks, subWeeks, startOfWeek, endOfWeek } from '@/lib/dateUtils'; 
import { PlannerControls, type PlannerViewMode } from '@/components/planner/PlannerControls';
import { MonthCalendarGrid } from '@/components/planner/MonthCalendarGrid';
import { WeekCalendarGrid } from '@/components/planner/WeekCalendarGrid';
import { EventFormDialog } from '@/components/planner/EventFormDialog';

// Import Pixel Art Icons
import { PixelPlusIcon } from '@/components/icons/PixelPlusIcon';


export interface PlannerEvent {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  type: 'class' | 'deadline' | 'study_session' | 'exam' | 'meeting' | 'personal';
  description?: string;
  color: string; // Hex or Tailwind class for event block color
}

// Updated color palette for dark theme
export const eventTypeColors: Record<PlannerEvent['type'], string> = {
  class: 'bg-primary/80 border-primary text-primary-foreground', 
  deadline: 'bg-destructive/80 border-destructive text-destructive-foreground', 
  study_session: 'bg-chart-3/80 border-chart-3 text-primary-foreground', 
  exam: 'bg-chart-4/80 border-chart-4 text-primary-foreground', 
  meeting: 'bg-secondary/80 border-secondary text-secondary-foreground', 
  personal: 'bg-purple-600/80 border-purple-500 text-purple-50', 
};


const todayDate = new Date();
const sampleEventsData: Omit<PlannerEvent, 'id' | 'color'>[] = [
  {
    title: 'CS Lecture: Advanced Algorithms',
    startTime: setSeconds(setMinutes(setHours(todayDate, 9), 0), 0),
    endTime: setSeconds(setMinutes(setHours(todayDate, 10), 50), 0),
    type: 'class',
    description: 'Room 301 / Prof. Ada Lovelace',
  },
  {
    title: 'Study Session: Data Structures',
    startTime: setSeconds(setMinutes(setHours(todayDate, 14), 0), 0),
    endTime: setSeconds(setMinutes(setHours(todayDate, 15), 30), 0),
    type: 'study_session',
    description: 'Library, Group Room B - Focus on Trees & Graphs',
  },
  {
    title: 'Physics Lab Report DUE',
    startTime: setSeconds(setMinutes(setHours(todayDate, 23), 59), 0),
    endTime: setSeconds(setMinutes(setHours(todayDate, 23), 59), 0),
    type: 'deadline',
    description: 'Submit via Online Portal - Experiment #5',
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
    <div className="flex flex-col h-[calc(100vh-var(--header-height,8rem)-2rem)] space-y-6">
      <ContentCard padding="p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground">Study Planner</h1>
            <p className="text-muted-foreground mt-1">Organize your classes, deadlines, and study sessions.</p>
          </div>
          <Button onClick={() => openNewEventDialog()} className="btn-primary-action w-full sm:w-auto">
            <PixelPlusIcon className="w-4 h-4 mr-2" />
            New Event
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
