import { PixelatedContainer } from '@/components/PixelatedContainer';
import { PixelatedButton } from '@/components/PixelatedButton';
import { Calendar as CalendarIcon, PlusCircle } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar"; // Using ShadCN calendar

export default function PlannerPage() {
  // This state would come from a useEffect hook in a client component
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="space-y-8">
      <PixelatedContainer>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">Study Planner</h1>
            <p className="text-muted-foreground mt-1 text-lg">Organize your classes, deadlines, and study sessions.</p>
          </div>
          {/* This button would typically open a dialog or navigate to a form */}
          <PixelatedButton>
            <PlusCircle size={20} className="mr-2" />
            Add New Event
          </PixelatedButton>
        </div>
      </PixelatedContainer>

      <PixelatedContainer className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3">
          <h2 className="text-2xl font-semibold text-primary-foreground mb-4">Calendar</h2>
          <div className="border-2 border-accent p-1 bg-card shadow-[2px_2px_0px_hsl(var(--primary))]">
            {/* 
              The ShadCN Calendar will inherit some global styles. 
              Further pixelation might require custom styling or a different calendar component.
            */}
            <Calendar
              mode="single"
              selected={date}
              onSelect={() => alert("Date selection would be handled by a client component's state setter.")} // Placeholder for onSelect with client component
              className="bg-background"
              classNames={{
                caption: "text-primary-foreground border-b-2 border-accent py-2",
                head_cell: "text-muted-foreground w-10",
                cell: "text-center text-sm p-0 relative focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent/30",
                day: "h-10 w-10 p-0 font-normal aria-selected:opacity-100 rounded-none hover:bg-accent/50 text-primary-foreground",
                day_selected: "bg-accent text-accent-foreground rounded-none",
                day_today: "bg-accent/70 text-accent-foreground rounded-none",
                day_outside: "text-muted-foreground opacity-50 rounded-none",
                nav_button: "h-8 w-8 bg-transparent p-0 opacity-75 hover:opacity-100 border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground rounded-none",
              }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">Full week/month views coming soon!</p>
        </div>
        <div className="lg:w-2/3">
          <h2 className="text-2xl font-semibold text-primary-foreground mb-4">Upcoming Events for {date ? date.toLocaleDateString() : 'Selected Date'}</h2>
          <div className="space-y-3">
            {/* Placeholder event items */}
            <div className="p-3 bg-background/50 border-l-4 border-accent">
              <p className="font-semibold text-primary-foreground">09:00 AM - Computer Science Lecture</p>
              <p className="text-xs text-muted-foreground">Room 301 / Prof. Ada</p>
            </div>
            <div className="p-3 bg-background/50 border-l-4 border-accent">
              <p className="font-semibold text-primary-foreground">02:00 PM - Study Group: Algorithms</p>
              <p className="text-xs text-muted-foreground">Library, Group Room B</p>
            </div>
            <div className="p-3 bg-background/50 border-l-4 border-destructive">
              <p className="font-semibold text-destructive-foreground">DEADLINE: Submit Physics Lab Report</p>
              <p className="text-xs text-muted-foreground">Online Portal by 11:59 PM</p>
            </div>
            <p className="text-center text-muted-foreground pt-4"> (Event listing is a placeholder) </p>
          </div>
        </div>
      </PixelatedContainer>
    </div>
  );
}

// Adding React for useState type hint, it would be a client component
import React from 'react';
