
'use client';

import { useState, useEffect, useCallback } from 'react';
import { generatePetImage } from '@/ai/flows/generate-pet-image-flow';
import { RightSidebar } from '@/components/dashboard/RightSidebar';
import { ContentCard } from '@/components/ui/ContentCard';
import { DashboardAgendaView } from '@/components/dashboard/DashboardAgendaView';
import { WeekCalendarGrid } from '@/components/planner/WeekCalendarGrid'; 
import { EventFormDialog } from '@/components/planner/EventFormDialog';
import type { PlannerEvent } from '@/app/planner/page';
import { eventTypeColors } from '@/app/planner/page'; 

// Fantasy Pixel Art Icons
import { PixelScrollIcon } from '@/components/icons/fantasy/PixelScrollIcon'; // For Create Flashcards
import { PixelMagicOrbIcon } from '@/components/icons/fantasy/PixelMagicOrbIcon'; // For AI Card Gen
import { PixelQuillIcon } from '@/components/icons/fantasy/PixelQuillIcon'; // For Plan Your Week / Add Event
import { PixelChestIcon } from '@/components/icons/fantasy/PixelChestIcon'; // For Explore Challenges / Rewards

import type { ElementType } from 'react';
import { format, addDays, setHours, setMinutes, setSeconds } from '@/lib/dateUtils';

const DEFAULT_DASHBOARD_PET_IMAGE = "https://placehold.co/150x150/3D3630/F3EADA.png"; // Dark wood bg, parchment fg

interface QuickActionItem {
  title: string;
  description: string;
  href: string;
  Icon: ElementType;
  iconBgClass?: string; 
  iconTextClass?: string;
}

const initialDashboardEvents: Omit<PlannerEvent, 'id' | 'color'>[] = [
    { title: 'Submit History Scroll (Essay Outline)', startTime: setSeconds(setMinutes(setHours(new Date(), 0),0),0), endTime: setSeconds(setMinutes(setHours(new Date(), 0),0),0), type: 'deadline'}, 
    { title: 'Lecture: Ancient Algorithms', startTime: setSeconds(setMinutes(setHours(addDays(new Date(), 1), 10),0),0), endTime: setSeconds(setMinutes(setHours(addDays(new Date(), 1), 11),30),0), type: 'class'}, 
    { title: 'Council Meeting (Team Sync)', startTime: setSeconds(setMinutes(setHours(addDays(new Date(), 1), 14),0),0), endTime: setSeconds(setMinutes(setHours(addDays(new Date(), 1), 15),0),0), type: 'meeting'}, 
    { title: 'Decipher Chapter 3 Tomes (Biology)', startTime: setSeconds(setMinutes(setHours(addDays(new Date(), 2), 16),0),0), endTime: setSeconds(setMinutes(setHours(addDays(new Date(), 2), 17),30),0), type: 'study_session'},
    { title: 'Trial of Physics II (Exam)', startTime: setSeconds(setMinutes(setHours(addDays(new Date(), 5), 9),0),0), endTime: setSeconds(setMinutes(setHours(addDays(new Date(), 5), 11),0),0), type: 'exam'},
    { title: 'Morning Scry (Daily Scrum)', startTime: setSeconds(setMinutes(setHours(new Date(), 9),0),0), endTime: setSeconds(setMinutes(setHours(new Date(), 9),30),0), type: 'meeting' },
    { title: 'Forge Project Cerebro (Study)', startTime: setSeconds(setMinutes(setHours(new Date(), 14),0),0), endTime: setSeconds(setMinutes(setHours(new Date(), 16),0),0), type: 'study_session' }
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
      title: "Scribe Scrolls", 
      description: "Craft new lore for your adventures.", 
      href: "/flashcards/new", 
      Icon: PixelScrollIcon,
      iconBgClass: "bg-accent/20", 
      iconTextClass: "text-accent" 
    },
    { 
      title: "Summon Knowledge", 
      description: "Let the Oracle conjure insights from notes.", 
      href: "/ai-generator", 
      Icon: PixelMagicOrbIcon,
      iconBgClass: "bg-primary/20", 
      iconTextClass: "text-primary"
    },
    { 
      title: "Chart Your Path", 
      description: "Record quests, trials, and study rituals.", 
      href: "/planner",
      Icon: PixelQuillIcon, 
      iconBgClass: "bg-secondary/20", 
      iconTextClass: "text-secondary"
    },
     { 
      title: "Seek Challenges", 
      description: "Test your mettle with ancient trials.", 
      href: "/challenges", 
      Icon: PixelChestIcon, 
      iconBgClass: "bg-gold-accent/20",
      iconTextClass: "text-gold-accent"
    },
  ];

  const fetchDashboardPetImage = useCallback(async () => {
    setIsGeneratingPetImage(true);
    setDashboardPetImageUrl(DEFAULT_DASHBOARD_PET_IMAGE);
    try {
      const result = await generatePetImage({ petType: "heroic fantasy pixel art creature companion, detailed, friendly, vibrant jewel tones" });
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
    if (hour < 12) setCurrentTimeGreeting('Good morrow');
    else if (hour < 18) setCurrentTimeGreeting('Well met this afternoon');
    else setCurrentTimeGreeting('Greetings of the evening');
  }, []);

  const pageTitle = (
    <>
      {currentTimeGreeting}, <span className="text-foreground">{userName}!</span> {/* Changed text-primary to text-foreground */}
    </>
  );
  const pageSubtitle = "What quests await thee today, brave scholar?";

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
          <DashboardAgendaView events={dashboardEvents} title={pageTitle} subtitle={pageSubtitle} />

          <ContentCard className="flex flex-col">
            <h2 className="text-xl font-pixel text-primary mb-3 p-4 sm:p-6 pb-0">This Week's Portents</h2>
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
