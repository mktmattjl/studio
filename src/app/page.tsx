
'use client';

import { useState, useEffect, useCallback } from 'react';
import { generatePetImage } from '@/ai/flows/generate-pet-image-flow';
import { RightSidebar } from '@/components/dashboard/RightSidebar';
import { JumpBackInCard } from '@/components/dashboard/JumpBackInCard';
import { QuickActionCard } from '@/components/dashboard/QuickActionCard';
import { ContentCard } from '@/components/ui/ContentCard';
import { DashboardAgendaView } from '@/components/dashboard/DashboardAgendaView'; // New import

// Import Pixel Art Icons
import { PixelPlusIcon } from '@/components/icons/PixelPlusIcon';
import { PixelBrainIcon } from '@/components/icons/PixelBrainIcon';
import { PixelBookIcon } from '@/components/icons/PixelBookIcon';
import { PixelTrophyIcon } from '@/components/icons/PixelTrophyIcon';


const DEFAULT_DASHBOARD_PET_IMAGE = "https://placehold.co/150x150/1A1D2B/E0EFFF.png"; 

export default function DashboardPage() {
  const userName = "Norta Hwørting"; 
  const petName = "Vel"; 

  const [dashboardPetImageUrl, setDashboardPetImageUrl] = useState(DEFAULT_DASHBOARD_PET_IMAGE);
  const [isGeneratingPetImage, setIsGeneratingPetImage] = useState(true);

  // This data will now be used by DashboardAgendaView
  const upcomingEvents = [
    { id: '1', title: 'Submit History Essay Outline', date: new Date().toISOString().split('T')[0], type: 'Deadline' }, // Example for today
    { id: '2', title: 'CS101 Lecture - Algorithms', date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0], type: 'Class' }, // Example for tomorrow
    { id: '3', title: 'Team Sync Meeting', date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0], type: 'Meeting' }, // Example for tomorrow
    { id: '4', title: 'Review Chapter 3 Notes - Biology', date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0], type: 'Study Session' },
    { id: '5', title: 'Physics Exam II', date: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split('T')[0], type: 'Exam' },
  ];

  const quickActions = [
    { 
      title: "Create Flashcards", 
      description: "Craft new sets for your subjects.", 
      href: "/flashcards/new", 
      Icon: PixelBookIcon,
      iconBgClass: "bg-purple-500/10", // Will be overridden by ContentCard theme
      iconTextClass: "text-purple-400" // Will be overridden by ContentCard theme
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
      href: "/challenges", // Assuming /challenges page exists or will be created
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


  return (
    <div className="flex flex-col lg:flex-row gap-6 xl:gap-8">
      {/* Main Content Area */}
      <div className="flex-grow space-y-6 xl:space-y-8">
        <div className="mb-4"> 
          <h1 className="text-xl sm:text-2xl font-bold text-foreground"> 
            {currentTimeGreeting}, <span className="text-primary">{userName}!</span>
          </h1>
          <p className="text-md text-muted-foreground">
            Ready to conquer your studies today?
          </p>
        </div>

        {/* New Central Focus: Agenda View */}
        <DashboardAgendaView events={upcomingEvents} />
        
        {/* Relocated Jump Back In Card */}
        <JumpBackInCard />
        
        <ContentCard>
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map(action => (
              <QuickActionCard 
                key={action.title}
                title={action.title}
                description={action.description}
                href={action.href}
                Icon={action.Icon}
                // iconBgClass and iconTextClass are handled by ContentCard's theme or internal QuickActionCard styling
              />
            ))}
          </div>
        </ContentCard>
      </div>

      {/* Right Sidebar */}
      <RightSidebar
        userName={userName}
        petName={petName}
        petImageUrl={dashboardPetImageUrl}
        isGeneratingPetImage={isGeneratingPetImage} 
        // upcomingEvents prop removed
      />
    </div>
  );
}
