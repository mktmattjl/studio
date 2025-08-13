
'use client';

import { useState, useEffect } from 'react';
import { ContentCard } from '@/components/ui/ContentCard';
import { DashboardAgendaView } from '@/components/dashboard/DashboardAgendaView';
import { WeekCalendarGrid } from '@/components/planner/WeekCalendarGrid';
import { EventFormDialog } from '@/components/planner/EventFormDialog';
import type { PlannerEvent } from '@/app/planner/page';
import { eventTypeColors } from '@/app/planner/page';
import { Calendar } from 'lucide-react';
import { addDays, setHours, setMinutes, setSeconds } from '@/lib/dateUtils';
import { JumpBackInCard } from '@/components/dashboard/JumpBackInCard';

const initialDashboardEvents: Omit<PlannerEvent, 'id' | 'color'>[] = [
    { title: 'Submit History Essay Outline', startTime: setSeconds(setMinutes(setHours(new Date(), 0),0),0), endTime: setSeconds(setMinutes(setHours(new Date(), 0),0),0), type: 'deadline', description: 'Final outline due to Professor Smith.'},
    { title: 'Lecture: Advanced Algorithms', startTime: setSeconds(setMinutes(setHours(addDays(new Date(), 1), 10),0),0), endTime: setSeconds(setMinutes(setHours(addDays(new Date(), 1), 11),30),0), type: 'class', description: 'Room 301, Engineering Building.'},
    { title: 'Team Sync Meeting', startTime: setSeconds(setMinutes(setHours(addDays(new Date(), 1), 14),0),0), endTime: setSeconds(setMinutes(setHours(addDays(new Date(), 1), 15),0),0), type: 'meeting', description: 'Discuss progress on Q3 project goals.'},
    { title: 'Study Session: Biology Chapter 3', startTime: setSeconds(setMinutes(setHours(addDays(new Date(), 2), 16),0),0), endTime: setSeconds(setMinutes(setHours(addDays(new Date(), 2), 17),30),0), type: 'study_session', description: 'Focus on cellular respiration.'},
    { title: 'Mid-term Exam: Physics II', startTime: setSeconds(setMinutes(setHours(addDays(new Date(), 5), 9),0),0), endTime: setSeconds(setMinutes(setHours(addDays(new Date(), 5), 11),0),0), type: 'exam', description: 'Covers chapters 4-7.'},
    { title: 'Daily Scrum', startTime: setSeconds(setMinutes(setHours(new Date(), 9),0),0), endTime: setSeconds(setMinutes(setHours(new Date(), 9),30),0), type: 'meeting', description: 'Quick alignment with the team.' },
    { title: 'Work on Project Cerebro', startTime: setSeconds(setMinutes(setHours(new Date(), 14),0),0), endTime: setSeconds(setMinutes(setHours(new Date(), 16),0),0), type: 'study_session', description: 'Dedicated time for the main project.' }
  ];

export default function DashboardPage() {
  const [dashboardEvents, setDashboardEvents] = useState<PlannerEvent[]>(
    initialDashboardEvents.map((event, index) => ({
      ...event,
      id: `dash-event-${index + 1}-${Date.now()}`,
      color: eventTypeColors[event.type],
    }))
  );

  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<PlannerEvent | null>(null);
  const [newStartTime, setNewStartTime] = useState<Date | null>(null);

  const [greeting, setGreeting] = useState('');
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const today = new Date();
  const displayDays = [today, addDays(today, 1), addDays(today, 2)];

  const handleSlotClick = (dateTime: Date) => {
    setSelectedEvent(null);
    setNewStartTime(dateTime);
    setIsEventDialogOpen(true);
  };

  const handleEventClick = (event: PlannerEvent) => {
    setSelectedEvent(event);
    setNewStartTime(null);
    setIsEventDialogOpen(true);
  };

  const handleSaveEvent = (eventData: Omit<PlannerEvent, 'id' | 'color'> & { id?: string }) => {
    if (eventData.id) {
      setDashboardEvents(prevEvents =>
        prevEvents.map(e =>
          e.id === eventData.id ? { ...e, ...eventData, color: eventTypeColors[eventData.type] } : e
        )
      );
    } else {
      const newEvent: PlannerEvent = {
        ...eventData,
        id: `dash-event-${Date.now()}`,
        color: eventTypeColors[eventData.type],
      };
      setDashboardEvents(prevEvents => [...prevEvents, newEvent]);
    }
    setIsEventDialogOpen(false);
    setSelectedEvent(null);
    setNewStartTime(null);
  };

  const handleDeleteEvent = (eventId: string) => {
    setDashboardEvents(prevEvents => prevEvents.filter(e => e.id !== eventId));
    setIsEventDialogOpen(false);
    setSelectedEvent(null);
    setNewStartTime(null);
  };

  return (
    <div className="flex-grow space-y-6 xl:space-y-8">
      <DashboardAgendaView 
        events={dashboardEvents} 
        title={<>{greeting}!</>} 
        subtitle="Here’s what’s on your plate for the next few days." 
      />

      <JumpBackInCard />

      <ContentCard className="flex flex-col">
         <h2 className="text-xl font-semibold p-4 sm:p-6 pb-3 flex items-center gap-2 text-foreground">
            <Calendar className="w-5 h-5" />
            Week At a Glance
        </h2>
        <div className="flex-grow overflow-hidden p-1 sm:p-2 pt-0">
          <WeekCalendarGrid
            currentDate={new Date()}
            daysToDisplay={displayDays}
            events={dashboardEvents}
            startHour={8}
            endHour={18}
            condensedMode={true}
            onSlotClick={handleSlotClick}
            onEventClick={handleEventClick}
          />
        </div>
      </ContentCard>

      <EventFormDialog
        isOpen={isEventDialogOpen}
        onClose={() => {
          setIsEventDialogOpen(false);
          setSelectedEvent(null);
          setNewStartTime(null);
        }}
        eventData={selectedEvent}
        proposedStartTime={newStartTime}
        onSave={handleSaveEvent}
        onDelete={selectedEvent ? handleDeleteEvent : undefined}
      />
    </div>
  );
}
