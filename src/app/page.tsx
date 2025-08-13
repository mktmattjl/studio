
'use client';

import { useState, useEffect } from 'react';
import { DashboardAgendaView } from '@/components/dashboard/DashboardAgendaView';
import type { PlannerEvent } from '@/app/planner/page';
import { eventTypeColors } from '@/app/planner/page';
import { addDays, setHours, setMinutes, setSeconds } from '@/lib/dateUtils';
import { useAuth } from '@/contexts/AuthContext';

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
  const { currentUser } = useAuth();
  const [dashboardEvents] = useState<PlannerEvent[]>(
    initialDashboardEvents.map((event, index) => ({
      ...event,
      id: `dash-event-${index + 1}-${Date.now()}`,
      color: eventTypeColors[event.type],
    }))
  );

  const [greeting, setGreeting] = useState('');
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const getGreetingTitle = () => {
    if (currentUser?.displayName) {
      return `${greeting}, ${currentUser.displayName.split(' ')[0]}!`;
    }
    return `${greeting}!`;
  }

  return (
    <div className="flex-grow space-y-6 xl:space-y-8">
      <DashboardAgendaView 
        events={dashboardEvents} 
        title={getGreetingTitle()} 
        subtitle="Here’s what’s on your plate for the next few days." 
      />
    </div>
  );
}
