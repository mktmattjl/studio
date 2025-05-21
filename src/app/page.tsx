
'use client';

import { PixelatedContainer } from '@/components/PixelatedContainer';
import { PixelatedButton } from '@/components/PixelatedButton';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { generatePetImage } from '@/ai/flows/generate-pet-image-flow';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const DEFAULT_DASHBOARD_PET_IMAGE = "https://placehold.co/150x150.png?bg=333333&fc=FFFFFF";

export default function DashboardPage() {
  const userName = "PlayerOne"; 
  const petName = "PixelPup"; 

  const [dashboardPetImageUrl, setDashboardPetImageUrl] = useState(DEFAULT_DASHBOARD_PET_IMAGE);
  const [isGeneratingImage, setIsGeneratingImage] = useState(true);

  const upcomingEvents = [
    { id: '1', title: 'Math Exam', date: '2024-08-15', type: 'Exam' },
    { id: '2', title: 'History Project Due', date: '2024-08-20', type: 'Deadline' },
    { id: '3', title: 'Study CS Chapter 5', date: '2024-08-10', type: 'Study Session' },
  ];

  const fetchDashboardPetImage = useCallback(async () => {
    setIsGeneratingImage(true);
    setDashboardPetImageUrl(DEFAULT_DASHBOARD_PET_IMAGE);
    try {
      const result = await generatePetImage({ petType: "small cute pixel pet icon" });
      if (result?.imageDataUri) {
        setDashboardPetImageUrl(result.imageDataUri);
      } else {
        setDashboardPetImageUrl(DEFAULT_DASHBOARD_PET_IMAGE);
      }
    } catch (error) {
      console.error("Error fetching dashboard pet image:", error);
      setDashboardPetImageUrl(DEFAULT_DASHBOARD_PET_IMAGE);
    } finally {
      setIsGeneratingImage(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardPetImage();
  }, [fetchDashboardPetImage]);

  return (
    <div className="space-y-8">
      <PixelatedContainer>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Welcome back, <span className="text-accent">{userName}</span>!</h1> {/* Changed text-primary-foreground to text-foreground */}
        <p className="text-muted-foreground mt-2 text-lg">Ready to supercharge your studies? Let's get to it!</p>
      </PixelatedContainer>

      <div className="grid md:grid-cols-2 gap-6">
        <PixelatedContainer className="bg-card">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Upcoming Deadlines & Events</h2> {/* Changed text-primary-foreground to text-foreground */}
          {upcomingEvents.length > 0 ? (
            <ul className="space-y-3">
              {upcomingEvents.map((event) => (
                <li key={event.id} className="p-3 bg-background/50 border-l-4 border-accent">
                  <p className="font-semibold text-foreground">{event.title} - <span className="text-sm text-muted-foreground">{format(new Date(event.date), 'MM/dd/yyyy')}</span></p> {/* Changed text-primary-foreground to text-foreground */}
                  <p className="text-xs text-muted-foreground">{event.type}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No upcoming deadlines or events. Time to plan or relax!</p>
          )}
          <Link href="/planner" passHref>
            <PixelatedButton className="mt-4 w-full">View Full Planner</PixelatedButton>
          </Link>
        </PixelatedContainer>

        <PixelatedContainer className="bg-card flex flex-col items-center justify-center">
          <div className="flex justify-between items-center w-full mb-2 px-2">
            <h2 className="text-2xl font-semibold text-foreground">Your Companion: {petName}</h2> {/* Changed text-primary-foreground to text-foreground */}
            <PixelatedButton
              size="sm"
              variant="ghost"
              onClick={fetchDashboardPetImage}
              disabled={isGeneratingImage}
              className="p-1 h-auto"
              title="Generate new image"
            >
              <RefreshCw size={16} className={isGeneratingImage ? "animate-spin text-accent" : "text-accent"} />
            </PixelatedButton>
          </div>
          <div className="relative w-[150px] h-[150px] border-4 border-accent shadow-[4px_4px_0px_hsl(var(--primary))] bg-muted/50 flex items-center justify-center">
            {isGeneratingImage && dashboardPetImageUrl === DEFAULT_DASHBOARD_PET_IMAGE && (
              <p className="text-xs text-muted-foreground">Art loading...</p>
            )}
            <Image
              src={dashboardPetImageUrl}
              alt="Virtual Pet Thumbnail"
              width={150}
              height={150}
              className={cn("object-contain", isGeneratingImage && dashboardPetImageUrl !== DEFAULT_DASHBOARD_PET_IMAGE ? "opacity-50" : "")}
              data-ai-hint="pixel pet"
              unoptimized={dashboardPetImageUrl.startsWith('data:')} // Important for data URIs
              priority
            />
          </div>
          <p className="text-muted-foreground mt-2 text-center">Keep studying to earn coins and care for {petName}!</p>
          <Link href="/companion" passHref>
            <PixelatedButton className="mt-4" disabled={isGeneratingImage}>Visit {petName}</PixelatedButton>
          </Link>
        </PixelatedContainer>
      </div>
      
      <PixelatedContainer className="bg-card">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Quick Actions</h2> {/* Changed text-primary-foreground to text-foreground */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/flashcards/new" passHref><PixelatedButton variant="outline" className="w-full">Create Flashcards</PixelatedButton></Link>
          <Link href="/ai-generator" passHref><PixelatedButton variant="outline" className="w-full">AI Generate Cards</PixelatedButton></Link>
          <Link href="/planner#new-event" passHref><PixelatedButton variant="outline" className="w-full">Add New Event</PixelatedButton></Link>
        </div>
      </PixelatedContainer>

    </div>
  );
}
