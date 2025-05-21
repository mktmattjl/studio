
'use client';

import { useState, useEffect, useCallback } from 'react';
import { generatePetImage } from '@/ai/flows/generate-pet-image-flow';
import { RightSidebar } from '@/components/dashboard/RightSidebar';
import { JumpBackInCard } from '@/components/dashboard/JumpBackInCard';
import { QuickActionCard } from '@/components/dashboard/QuickActionCard';
import { PlusCircle, Brain, BookCopy, FileText, Settings, MessageSquare, Award } from 'lucide-react';
import { format } from 'date-fns';

const DEFAULT_DASHBOARD_PET_IMAGE = "https://placehold.co/150x150/151A21/9CA3AF.png"; // Dark placeholder

export default function DashboardPage() {
  const userName = "Norta Hwørting"; // As per reference style
  const petName = "Vel"; // As per reference

  const [dashboardPetImageUrl, setDashboardPetImageUrl] = useState(DEFAULT_DASHBOARD_PET_IMAGE);
  const [isGeneratingPetImage, setIsGeneratingPetImage] = useState(true);

  const upcomingEvents = [
    { id: '1', title: 'Submit Project Proposal', date: '2024-08-15', type: 'Deadline' },
    { id: '2', title: 'Team Sync Meeting', date: '2024-08-16', type: 'Meeting' },
    { id: '3', title: 'Review Chapter 3 Notes', date: '2024-08-18', type: 'Study Session' },
  ];

  const quickActions = [
    { 
      title: "Create Flashcards", 
      description: "Craft new sets for your subjects.", 
      href: "/flashcards/new", 
      Icon: BookCopy,
      iconBgClass: "bg-purple-500/10",
      iconTextClass: "text-purple-400"
    },
    { 
      title: "AI Card Generator", 
      description: "Let AI create flashcards from notes.", 
      href: "/ai-generator", 
      Icon: Brain,
      iconBgClass: "bg-teal-500/10",
      iconTextClass: "text-teal-400"
    },
    { 
      title: "Plan Your Week", 
      description: "Add tasks, deadlines, and study sessions.", 
      href: "/planner",
      Icon: PlusCircle,
      iconBgClass: "bg-blue-500/10",
      iconTextClass: "text-blue-400"
    },
     { 
      title: "Explore Challenges", 
      description: "Test your knowledge with new packs.", 
      href: "/challenges", // New hypothetical page
      Icon: Award,
      iconBgClass: "bg-orange-500/10",
      iconTextClass: "text-orange-400"
    },
  ];

  const fetchDashboardPetImage = useCallback(async () => {
    setIsGeneratingPetImage(true);
    setDashboardPetImageUrl(DEFAULT_DASHBOARD_PET_IMAGE);
    try {
      const result = await generatePetImage({ petType: "small, cute, abstract digital creature mascot" });
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
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            {currentTimeGreeting}, <span className="text-primary">{userName}!</span>
          </h1>
          <p className="text-md text-muted-foreground">
            Ready to conquer your studies today?
          </p>
        </div>

        <JumpBackInCard />
        
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> {/* Changed to 2 columns for better fit */}
            {quickActions.map(action => (
              <QuickActionCard 
                key={action.title}
                title={action.title}
                description={action.description}
                href={action.href}
                Icon={action.Icon}
                iconBgClass={action.iconBgClass}
                iconTextClass={action.iconTextClass}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <RightSidebar
        userName={userName}
        petName={petName}
        petImageUrl={dashboardPetImageUrl}
        isGeneratingPetImage={isGeneratingPetImage} // Pass this down if needed by sidebar logic
        upcomingEvents={upcomingEvents}
      />
    </div>
  );
}
