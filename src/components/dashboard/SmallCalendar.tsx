
'use client';

import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { Calendar as CalendarIcon } from 'lucide-react';

export function SmallCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  // Example dates with events
  const eventDates = [
    new Date(new Date().setDate(2)),
    new Date(new Date().setDate(15)),
    new Date(new Date().setDate(24)),
  ];

  return (
    <DashboardCard title="Calendar" icon={<CalendarIcon />}>
       <div className="-m-3">
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="w-full"
            modifiers={{
                events: eventDates,
            }}
            modifiersClassNames={{
                events: 'bg-primary/20 rounded-full',
            }}
        />
       </div>
    </DashboardCard>
  );
}
