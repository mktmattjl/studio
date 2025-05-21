
'use client';

import { useState, useEffect, useCallback } from 'react';
import { generatePetImage } from '@/ai/flows/generate-pet-image-flow';
import { RightSidebar } from '@/components/dashboard/RightSidebar';
// import { JumpBackInCard } from '@/components/dashboard/JumpBackInCard'; // Removed
import { QuickActionCard } from '@/components/dashboard/QuickActionCard';
import { ContentCard } from '@/components/ui/ContentCard';
import { DashboardAgendaView } from '@/components/dashboard/DashboardAgendaView';

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
        
        <DashboardAgendaView events={upcomingEvents} title={pageTitle} subtitle={pageSubtitle} />
        
        {/* JumpBackInCard removed from here */}
        
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
      />
    </div>
  );
}
