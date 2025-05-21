
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ContentCard } from '@/components/ui/ContentCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { ElementType } from 'react';
import { QuickActionCard } from '@/components/dashboard/QuickActionCard';

// Import Pixel Art Icons
import { PixelPetIcon } from '@/components/icons/PixelPetIcon';
import { PixelCoinIcon } from '@/components/icons/PixelCoinIcon';
import { PixelShieldIcon } from '@/components/icons/PixelShieldIcon';
import { PixelFlameIcon } from '@/components/icons/PixelFlameIcon';
import { PixelUserIcon } from '@/components/icons/PixelUserIcon';
import { PixelGearIcon } from '@/components/icons/PixelGearIcon';

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
  const userLevel = 5;
  const userXP = 65;
  const badges = [{id: '1', name: 'Early Bird'}, {id: '2', name: 'Streak Master'}, {id: '3', name: 'Learner I'}];
  const dayStreak = 7;

  return (
    <aside className="w-full lg:w-[320px] xl:w-[360px] space-y-6 shrink-0">
      {/* User Profile Card */}
      <ContentCard className="!p-0 overflow-hidden">
        <div className="p-4 bg-card rounded-t-lg">
            <div className="flex items-center gap-3 ">
              <div className="w-16 h-16 bg-muted border-2 border-border rounded-full flex items-center justify-center text-foreground text-2xl font-bold">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground">{userName}</h3>
                <p className="text-sm text-muted-foreground">Level {userLevel}</p>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>XP</span>
                <span>{userXP}% to Level {userLevel+1}</span>
              </div>
              <Progress value={userXP} className="h-2 bg-muted/50 [&>div]:bg-primary" />
            </div>
        </div>
        <div className="p-4 space-y-3 border-t border-border">
            <div className="flex items-center justify-around text-center">
                <div>
                    <PixelFlameIcon className="mx-auto mb-1 h-6 w-6 text-[#F50087]" /> {/* Vibrant Magenta for Streak */}
                    <p className="text-sm font-medium text-foreground">{dayStreak}</p>
                    <p className="text-xs text-muted-foreground">Streak</p>
                </div>
                <div>
                    <PixelShieldIcon className="mx-auto mb-1 h-6 w-6 text-sky-500" />
                    <p className="text-sm font-medium text-foreground">{badges.length}</p>
                    <p className="text-xs text-muted-foreground">Badges</p>
                </div>
                 <div>
                    <PixelCoinIcon className="mx-auto mb-1 h-6 w-6 text-[#39FF14]" /> {/* Glitch Lime Green for Coins */}
                    <p className="text-sm font-medium text-foreground">125</p>
                    <p className="text-xs text-muted-foreground">Coins</p>
                 </div>
            </div>
            <div className="flex gap-2 pt-2 border-t border-border">
                <Button variant="ghost" size="sm" className="flex-1 text-muted-foreground hover:bg-muted hover:text-foreground">
                    <PixelUserIcon className="mr-1.5 h-4 w-4" /> Profile
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 text-muted-foreground hover:bg-muted hover:text-foreground">
                    <PixelGearIcon className="mr-1.5 h-4 w-4" /> Settings
                </Button>
            </div>
        </div>
      </ContentCard>


      {/* Companion Module */}
      <ContentCard>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <PixelPetIcon className="h-5 w-5 text-primary" />
            Companion
          </h3>
          <Link href="/companion" className="text-sm font-medium text-primary hover:text-primary/80 hover:underline">View All</Link>
        </div>
        <div className="flex items-center gap-3">
          <div className={("relative w-16 h-16 rounded-md overflow-hidden bg-muted flex items-center justify-center border-2 " + (isGeneratingPetImage ? "border-dashed border-primary/50 animate-pulse" : "border-transparent"))}>
            <Image
              src={petImageUrl}
              alt={petName}
              width={64}
              height={64}
              className={("object-contain transition-opacity duration-300 " + (isGeneratingPetImage && petImageUrl !== 'https://placehold.co/150x150/1A1D2B/E0EFFF.png' ? 'opacity-30' : 'opacity-100'))}
              unoptimized={petImageUrl.startsWith('data:')}
              priority
              data-ai-hint="digital creature mascot"
            />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-foreground">{petName}</h4>
            <p className="text-xs text-muted-foreground">Your study buddy is doing great!</p>
          </div>
        </div>
      </ContentCard>

      {/* Quick Actions Module */}
      <ContentCard>
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="flex flex-row flex-wrap gap-2 justify-start items-center"> {/* Changed to flex row for compact icons */}
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
