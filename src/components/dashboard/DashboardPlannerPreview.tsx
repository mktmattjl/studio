
'use client';

import React from 'react';
import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { WeekCalendarGrid } from '@/components/planner/WeekCalendarGrid';
import type { PlannerEvent } from '@/app/planner/page';
import { addDays, setHours, setMinutes, setSeconds } from '@/lib/dateUtils';
import { eventTypeColors } from '@/app/planner/page';
import { CalendarDays } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

const todayDate = new Date();
const sampleEventsData: Omit<PlannerEvent, 'id' | 'color'>[] = [
  {
    title: 'Lecture: Advanced Algorithms',
    startTime: setSeconds(setMinutes(setHours(todayDate, 9), 0), 0),
    endTime: setSeconds(setMinutes(setHours(todayDate, 10), 50), 0),
    type: 'class',
    description: 'Room 301 / Prof. Elara',
  },
  {
    title: 'Project Alpha Sync',
    startTime: setSeconds(setMinutes(setHours(todayDate, 14), 0), 0),
    endTime: setSeconds(setMinutes(setHours(todayDate, 15), 30), 0),
    type: 'meeting',
    description: 'Weekly team sync up.',
  },
   {
    title: 'Study Session: Algo Prep',
    startTime: setSeconds(setMinutes(setHours(addDays(todayDate, 1), 18), 0), 0),
    endTime: setSeconds(setMinutes(setHours(addDays(todayDate, 1), 20), 0), 0),
    type: 'study_session',
  },
  {
    title: 'History Paper DUE',
    startTime: setSeconds(setMinutes(setHours(addDays(todayDate, 2), 23), 59), 0),
    endTime: setSeconds(setMinutes(setHours(addDays(todayDate, 2), 23), 59), 0),
    type: 'deadline',
  },
];

const initialEvents: PlannerEvent[] = sampleEventsData.map((event, index) => ({
  ...event,
  id: `event-${index + 1}-${Date.now()}`,
  color: eventTypeColors[event.type],
}));


export function DashboardPlannerPreview() {
  const today = new Date();
  const daysToDisplay = [today, addDays(today, 1), addDays(today, 2)];

  return (
    <DashboardCard 
      title="Upcoming Schedule" 
      icon={<CalendarDays />}
    >
        <div className="-mx-4 -mb-4">
            <WeekCalendarGrid
                currentDate={today}
                events={initialEvents}
                startHour={7}
                endHour={22}
                daysToDisplay={daysToDisplay}
                condensedMode={true}
            />
        </div>
        <div className="mt-4 text-center">
            <Link href="/planner" passHref>
                <Button variant="link" className="text-sm">
                    Go to Full Planner
                </Button>
            </Link>
        </div>
    </DashboardCard>
  );
}
