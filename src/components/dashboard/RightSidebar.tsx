
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ContentCard } from '@/components/ui/ContentCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { format } from '@/lib/dateUtils';
import { cn } from '@/lib/utils';

// Import Pixel Art Icons
import { PixelPetIcon } from '@/components/icons/PixelPetIcon';
import { PixelCoinIcon } from '@/components/icons/PixelCoinIcon';
import { PixelShieldIcon } from '@/components/icons/PixelShieldIcon';
import { PixelCalendarIcon } from '@/components/icons/PixelCalendarIcon';
import { PixelChevronRightIcon } from '@/components/icons/PixelChevronRightIcon';
import { PixelFlameIcon } from '@/components/icons/PixelFlameIcon';
import { PixelUserIcon } from '@/components/icons/PixelUserIcon';
import { PixelGearIcon } from '@/components/icons/PixelGearIcon';


interface UpcomingEvent {
  id: string;
  title: string;
  date: string; // ISO string
  type: string;
}

interface RightSidebarProps {
  userName: string;
  petName: string;
  petImageUrl: string;
  isGeneratingPetImage: boolean;
  upcomingEvents: UpcomingEvent[];
}

export function RightSidebar({
  userName,
  petName,
  petImageUrl,
  isGeneratingPetImage,
  upcomingEvents,
}: RightSidebarProps) {
  const userLevel = 5; 
  const userXP = 65; 
  const badges = [{id: '1', name: 'Early Bird'}, {id: '2', name: 'Streak Master'}, {id: '3', name: 'Learner I'}];
  const dayStreak = 7;

  return (
    <aside className="w-full lg:w-[320px] xl:w-[360px] space-y-6 shrink-0">
      {/* User Profile Card */}
      <ContentCard className="!p-0">
        <div className="p-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg">
            <div className="flex items-center gap-3 ">
              <div className="w-16 h-16 bg-gradient-to-tr from-primary to-accent rounded-full flex items-center justify-center text-background text-2xl font-semibold ring-4 ring-background/50">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground">{userName}</h3>
                <p className="text-xs text-muted-foreground">Level {userLevel}</p>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>XP</span>
                <span>{userXP}% to Level {userLevel+1}</span>
              </div>
              <Progress value={userXP} className="h-2 bg-background/30 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-accent" />
            </div>
        </div>
        <div className="p-4 space-y-3">
            <div className="flex items-center justify-around text-center">
                <div>
                    <PixelFlameIcon className="mx-auto mb-1 h-6 w-6 text-primary" />
                    <p className="text-sm font-medium text-foreground">{dayStreak}</p>
                    <p className="text-xs text-muted-foreground">Streak</p>
                </div>
                <div>
                    <PixelShieldIcon className="mx-auto mb-1 h-6 w-6 text-primary" />
                    <p className="text-sm font-medium text-foreground">{badges.length}</p>
                    <p className="text-xs text-muted-foreground">Badges</p>
                </div>
                 <div>
                    <PixelCoinIcon className="mx-auto mb-1 h-6 w-6 text-primary" />
                    <p className="text-sm font-medium text-foreground">125</p> 
                    <p className="text-xs text-muted-foreground">Coins</p>
                 </div>
            </div>
            <div className="flex gap-2 pt-2 border-t border-border">
                <Button variant="ghost" size="sm" className="flex-1 text-muted-foreground hover:text-foreground hover:bg-muted">
                    <PixelUserIcon className="mr-1.5 h-4 w-4" /> Profile
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 text-muted-foreground hover:text-foreground hover:bg-muted">
                    <PixelGearIcon className="mr-1.5 h-4 w-4" /> Settings
                </Button>
            </div>
        </div>
      </ContentCard>


      {/* Companion Module */}
      <ContentCard>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-md font-semibold text-foreground flex items-center gap-2">
            <PixelPetIcon className="h-5 w-5 text-primary" />
            Companion
          </h3>
          <Link href="/companion" className="text-xs text-primary hover:underline">View All</Link>
        </div>
        <div className="flex items-center gap-3">
          <div className={cn(
            "relative w-16 h-16 rounded-md overflow-hidden bg-muted flex items-center justify-center border-2",
            isGeneratingPetImage ? "border-dashed border-primary/50 animate-pulse" : "border-transparent"
          )}>
            <Image
              src={petImageUrl}
              alt={petName}
              width={64}
              height={64}
              className={cn("object-contain transition-opacity duration-300", isGeneratingPetImage && petImageUrl !== 'https://placehold.co/150x150/2A2E37/E0E0E0.png' ? 'opacity-30' : 'opacity-100')}
              unoptimized={petImageUrl.startsWith('data:')}
              priority
            />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-foreground">{petName}</h4>
            <p className="text-xs text-muted-foreground">Your study buddy is doing great!</p>
          </div>
        </div>
      </ContentCard>

      {/* Upcoming Events List */}
      <ContentCard>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-md font-semibold text-foreground flex items-center gap-2">
             <PixelCalendarIcon className="h-5 w-5 text-primary" />
             Upcoming
          </h3>
          <Link href="/planner" className="text-xs text-primary hover:underline">View Planner</Link>
        </div>
        {upcomingEvents.length > 0 ? (
          <ul className="space-y-2.5">
            {upcomingEvents.slice(0, 3).map((event) => (
              <li key={event.id} className="flex items-center gap-3 p-2.5 bg-muted/50 hover:bg-muted rounded-md transition-colors cursor-pointer">
                <div className={cn("w-1.5 h-8 rounded-full", event.type === 'Exam' ? 'bg-red-500' : event.type === 'Deadline' ? 'bg-orange-500' : 'bg-blue-500' )}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground truncate">{event.title}</p>
                  <p className="text-xs text-muted-foreground">{format(new Date(event.date), 'EEE, MMM d')} - {event.type}</p>
                </div>
                <PixelChevronRightIcon className="h-4 w-4 text-muted-foreground" />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-center text-muted-foreground py-4">No upcoming events. Time to plan!</p>
        )}
      </ContentCard>
    </aside>
  );
}
