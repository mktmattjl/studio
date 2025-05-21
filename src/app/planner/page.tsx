
'use client';

import { PixelatedContainer } from '@/components/PixelatedContainer';
import { PixelatedButton } from '@/components/PixelatedButton';
import { PlusCircle } from 'lucide-react';
import React from 'react';
import { format, addMonths, subMonths, setHours, setMinutes, setSeconds, addWeeks, subWeeks, startOfWeek, endOfWeek } from '@/lib/dateUtils'; // Using date-fns directly now
import { PlannerControls, type PlannerViewMode } from '@/components/planner/PlannerControls';
import { MonthCalendarGrid } from '@/components/planner/MonthCalendarGrid';
import { WeekCalendarGrid } from '@/components/planner/WeekCalendarGrid';
import { EventFormDialog } from '@/components/planner/EventFormDialog';

// Define a type for our events for clarity
export interface PlannerEvent {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  type: 'class' | 'deadline' | 'study_session' | 'exam' | 'meeting' | 'personal';
  description?: string;
  color: string; // Tailwind classes for event block color, e.g., 'bg-blue-500/70 border-blue-700 text-white'
}

// Color mapping for event types
const eventTypeColors: Record<PlannerEvent['type'], string> = {
  class: 'bg-blue-600/80 border-blue-700 text-white',
  deadline: 'bg-red-600/80 border-red-700 text-white',
  study_session: 'bg-green-600/80 border-green-700 text-white',
  exam: 'bg-yellow-500/90 border-yellow-700 text-black', // Yellow needs dark text
  meeting: 'bg-purple-600/80 border-purple-700 text-white',
  personal: 'bg-pink-600/80 border-pink-700 text-white',
};


// Sample events - in a real app, these would be fetched or managed globally
const todayDate = new Date();
const sampleEventsData: Omit<PlannerEvent, 'id' | 'color'>[] = [
  {
    title: 'CS Lecture',
    startTime: setSeconds(setMinutes(setHours(todayDate, 9), 0), 0),
    endTime: setSeconds(setMinutes(setHours(todayDate, 10), 50), 0),
    type: 'class',
    description: 'Room 301 / Prof. Ada',
  },
  {
    title: 'Study Algo',
    startTime: setSeconds(setMinutes(setHours(todayDate, 14), 0), 0),
    endTime: setSeconds(setMinutes(setHours(todayDate, 15), 30), 0),
    type: 'study_session',
    description: 'Library, Group Room B',
  },
  {
    title: 'Physics Lab DUE',
    startTime: setSeconds(setMinutes(setHours(todayDate, 23), 59), 0),
    endTime: setSeconds(setMinutes(setHours(todayDate, 23), 59), 0),
    type: 'deadline',
    description: 'Online Portal',
  },
  {
    title: 'Project Meeting',
    startTime: setSeconds(setMinutes(setHours(new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() + 1), 11), 0), 0),
    endTime: setSeconds(setMinutes(setHours(new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() + 1), 12), 30), 0),
    type: 'meeting',
    description: 'Discuss project milestones',
  },
   {
    title: 'History Exam Prep Long Session',
    startTime: setSeconds(setMinutes(setHours(new Date(2024, 7, 15), 10), 0), 0), // Note: JS months are 0-indexed, so 7 is August
    endTime: setSeconds(setMinutes(setHours(new Date(2024, 7, 15), 13), 0), 0),
    type: 'study_session',
  },
  {
    title: 'Math Midterm',
    startTime: setHours(setMinutes(new Date(2024, 7, 16), 0), 14),
    endTime: setHours(setMinutes(new Date(2024, 7, 16), 0), 16),
    type: 'exam',
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
    } else { // week view
      setCurrentDate(prevDate => subWeeks(prevDate, 1));
    }
  };

  const handleNext = () => {
    if (viewMode === 'month') {
      setCurrentDate(prevDate => addMonths(prevDate, 1));
    } else { // week view
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
    } else { // week view
      const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 }); // Assuming week starts on Sunday for label consistency
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
    if (eventData.id) { // Existing event
      setEvents(prevEvents => 
        prevEvents.map(e => 
          e.id === eventData.id ? { ...e, ...eventData, color: eventTypeColors[eventData.type] } : e
        )
      );
    } else { // New event
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
    <div className="flex flex-col h-full space-y-6">
      <PixelatedContainer padding="p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">Study Planner</h1>
            <p className="text-muted-foreground mt-1 text-lg">Organize your schedule.</p>
          </div>
          <PixelatedButton onClick={() => openNewEventDialog()}>
            <PlusCircle size={20} className="mr-2" />
            Add New Event
          </PixelatedButton>
        </div>
      </PixelatedContainer>

      <PixelatedContainer className="flex-grow flex flex-col" padding="p-3 md:p-4">
        <PlannerControls
          currentDate={currentDate}
          onPrev={handlePrev}
          onNext={handleNext}
          onToday={handleToday}
          currentViewLabel={getCurrentViewLabel()}
          viewMode={viewMode}
          onViewChange={handleViewChange}
        />
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
      </PixelatedContainer>

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
