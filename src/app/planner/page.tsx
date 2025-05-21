
'use client';

import { PixelatedContainer } from '@/components/PixelatedContainer';
import { PixelatedButton } from '@/components/PixelatedButton';
import { Calendar as CalendarIcon, PlusCircle } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import React from 'react';
import { format, addHours, setHours, setMinutes, setSeconds } from 'date-fns';
import { cn } from '@/lib/utils';

// Define a type for our events for clarity
interface PlannerEvent {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  type: 'class' | 'deadline' | 'study_session' | 'exam' | 'meeting';
  description?: string;
  color?: string; // For event block color
}

// Sample events for the current date to demonstrate
const today = new Date();
const sampleEventsForToday: PlannerEvent[] = [
  {
    id: '1',
    title: 'Computer Science Lecture',
    startTime: setSeconds(setMinutes(setHours(today, 9), 0), 0),
    endTime: setSeconds(setMinutes(setHours(today, 10), 50), 0),
    type: 'class',
    description: 'Room 301 / Prof. Ada',
    color: 'bg-blue-500/70 border-blue-700', // Example color
  },
  {
    id: '2',
    title: 'Study Group: Algorithms',
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
    endTime: setSeconds(setMinutes(setHours(today, 23), 59), 0), // Deadline might just be a point in time
    type: 'deadline',
    description: 'Online Portal',
    color: 'bg-red-500/70 border-red-700',
  },
  {
    id: '4',
    title: 'Project Meeting',
    startTime: setSeconds(setMinutes(setHours(today, 11), 0), 0),
    endTime: setSeconds(setMinutes(setHours(today, 11), 30), 0),
    type: 'meeting',
    description: 'Discuss project milestones',
    color: 'bg-purple-500/70 border-purple-700',
  }
];


