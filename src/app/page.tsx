
'use client';

import { useState, useEffect, useCallback } from 'react';
import { generatePetImage } from '@/ai/flows/generate-pet-image-flow';
import { RightSidebar } from '@/components/dashboard/RightSidebar';
import { QuickActionCard } from '@/components/dashboard/QuickActionCard';
import { ContentCard } from '@/components/ui/ContentCard';
import { DashboardAgendaView } from '@/components/dashboard/DashboardAgendaView';
import { WeekCalendarGrid } from '@/components/planner/WeekCalendarGrid'; // Import WeekCalendarGrid

// Import Pixel Art Icons
import { PixelPlusIcon } from '@/components/icons/PixelPlusIcon';
import { PixelBrainIcon } from '@/components/icons/PixelBrainIcon';
import { PixelBookIcon } from '@/components/icons/PixelBookIcon';
import { PixelTrophyIcon } from '@/components/icons/PixelTrophyIcon';
import type { ElementType } from 'react';
import { format } from '@/lib/dateUtils';


const DEFAULT_DASHBOARD_PET_IMAGE = "https://placehold.co/150x150/1A1D2B/E0EFFF.png"; 

interface QuickActionItem {
  title: string;
  description: string;
  href: string;
  Icon: ElementType;
  iconBgClass?: string;
  iconTextClass?: string;
}

export default function DashboardPage() {
  const userName = "Norta Hwørting"; 
  const petName = "Vel"; 

  const [dashboardPetImageUrl, setDashboardPetImageUrl] = useState(DEFAULT_DASHBOARD_PET_IMAGE);
  const [isGeneratingPetImage, setIsGeneratingPetImage] = useState(true);

  const upcomingEvents = [
    { id: '1', title: 'Submit History Essay Outline', date: new Date().toISOString().split('T')[0], type: 'Deadline', startTime: new Date(new Date().setHours(0,0,0,0)), endTime: new Date(new Date().setHours(0,0,0,0))}, 
    { id: '2', title: 'CS101 Lecture - Algorithms', date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0], type: 'Class', startTime: new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(10,0,0,0)), endTime: new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(11,30,0,0)) }, 
    { id: '3', title: 'Team Sync Meeting', date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0], type: 'Meeting', startTime: new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(14,0,0,0)), endTime: new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(15,0,0,0)) }, 
    { id: '4', title: 'Review Chapter 3 Notes - Biology', date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0], type: 'Study Session', startTime: new Date(new Date(new Date().setDate(new Date().getDate() + 2)).setHours(16,0,0,0)), endTime: new Date(new Date(new Date().setDate(new Date().getDate() + 2)).setHours(17,30,0,0)) },
    { id: '5', title: 'Physics Exam II', date: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split('T')[0], type: 'Exam', startTime: new Date(new Date(new Date().setDate(new Date().getDate() + 5)).setHours(9,0,0,0)), endTime: new Date(new Date(new Date().setDate(new Date().getDate() + 5)).setHours(11,0,0,0)) },
    // Adding an event for the current day to test the week view
    { id: '6', title: 'Daily Scrum Meeting', date: new Date().toISOString().split('T')[0], type: 'Meeting', startTime: new Date(new Date().setHours(9,0,0,0)), endTime: new Date(new Date().setHours(9,30,0,0)) },
    { id: '7', title: 'Work on Project Cerebro', date: new Date().toISOString().split('T')[0], type: 'Study Session', startTime: new Date(new Date().setHours(14,0,0,0)), endTime: new Date(new Date().setHours(16,0,0,0)) }
  ].map(event => ({
    ...event,
    // Ensure 'color' is assigned based on type for WeekCalendarGrid
    color: event.type === 'Deadline' ? 'bg-red-500/80 border-red-400 text-red-50' :
           event.type === 'Class' ? 'bg-blue-500/80 border-blue-400 text-blue-50' :
           event.type === 'Meeting' ? 'bg-purple-500/80 border-purple-400 text-purple-50' :
           event.type === 'Study Session' ? 'bg-green-500/80 border-green-400 text-green-50' :
           event.type === 'Exam' ? 'bg-yellow-500/80 border-yellow-400 text-yellow-950' :
           'bg-gray-500/80 border-gray-400 text-gray-50',
  }));


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
      Icon: PixelPlusIcon,
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


  return (
    <div className="flex flex-col lg:flex-row gap-6 xl:gap-8">
      {/* Main Content Area */}
      <div className="flex-grow space-y-6 xl:space-y-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8">
          {/* Column 1: Agenda View */}
          <DashboardAgendaView events={upcomingEvents} title={pageTitle} subtitle={pageSubtitle} />

          {/* Column 2: Mini Week Calendar */}
          <ContentCard className="flex flex-col">
            <h2 className="text-xl font-semibold text-foreground mb-3 p-4 sm:p-6 pb-0">This Week</h2>
            <div className="flex-grow overflow-hidden">
              <WeekCalendarGrid
                currentDate={new Date()}
                events={upcomingEvents}
                startHour={8}
                endHour={18}
                condensedMode={true}
                // onEventClick={(event) => alert(`Clicked: ${event.title}`)} // Optional: for debugging or linking to planner
                // onSlotClick={(dateTime) => alert(`Clicked slot: ${format(dateTime, 'MMM d, p')}`)} // Optional
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
    </div>
  );
}
