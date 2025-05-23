
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ContentCard } from '@/components/ui/ContentCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';
import {
  PixelPetIcon,
  PixelGoldCoinIcon,
  PixelOrnateShieldIcon,
  PixelFlamingSwordIcon,
  PixelFantasyAvatarIcon,
  PixelFantasySettingsIcon,
} from '@/components/icons/fantasy';
import { cn } from '@/lib/utils';

interface RightSidebarProps {
  userName: string;
  petName: string;
  petImageUrl: string;
  isGeneratingPetImage: boolean;
}

export function RightSidebar({
  userName,
  petName,
  petImageUrl,
  isGeneratingPetImage,
}: RightSidebarProps) {
  const router = useRouter();
  const userLevel = 5;
  const userXP = 65;
  const thematicLevelTitle = "Novice Scribe";
  const badges = [{id: '1', name: 'Early Bird'}, {id: '2', name: 'Streak Master'}, {id: '3', name: 'Learner I'}];
  const dayStreak = 7;
  const currentCoins = 125;

  return (
    <aside className="w-full lg:w-[320px] xl:w-[360px] space-y-6 shrink-0">
      <ContentCard className="!p-0 overflow-hidden">
        <div className="p-4 bg-card rounded-t-lg border-b border-border">
            <div className="flex items-center gap-3 ">
              <div className="w-16 h-16 bg-muted border-2 border-border rounded-md flex items-center justify-center">
                <span className="font-pixel text-3xl text-foreground">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="font-pixel text-xl text-foreground">{userName}</h3>
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
                    <PixelFlamingSwordIcon className="mx-auto mb-1 h-7 w-7 text-primary" />
                    <p className="text-sm font-medium text-foreground">{dayStreak}</p>
                    <p className="text-xs text-muted-foreground">Streak</p>
                </div>
                <div>
                    <PixelOrnateShieldIcon className="mx-auto mb-1 h-7 w-7 text-secondary" />
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
                <Button
                  variant="outline"
                  size="default"
                  className="flex-1 text-muted-foreground hover:bg-accent/20 hover:border-accent hover:text-accent-foreground py-2.5 px-3"
                  onClick={() => router.push('/profile')}
                >
                    <PixelFantasyAvatarIcon className="mr-1.5 h-4 w-4" /> Profile
                </Button>
                <Button
                  variant="outline"
                  size="default"
                  className="flex-1 text-muted-foreground hover:bg-accent/20 hover:border-accent hover:text-accent-foreground py-2.5 px-3"
                  onClick={() => router.push('/settings')}
                >
                    <PixelFantasySettingsIcon className="mr-1.5 h-4 w-4" /> Settings
                </Button>
            </div>
        </div>
      </ContentCard>

      <ContentCard>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-pixel text-foreground flex items-center gap-2">
            <PixelPetIcon className="h-6 w-6" />
            Companion
          </h3>
          <Link href="/companion" className="text-sm font-medium text-primary hover:text-primary/80 hover:underline">View All</Link>
        </div>
        <div className="flex flex-col items-center text-center gap-3 mt-2">
          <div className={cn(
            "relative w-56 h-56 rounded-lg overflow-hidden bg-muted flex items-center justify-center border-2 shadow-md",
            isGeneratingPetImage ? "border-dashed border-primary/50 animate-pulse" : "border-border"
          )}>
            <Image
              src={petImageUrl}
              alt={petName}
              width={224} 
              height={224}
              className={cn(
                "object-contain transition-opacity duration-300",
                isGeneratingPetImage && petImageUrl.startsWith('https://placehold.co') ? "opacity-30" : "opacity-100"
              )}
              unoptimized={petImageUrl.startsWith('data:')}
              priority
              data-ai-hint="heroic fantasy pixel art creature companion, detailed, friendly, vibrant jewel tones"
            />
          </div>
          <div>
            <h4 className="text-lg font-pixel text-foreground">{petName}</h4>
            {/* Description removed as per previous request */}
          </div>
        </div>
      </ContentCard>

      {/* Quick Spells section removed as per previous request */}
    </aside>
  );
}
