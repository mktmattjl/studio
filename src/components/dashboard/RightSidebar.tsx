
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ContentCard } from '@/components/ui/ContentCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { ElementType } from 'react';
import { QuickActionCard } from '@/components/dashboard/QuickActionCard';
import { useRouter } from 'next/navigation';

// Fantasy Pixel Art Icons
import { PixelPetIcon } from '@/components/icons/fantasy/PixelPetIcon'; // Generic fantasy pet or specific companion icon
import { PixelGoldCoinIcon } from '@/components/icons/fantasy/PixelGoldCoinIcon';
import { PixelOrnateShieldIcon } from '@/components/icons/fantasy/PixelOrnateShieldIcon'; // For Badges
import { PixelFlamingSwordIcon } from '@/components/icons/fantasy/PixelFlamingSwordIcon'; // For Streak
import { PixelFantasyAvatarIcon } from '@/components/icons/fantasy/PixelFantasyAvatarIcon';
import { PixelFantasySettingsIcon } from '@/components/icons/fantasy/PixelFantasySettingsIcon';
// import { PixelCalendarIcon } from '@/components/icons/PixelCalendarIcon'; // Removed, as upcoming events integrated into main

interface QuickActionItem {
  title: string;
  description: string;
  href: string;
  Icon: ElementType;
  iconBgClass?: string;
  iconTextClass?: string;
}

interface RightSidebarProps {
  userName: string;
  petName: string;
  petImageUrl: string;
  isGeneratingPetImage: boolean;
  quickActions: QuickActionItem[];
}

export function RightSidebar({
  userName,
  petName,
  petImageUrl,
  isGeneratingPetImage,
  quickActions,
}: RightSidebarProps) {
  const router = useRouter();
  const userLevel = 5;
  const userXP = 65;
  const thematicLevelTitle = "Novice Scribe"; // Example
  const badges = [{id: '1', name: 'Early Bird'}, {id: '2', name: 'Streak Master'}, {id: '3', name: 'Learner I'}];
  const dayStreak = 7;
  const currentCoins = 125; // Example coins

  return (
    <aside className="w-full lg:w-[320px] xl:w-[360px] space-y-6 shrink-0">
      {/* User Profile Card */}
      <ContentCard className="!p-0 overflow-hidden">
        <div className="p-4 bg-card rounded-t-lg border-b border-border">
            <div className="flex items-center gap-3 ">
              <div className="w-16 h-16 bg-muted border-2 border-border rounded-md flex items-center justify-center text-foreground text-3xl font-pixel">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-pixel text-xl text-primary">{userName}</h3>
                <p className="text-sm text-muted-foreground">Level {userLevel} - {thematicLevelTitle}</p>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>XP</span>
                <span>{userXP}% to Level {userLevel+1}</span>
              </div>
              <Progress value={userXP} className="h-2.5 bg-muted/50 [&>div]:bg-xp-bar-color rounded" />
            </div>
        </div>
        <div className="p-4 space-y-3">
            <div className="flex items-center justify-around text-center">
                <div>
                    <PixelFlamingSwordIcon className="mx-auto mb-1 h-7 w-7 text-destructive" /> {/* Ruby Red for streak flame */}
                    <p className="text-sm font-medium text-foreground">{dayStreak}</p>
                    <p className="text-xs text-muted-foreground">Streak</p>
                </div>
                <div>
                    <PixelOrnateShieldIcon className="mx-auto mb-1 h-7 w-7 text-secondary" /> {/* Emerald Green for badges */}
                    <p className="text-sm font-medium text-foreground">{badges.length}</p>
                    <p className="text-xs text-muted-foreground">Badges</p>
                </div>
                 <div>
                    <PixelGoldCoinIcon className="mx-auto mb-1 h-7 w-7 text-gold-accent" />
                    <p className="text-sm font-medium text-foreground">{currentCoins}</p>
                    <p className="text-xs text-muted-foreground">Coins</p>
                 </div>
            </div>
            <div className="flex gap-2 pt-2 border-t border-border/50">
                <Button variant="outline" size="sm" className="flex-1 text-muted-foreground hover:bg-muted hover:text-foreground" onClick={() => router.push('/profile')}>
                    <PixelFantasyAvatarIcon className="mr-1.5 h-4 w-4" /> Profile
                </Button>
                <Button variant="outline" size="sm" className="flex-1 text-muted-foreground hover:bg-muted hover:text-foreground" onClick={() => router.push('/settings')}>
                    <PixelFantasySettingsIcon className="mr-1.5 h-4 w-4" /> Settings
                </Button>
            </div>
        </div>
      </ContentCard>

      {/* Companion Module */}
      <ContentCard>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-pixel text-primary flex items-center gap-2">
            <PixelPetIcon className="h-5 w-5" /> {/* Use a generic or specific pet icon */}
            Companion
          </h3>
          <Link href="/companion" className="text-sm font-medium text-accent hover:text-accent/80 hover:underline">View All</Link>
        </div>
        <div className="flex items-center gap-3">
          <div className={("relative w-16 h-16 rounded-md overflow-hidden bg-muted flex items-center justify-center border-2 " + (isGeneratingPetImage ? "border-dashed border-primary/50 animate-pulse" : "border-border"))}>
            <Image
              src={petImageUrl}
              alt={petName}
              width={64}
              height={64}
              className={("object-contain transition-opacity duration-300 " + (isGeneratingPetImage && petImageUrl !== 'https://placehold.co/150x150/3D3630/F3EADA.png' ? 'opacity-30' : 'opacity-100'))}
              unoptimized={petImageUrl.startsWith('data:')}
              priority
              data-ai-hint="heroic fantasy pixel art creature companion, detailed, friendly, vibrant jewel tones" // Updated hint
            />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-foreground">{petName}</h4>
            <p className="text-xs text-muted-foreground">Your loyal study familiar!</p>
          </div>
        </div>
      </ContentCard>

      {/* Quick Actions Module */}
      <ContentCard>
        <h2 className="text-lg font-pixel text-primary mb-4">Quick Spells</h2>
        <div className="flex flex-row flex-wrap gap-2.5 justify-start items-center">
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
      </ContentCard>
    </aside>
  );
}

    