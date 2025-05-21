
'use client';

import { PixelatedContainer } from '@/components/PixelatedContainer';
import { PixelatedButton } from '@/components/PixelatedButton';
import { PlusCircle } from 'lucide-react';
import React from 'react';
import { format, addMonths, subMonths, setHours, setMinutes, setSeconds } from 'date-fns';
import { PlannerControls } from '@/components/planner/PlannerControls';
import { MonthCalendarGrid } from '@/components/planner/MonthCalendarGrid';

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
const today = new Date();
const sampleEvents: PlannerEvent[] = [
  {
    id: '1',
    title: 'CS Lecture',
    startTime: setSeconds(setMinutes(setHours(today, 9), 0), 0),
    endTime: setSeconds(setMinutes(setHours(today, 10), 50), 0),
    type: 'class',
    description: 'Room 301 / Prof. Ada',
    color: 'bg-blue-500/70 border-blue-700',
  },
  {
    id: '2',
    title: 'Study Algorithms',
    startTime: setSeconds(setMinutes(setHours(today, 14), 0), 0),
    endTime: setSeconds(setMinutes(setHours(today, 15), 30), 0),
    type: 'study_session',
    description: 'Library, Group Room B',
    color: 'bg-green-500/70 border-green-700',
  },
  {
    id: '3',
    title: 'Physics Lab Report DUE',
    startTime: setSeconds(setMinutes(setHours(today, 23), 59), 0),
    endTime: setSeconds(setMinutes(setHours(today, 23), 59), 0),
    type: 'deadline',
    description: 'Online Portal',
    color: 'bg-red-500/70 border-red-700',
  },
  {
    id: '4',
    title: 'Project Meeting',
    startTime: setSeconds(setMinutes(setHours(addMonths(today,0), 11), 0), 0), // Ensure this is on the current day for visibility
    endTime: setSeconds(setMinutes(setHours(addMonths(today,0), 11), 30), 0),
    type: 'meeting',
    description: 'Discuss project milestones',
    color: 'bg-purple-500/70 border-purple-700',
  },
   {
    id: '5',
    title: 'History Exam Prep',
    startTime: setSeconds(setMinutes(setHours(new Date(2024, 7, 15), 10), 0), 0), // Example: Aug 15, 2024
    endTime: setSeconds(setMinutes(setHours(new Date(2024, 7, 15), 12), 0), 0),
    type: 'study_session',
    color: 'bg-orange-500/70 border-orange-700',
  },
];


export default function PlannerPage() {
  const [currentDate, setCurrentDate] = React.useState(new Date()); // For month navigation
  const [events, setEvents] = React.useState<PlannerEvent[]>(sampleEvents); // Later, this would be fetched

  const handlePrevMonth = () => {
    setCurrentDate(prevDate => subMonths(prevDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prevDate => addMonths(prevDate, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };
  
  // const handleDateClick = (date: Date) => {
  //   // Placeholder for potentially opening a day view or event creation modal
  //   alert(`Date clicked: ${format(date, 'yyyy-MM-dd')}`);
  // };

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
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onToday={handleToday}
          currentMonthLabel={format(currentDate, 'MMMM yyyy')}
        />
        <MonthCalendarGrid 
            currentDate={currentDate} 
            events={events} 
            // onDateClick={handleDateClick}
        />
      </PixelatedContainer>
    </div>
  );
}
