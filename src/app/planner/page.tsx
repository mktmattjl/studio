
'use client';

import { PixelatedContainer } from '@/components/PixelatedContainer';
import { PixelatedButton } from '@/components/PixelatedButton';
import { PlusCircle } from 'lucide-react';
import React from 'react';
import { format, addMonths, subMonths, setHours, setMinutes, setSeconds, addWeeks, subWeeks, startOfWeek, endOfWeek, isToday as dateFnsIsToday } from 'date-fns'; // Using date-fns directly now
import { PlannerControls, type PlannerViewMode } from '@/components/planner/PlannerControls';
import { MonthCalendarGrid } from '@/components/planner/MonthCalendarGrid';
import { WeekCalendarGrid } from '@/components/planner/WeekCalendarGrid'; // To be created

// Define a type for our events for clarity (can be moved to types/index.ts)
export interface PlannerEvent {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  type: 'class' | 'deadline' | 'study_session' | 'exam' | 'meeting';
  description?: string;
  color?: string; // For event block color, e.g., 'bg-blue-500/70 border-blue-700'
}

// Sample events - in a real app, these would be fetched or managed globally
const todayDate = new Date();
const sampleEvents: PlannerEvent[] = [
  {
    id: '1',
    title: 'CS Lecture',
    startTime: setSeconds(setMinutes(setHours(todayDate, 9), 0), 0),
    endTime: setSeconds(setMinutes(setHours(todayDate, 10), 50), 0),
    type: 'class',
    description: 'Room 301 / Prof. Ada',
    color: 'bg-blue-500/70 border-blue-700 text-white',
  },
  {
    id: '2',
    title: 'Study Algo',
    startTime: setSeconds(setMinutes(setHours(todayDate, 14), 0), 0),
    endTime: setSeconds(setMinutes(setHours(todayDate, 15), 30), 0),
    type: 'study_session',
    description: 'Library, Group Room B',
    color: 'bg-green-500/70 border-green-700 text-white',
  },
  {
    id: '3',
    title: 'Physics Lab DUE',
    startTime: setSeconds(setMinutes(setHours(todayDate, 23), 59), 0),
    endTime: setSeconds(setMinutes(setHours(todayDate, 23), 59), 0), // Ends at same time, effectively a deadline marker
    type: 'deadline',
    description: 'Online Portal',
    color: 'bg-red-500/70 border-red-700 text-white',
  },
  {
    id: '4',
    title: 'Project Meeting',
    startTime: setSeconds(setMinutes(setHours(new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() + 1), 11), 0), 0),
    endTime: setSeconds(setMinutes(setHours(new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() + 1), 12), 30), 0),
    type: 'meeting',
    description: 'Discuss project milestones',
    color: 'bg-purple-500/70 border-purple-700 text-white',
  },
   {
    id: '5',
    title: 'History Exam Prep Long Session',
    startTime: setSeconds(setMinutes(setHours(new Date(2024, 7, 15), 10), 0), 0), // Example: Aug 15, 2024 10:00
    endTime: setSeconds(setMinutes(setHours(new Date(2024, 7, 15), 13), 0), 0),   // Ends at 13:00 (3 hours)
    type: 'study_session',
    color: 'bg-orange-500/70 border-orange-700 text-white',
  },
  {
    id: '6',
    title: 'Math Midterm',
    startTime: setHours(setMinutes(new Date(2024, 7, 16), 0), 14), // Aug 16, 2024, 2 PM
    endTime: setHours(setMinutes(new Date(2024, 7, 16), 0), 16),   // Aug 16, 2024, 4 PM (2 hours)
    type: 'exam',
    color: 'bg-yellow-500/80 border-yellow-700 text-black',
  },
];


export default function PlannerPage() {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [viewMode, setViewMode] = React.useState<PlannerViewMode>('month');
  const [events, setEvents] = React.useState<PlannerEvent[]>(sampleEvents);

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
    // Optional: reset currentDate to today when switching views, or keep current
    // setCurrentDate(new Date()); 
  };
  
  const getCurrentViewLabel = () => {
    if (viewMode === 'month') {
      return format(currentDate, 'MMMM yyyy');
    } else { // week view
      const weekStart = startOfWeek(currentDate);
      const weekEnd = endOfWeek(currentDate);
      if (format(weekStart, 'MMMM') === format(weekEnd, 'MMMM')) {
        return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'd, yyyy')}`;
      }
      return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`;
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <PixelatedContainer padding="p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">Study Planner</h1>
            <p className="text-muted-foreground mt-1 text-lg">Organize your schedule.</p>
          </div>
          <PixelatedButton onClick={() => alert("Add new event dialog/form to be implemented.")}>
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
          />
        )}
        {viewMode === 'week' && (
          <WeekCalendarGrid
            currentDate={currentDate}
            events={events}
            startHour={7} // 7 AM
            endHour={23}  // 11 PM (displays up to 11:59 PM)
          />
        )}
      </PixelatedContainer>
    </div>
  );
}
