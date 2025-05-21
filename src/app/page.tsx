
'use client';

import { useState, useEffect, useCallback } from 'react';
import { generatePetImage } from '@/ai/flows/generate-pet-image-flow';
import { RightSidebar } from '@/components/dashboard/RightSidebar';
import { QuickActionCard } from '@/components/dashboard/QuickActionCard';
import { ContentCard } from '@/components/ui/ContentCard';
import { DashboardAgendaView } from '@/components/dashboard/DashboardAgendaView';
import { WeekCalendarGrid } from '@/components/planner/WeekCalendarGrid'; 
import { EventFormDialog } from '@/components/planner/EventFormDialog';
import type { PlannerEvent } from '@/app/planner/page'; // Import PlannerEvent
import { eventTypeColors } from '@/app/planner/page'; // Import eventTypeColors

// Import Pixel Art Icons
import { PixelPlusIcon } from '@/components/icons/PixelPlusIcon';
import { PixelBrainIcon } from '@/components/icons/PixelBrainIcon';
import { PixelBookIcon } from '@/components/icons/PixelBookIcon';
import { PixelTrophyIcon } from '@/components/icons/PixelTrophyIcon';
import type { ElementType } from 'react';
import { format, addDays, setHours, setMinutes, setSeconds } from '@/lib/dateUtils';


const DEFAULT_DASHBOARD_PET_IMAGE = "https://placehold.co/150x150/1A1D2B/E0EFFF.png"; 

interface QuickActionItem {
  title: string;
  description: string;
  href: string;
  Icon: ElementType;
  iconBgClass?: string;
  iconTextClass?: string;
}

const initialDashboardEvents: Omit<PlannerEvent, 'id' | 'color'>[] = [
    { title: 'Submit History Essay Outline', startTime: setSeconds(setMinutes(setHours(new Date(), 0),0),0), endTime: setSeconds(setMinutes(setHours(new Date(), 0),0),0), type: 'Deadline'}, 
    { title: 'CS101 Lecture - Algorithms', startTime: setSeconds(setMinutes(setHours(addDays(new Date(), 1), 10),0),0), endTime: setSeconds(setMinutes(setHours(addDays(new Date(), 1), 11),30),0), type: 'Class'}, 
    { title: 'Team Sync Meeting', startTime: setSeconds(setMinutes(setHours(addDays(new Date(), 1), 14),0),0), endTime: setSeconds(setMinutes(setHours(addDays(new Date(), 1), 15),0),0), type: 'Meeting'}, 
    { title: 'Review Chapter 3 Notes - Biology', startTime: setSeconds(setMinutes(setHours(addDays(new Date(), 2), 16),0),0), endTime: setSeconds(setMinutes(setHours(addDays(new Date(), 2), 17),30),0), type: 'Study Session'},
    { title: 'Physics Exam II', startTime: setSeconds(setMinutes(setHours(addDays(new Date(), 5), 9),0),0), endTime: setSeconds(setMinutes(setHours(addDays(new Date(), 5), 11),0),0), type: 'Exam'},
    { title: 'Daily Scrum Meeting', startTime: setSeconds(setMinutes(setHours(new Date(), 9),0),0), endTime: setSeconds(setMinutes(setHours(new Date(), 9),30),0), type: 'Meeting' },
    { title: 'Work on Project Cerebro', startTime: setSeconds(setMinutes(setHours(new Date(), 14),0),0), endTime: setSeconds(setMinutes(setHours(new Date(), 16),0),0), type: 'Study Session' }
  ];


