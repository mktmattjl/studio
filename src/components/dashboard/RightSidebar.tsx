
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ContentCard } from '@/components/ui/ContentCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { ElementType } from 'react';
import { QuickActionCard } from '@/components/dashboard/QuickActionCard';
import { useRouter } from 'next/navigation';
import { 
  PixelPetIcon, 
  PixelGoldCoinIcon, 
  PixelOrnateShieldIcon, 
  PixelFlamingSwordIcon, 
  PixelFantasyAvatarIcon, 
  PixelFantasySettingsIcon,
  PixelScrollIcon, // For "Create Flashcards"
  PixelMagicOrbIcon, // For "AI Card Generator"
  PixelQuillIcon, // For "Plan Your Week"
  PixelChestIcon // For "Explore Challenges"
} from '@/components/icons/fantasy';
import { cn } from '@/lib/utils';

interface QuickActionItem {
  title: string;
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
  const thematicLevelTitle = "Novice Scribe"; 
  const badges = [{id: '1', name: 'Early Bird'}, {id: '2', name: 'Streak Master'}, {id: '3', name: 'Learner I'}];
  const dayStreak = 7;
  const currentCoins = 125; 

  const updatedQuickActions = [
    { 
      title: "Scribe Scrolls", 
      description: "Craft new lore for your adventures.", 
      href: "/flashcards/new", 
      Icon: PixelScrollIcon,
      iconBgClass: "bg-accent/40", // was secondary, now dark grey tint
      iconTextClass: "text-accent-foreground" // light text on dark grey
    },
    { 
      title: "Summon Knowledge", 
      description: "Let the Oracle conjure insights from notes.", 
      href: "/ai-generator", 
      Icon: PixelMagicOrbIcon,
      iconBgClass: "bg-primary/40", // yellow tint
      iconTextClass: "text-primary-foreground" // dark text on yellow
    },
    { 
      title: "Chart Your Path", 
      description: "Record quests, trials, and study rituals.", 
      href: "/planner",
      Icon: PixelQuillIcon, 
      iconBgClass: "bg-accent/40", // dark grey tint
      iconTextClass: "text-accent-foreground" 
    },
     { 
      title: "Seek Challenges", 
      description: "Test your mettle with ancient trials.", 
      href: "/challenges", 
      Icon: PixelChestIcon, 
      iconBgClass: "bg-gold-accent/40", // yellow tint
      iconTextClass: "text-primary-foreground" 
    },
  ];


  return (
    <aside className="w-full lg:w-[320px] xl:w-[360px] space-y-6 shrink-0">
      <ContentCard className="!p-0 overflow-hidden">
        <div className="p-4 bg-card rounded-t-lg border-b border-border">
            <div className="flex items-center gap-3 ">
              <div className="w-16 h-16 bg-muted border-2 border-border rounded-md flex items-center justify-center text-foreground text-3xl font-pixel">
                {userName.charAt(0).toUpperCase()}
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
                    <PixelOrnateShieldIcon className="mx-auto mb-1 h-7 w-7 text-muted-foreground" /> 
                    <p className="text-sm font-medium text-foreground">{badges.length}</p>
                    <p className="text-xs text-muted-foreground">Badges</p>
                </div>
                 <div>
                    <PixelGoldCoinIcon className="mx-auto mb-1 h-7 w-7" />
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
            <PixelPetIcon className="h-5 w-5" />
            Companion
          </h3>
          <Link href="/companion" className="text-sm font-medium text-primary hover:text-primary/80 hover:underline">View All</Link>
        </div>
        <div className="flex items-center gap-3">
          <div className={cn("relative w-16 h-16 rounded-md overflow-hidden bg-muted flex items-center justify-center border-2 ", isGeneratingPetImage ? "border-dashed border-primary/50 animate-pulse" : "border-border")}>
            <Image
              src={petImageUrl}
              alt={petName}
              width={64}
              height={64}
              className={cn("object-contain transition-opacity duration-300 ", isGeneratingPetImage && petImageUrl !== 'https://placehold.co/150x150/2D3748/E0EFFF.png' ? 'opacity-30' : 'opacity-100')}
              unoptimized={petImageUrl.startsWith('data:')}
              priority
              data-ai-hint="heroic fantasy pixel art creature companion, detailed, friendly, vibrant jewel tones"
            />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-foreground">{petName}</h4>
            <p className="text-xs text-muted-foreground">Your loyal study familiar!</p>
          </div>
        </div>
      </ContentCard>

      <ContentCard>
        <h2 className="text-lg font-pixel text-foreground mb-4">Quick Spells</h2>
        <div className="flex flex-row flex-wrap gap-2.5 justify-start items-center">
          {updatedQuickActions.map(action => (
            <QuickActionCard
              key={action.title}
              title={action.title}
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
    