export default function PlannerPage() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
  const [events, setEvents] = React.useState<PlannerEvent[]>(sampleEventsForToday); // Later, this would be fetched based on selectedDate

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    // In a real app, fetch events for 'date'
    // For now, if it's today, show sample, otherwise clear
    if (date && format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')) {
      setEvents(sampleEventsForToday);
    } else {
      setEvents([]);
    }
  };

  // Generate time slots from 7 AM to 6 PM (18:00)
  const timeSlots = [];
  for (let i = 7; i <= 18; i++) {
    timeSlots.push(setHours(new Date(0), i)); // Use a base date for formatting
  }

  const getEventStyle = (event: PlannerEvent, slotStartTime: Date): React.CSSProperties => {
    const slotEndTime = addHours(slotStartTime, 1);
    
    // Ensure event times are on the same "day" as the slot for comparison
    const eventStartOnSlotDay = setHours(setMinutes(new Date(slotStartTime), event.startTime.getMinutes()), event.startTime.getHours());
    const eventEndOnSlotDay = setHours(setMinutes(new Date(slotStartTime), event.endTime.getMinutes()), event.endTime.getHours());

    if (eventStartOnSlotDay >= slotEndTime || eventEndOnSlotDay <= slotStartTime) {
      return { display: 'none' }; // Event is not in this slot
    }

    const startMinute = eventStartOnSlotDay < slotStartTime ? 0 : event.startTime.getMinutes();
    const endMinute = eventEndOnSlotDay > slotEndTime ? 60 : event.endTime.getMinutes();
    
    const top = (startMinute / 60) * 100;
    // Duration in minutes, but cap at the slot boundary
    let durationMinutes = (eventEndOnSlotDay.getTime() - eventStartOnSlotDay.getTime()) / (1000 * 60);
    if (eventStartOnSlotDay < slotStartTime) {
      durationMinutes = (eventEndOnSlotDay.getTime() - slotStartTime.getTime()) / (1000*60);
    }
    if (eventEndOnSlotDay > slotEndTime) {
        durationMinutes = (slotEndTime.getTime() - (eventStartOnSlotDay < slotStartTime ? slotStartTime : eventStartOnSlotDay).getTime()) / (1000 * 60) ;
    }
    durationMinutes = Math.max(15, durationMinutes); // Min height for visibility


    const height = (durationMinutes / 60) * 100;

    return {
      top: `${top}%`,
      height: `${height}%`,
      position: 'absolute',
      left: '0.5rem', // Small offset from the hour line
      right: '0.5rem',
    };
  };


  return (
    <div className="space-y-8">
      <PixelatedContainer>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">Study Planner</h1>
            <p className="text-muted-foreground mt-1 text-lg">Organize your classes, deadlines, and study sessions.</p>
          </div>
          <PixelatedButton onClick={() => alert("Add new event dialog/form to be implemented.")}>
            <PlusCircle size={20} className="mr-2" />
            Add New Event
          </PixelatedButton>
        </div>
      </PixelatedContainer>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PixelatedContainer className="lg:col-span-1 bg-card p-3 md:p-4">
          <h2 className="text-2xl font-semibold text-primary-foreground mb-3 text-center lg:text-left">Calendar</h2>
          <div className="border-2 border-accent bg-card shadow-[2px_2px_0px_hsl(var(--primary))]">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="bg-background [&_table]:w-full" // Ensure table takes full width
              classNames={{
                caption: "text-primary-foreground border-b-2 border-accent py-2 text-lg",
                head_cell: "text-muted-foreground w-1/6 md:w-12 text-sm md:text-base", // Adjusted width
                cell: "text-center text-sm p-0 relative focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent/30 h-10 md:h-12", // Adjusted height
                day: "h-full w-full p-0 font-normal aria-selected:opacity-100 rounded-none hover:bg-accent/50 text-primary-foreground text-sm md:text-base", // Ensure day fills cell
                day_selected: "bg-accent text-accent-foreground rounded-none",
                day_today: "bg-accent/70 text-accent-foreground rounded-none",
                day_outside: "text-muted-foreground opacity-50 rounded-none",
                nav_button: "h-8 w-8 bg-transparent p-0 opacity-75 hover:opacity-100 border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground rounded-none",
              }}
            />
          </div>
        </PixelatedContainer>
        
        <PixelatedContainer className="lg:col-span-2 bg-card p-3 md:p-4">
          <h2 className="text-2xl font-semibold text-primary-foreground mb-4">
            Events for: {selectedDate ? format(selectedDate, 'EEEE, MMMM do, yyyy') : 'Select a Date'}
          </h2>
          <div className="h-[500px] overflow-y-auto relative border-t-2 border-accent pr-2"> {/* Added pr-2 for scrollbar space */}
            {timeSlots.map((slot, index) => (
              <div key={index} className="relative flex border-b-2 border-dashed border-accent/50 h-20"> {/* h-20 for 1 hour slot height */}
                <div className="w-20 text-xs md:text-sm text-muted-foreground pt-1 pr-2 text-right border-r-2 border-accent">
                  {format(slot, 'h a')}
                </div>
                <div className="flex-1 relative">
                  {/* Placeholder for events in this slot */}
                  {events
                    .filter(event => {
                        const eventStartHour = event.startTime.getHours();
                        const slotHour = slot.getHours();
                        // Check if event falls within this hour slot
                        return event.startTime.toDateString() === selectedDate?.toDateString() && 
                               eventStartHour === slotHour;

                    })
                    .map(event => (
                      <div
                        key={event.id}
                        className={cn(
                          'rounded-none border-l-4 p-2 text-xs shadow-[1px_1px_0px_hsl(var(--primary))]',
                          'text-primary-foreground overflow-hidden',
                           event.color ? event.color : 'bg-primary/70 border-primary'
                        )}
                        style={getEventStyle(event, slot)}
                        title={event.description}
                      >
                        <p className="font-semibold truncate">{event.title}</p>
                        <p className="truncate">{format(event.startTime, 'h:mm a')} - {format(event.endTime, 'h:mm a')}</p>
                      </div>
                    ))}
                </div>
              </div>
            ))}
            {events.length === 0 && selectedDate && (
              <p className="text-center text-muted-foreground pt-10">No events scheduled for this day.</p>
            )}
          </div>
        </PixelatedContainer>
      </div>
    </div>
  );
}

    