export default function DashboardPage() {
  const userName = "Norta Hwørting"; 
  const petName = "Vel"; 

  const [dashboardEvents, setDashboardEvents] = useState<PlannerEvent[]>(
    initialDashboardEvents.map((event, index) => ({
      ...event,
      id: `dash-event-${index + 1}-${Date.now()}`,
      color: eventTypeColors[event.type],
    }))
  );

  const [isDashboardEventDialogOpen, setIsDashboardEventDialogOpen] = useState(false);
  const [selectedEventForDialogDashboard, setSelectedEventForDialogDashboard] = useState<PlannerEvent | null>(null);
  const [newProposedStartTimeDashboard, setNewProposedStartTimeDashboard] = useState<Date | null>(null);


  const [dashboardPetImageUrl, setDashboardPetImageUrl] = useState(DEFAULT_DASHBOARD_PET_IMAGE);
  const [isGeneratingPetImage, setIsGeneratingPetImage] = useState(true);

  const quickActions: QuickActionItem[] = [
    { 
      title: "Create Flashcards", 
      description: "Craft new sets for your subjects.", 
      href: "/flashcards/new", 
      Icon: PixelBookIcon,
      iconBgClass: "bg-purple-500/10", 
      iconTextClass: "text-purple-400" 
    },
    { 
      title: "AI Card Generator", 
      description: "Let AI create flashcards from notes.", 
      href: "/ai-generator", 
      Icon: PixelBrainIcon,
      iconBgClass: "bg-teal-500/10",
      iconTextClass: "text-teal-400"
    },
    { 
      title: "Plan Your Week", 
      description: "Add tasks, deadlines, and study sessions.", 
      href: "/planner",
      Icon: PixelPlusIcon, // Using PixelPlusIcon as PixelCalendarIcon is used for nav
      iconBgClass: "bg-blue-500/10",
      iconTextClass: "text-blue-400"
    },
     { 
      title: "Explore Challenges", 
      description: "Test your knowledge with new packs.", 
      href: "/challenges", 
      Icon: PixelTrophyIcon,
      iconBgClass: "bg-orange-500/10",
      iconTextClass: "text-orange-400"
    },
  ];

  const fetchDashboardPetImage = useCallback(async () => {
    setIsGeneratingPetImage(true);
    setDashboardPetImageUrl(DEFAULT_DASHBOARD_PET_IMAGE);
    try {
      const result = await generatePetImage({ petType: "small, cute, abstract digital creature mascot, cyberpunk neon style" });
      if (result?.imageDataUri) {
        setDashboardPetImageUrl(result.imageDataUri);
      } else {
        setDashboardPetImageUrl(DEFAULT_DASHBOARD_PET_IMAGE);
      }
    } catch (error) {
      console.error("Error fetching dashboard pet image:", error);
      setDashboardPetImageUrl(DEFAULT_DASHBOARD_PET_IMAGE);
    } finally {
      setIsGeneratingPetImage(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardPetImage();
  }, [fetchDashboardPetImage]);
  
  const [currentTimeGreeting, setCurrentTimeGreeting] = useState('');
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setCurrentTimeGreeting('Good morning');
    else if (hour < 18) setCurrentTimeGreeting('Good afternoon');
    else setCurrentTimeGreeting('Good evening');
  }, []);

  const pageTitle = (
    <>
      {currentTimeGreeting}, <span className="text-primary">{userName}!</span>
    </>
  );
  const pageSubtitle = "Ready to conquer your studies today?";

  const today = new Date();
  const displayDays = [today, addDays(today, 1), addDays(today, 2)];

  const handleSlotClickDashboard = (dateTime: Date) => {
    setSelectedEventForDialogDashboard(null);
    setNewProposedStartTimeDashboard(dateTime);
    setIsDashboardEventDialogOpen(true);
  };

  const handleEventClickDashboard = (event: PlannerEvent) => {
    setSelectedEventForDialogDashboard(event);
    setNewProposedStartTimeDashboard(null);
    setIsDashboardEventDialogOpen(true);
  };
  
  const handleSaveEventDashboard = (eventData: Omit<PlannerEvent, 'id' | 'color'> & { id?: string }) => {
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
    setIsDashboardEventDialogOpen(false);
    setSelectedEventForDialogDashboard(null);
    setNewProposedStartTimeDashboard(null);
  };

  const handleDeleteEventDashboard = (eventId: string) => {
    setDashboardEvents(prevEvents => prevEvents.filter(e => e.id !== eventId));
    setIsDashboardEventDialogOpen(false);
    setSelectedEventForDialogDashboard(null);
    setNewProposedStartTimeDashboard(null);
  };


  return (
    <div className="flex flex-col lg:flex-row gap-6 xl:gap-8">
      {/* Main Content Area */}
      <div className="flex-grow space-y-6 xl:space-y-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8">
          {/* Column 1: Agenda View */}
          <DashboardAgendaView events={dashboardEvents} title={pageTitle} subtitle={pageSubtitle} />

          {/* Column 2: Mini Week Calendar */}
          <ContentCard className="flex flex-col">
            <h2 className="text-xl font-semibold text-foreground mb-3 p-4 sm:p-6 pb-0">This Week</h2>
            <div className="flex-grow overflow-hidden">
              <WeekCalendarGrid
                currentDate={new Date()}
                daysToDisplay={displayDays}
                events={dashboardEvents}
                startHour={8}
                endHour={18}
                condensedMode={true}
                onSlotClick={handleSlotClickDashboard}
                onEventClick={handleEventClickDashboard}
              />
            </div>
          </ContentCard>
        </div>
      </div>

      {/* Right Sidebar */}
      <RightSidebar
        userName={userName}
        petName={petName}
        petImageUrl={dashboardPetImageUrl}
        isGeneratingPetImage={isGeneratingPetImage} 
        quickActions={quickActions}
      />

      <EventFormDialog
        isOpen={isDashboardEventDialogOpen}
        onClose={() => {
          setIsDashboardEventDialogOpen(false);
          setSelectedEventForDialogDashboard(null);
          setNewProposedStartTimeDashboard(null);
        }}
        eventData={selectedEventForDialogDashboard}
        proposedStartTime={newProposedStartTimeDashboard}
        onSave={handleSaveEventDashboard}
        onDelete={selectedEventForDialogDashboard ? handleDeleteEventDashboard : undefined}
      />
    </div>
  );
}
