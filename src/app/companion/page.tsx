
'use client';

import { ContentCard } from '@/components/ui/ContentCard';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { generatePetImage } from '@/ai/flows/generate-pet-image-flow';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { useToast } from "@/hooks/use-toast";

// Preserving existing Fantasy Pixel Art Icons
import { PixelMagicOrbIcon as PixelSparkleIcon } from '@/components/icons/fantasy/PixelMagicOrbIcon';
import { PixelRefreshIcon } from '@/components/icons/fantasy/PixelRefreshIcon';
import { PixelHeartIcon } from '@/components/icons/fantasy/PixelHeartIcon';
import { PixelSoupBowlIcon } from '@/components/icons/fantasy/PixelSoupBowlIcon';
import { PixelLightningIcon } from '@/components/icons/fantasy/PixelLightningIcon';
import { PixelGoldCoinIcon } from '@/components/icons/fantasy/PixelGoldCoinIcon';
import { PixelGameControllerIcon } from '@/components/icons/fantasy/PixelGameControllerIcon'; // Assuming this is fantasy themed
import { PixelShopBagIcon } from '@/components/icons/fantasy/PixelShopBagIcon'; // Assuming this is fantasy themed

const DEFAULT_PET_IMAGE = "https://placehold.co/300x300/2D3748/E0EFFF.png"; // Dark card bg, light text fg for placeholder

export default function CompanionPage() {
  const { toast } = useToast();
  const petName = "Vel";
  const [currentCoins, setCurrentCoins] = useState(125);
  const [happiness, setHappiness] = useState(75); 
  const [hunger, setHunger] = useState(40); 
  const [petImageUrl, setPetImageUrl] = useState(DEFAULT_PET_IMAGE);
  const [isGeneratingImage, setIsGeneratingImage] = useState(true);
  const [petLevel, setPetLevel] = useState(3);
  const [petXP, setPetXP] = useState(50); 

  const fetchPetImage = useCallback(async () => {
    setIsGeneratingImage(true);
    setPetImageUrl(DEFAULT_PET_IMAGE); 
    try {
      // Updated prompt for dark theme
      const result = await generatePetImage({ petType: "cool pixel art creature companion, video game style, dark theme friendly colors" });
      if (result?.imageDataUri) {
        setPetImageUrl(result.imageDataUri);
      } else {
        setPetImageUrl(DEFAULT_PET_IMAGE);
      }
    } catch (error) {
      console.error("Error fetching pet image:", error);
      setPetImageUrl(DEFAULT_PET_IMAGE);
    } finally {
      setIsGeneratingImage(false);
    }
  }, []);

  useEffect(() => {
    fetchPetImage();
  }, [fetchPetImage]);

  const handleFeed = () => {
    if (currentCoins >= 10) {
      setCurrentCoins(prev => prev - 10);
      setHunger(prev => Math.max(0, prev - 30));
      setHappiness(prev => Math.min(100, prev + 10));
      setPetXP(prev => Math.min(100, prev + 5));
      toast({ title: `Fed ${petName}!`, description: "Cost: 10 Coins. Vel seems satisfied!" });
    } else {
      toast({ title: "Not enough coins!", description: "Embark on quests to earn more.", variant: "destructive" });
    }
  };

  const handlePlay = () => {
    setHappiness(prev => Math.min(100, prev + 20));
    setHunger(prev => Math.min(100, prev + 10)); 
    setPetXP(prev => Math.min(100, prev + 10));
    toast({ title: `Played with ${petName}!`, description: `${petName} is joyful!` });
  };
  
  useEffect(() => {
    if (petXP >= 100) {
        setPetLevel(prev => prev + 1);
        setPetXP(0);
        setHappiness(100);
        toast({ title: "Level Up!", description: `${petName} reached Level ${petLevel + 1}! Attributes increased!`, duration: 5000 });
    }
  }, [petXP, petLevel, toast]);


  return (
    <div className="space-y-6 sm:space-y-8">
      <ContentCard className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
            {/* Icon color from --primary (Bright Blue) */}
            <PixelSparkleIcon className="w-9 h-9 text-primary" /> 
            {/* Title uses .font-pixel and --primary color (Bright Blue) */}
            <h1 className="text-3xl md:text-4xl font-pixel text-primary">Meet <span className="text-gold-accent font-bold">{petName}</span></h1>
        </div>
        <p className="text-muted-foreground mt-1 text-lg">Your loyal study familiar. Keep them content and well-fed!</p>
      </ContentCard>

      <div className="grid md:grid-cols-3 gap-6 items-start">
        <ContentCard className="md:col-span-2 flex flex-col items-center p-6 shadow-xl">
          <div className="flex justify-between items-center w-full mb-4">
            {/* Pet name title uses .font-pixel */}
            <h2 className="text-2xl font-pixel text-foreground">{petName} - Lv. {petLevel}</h2>
            <Button
              variant="outline" // Outline with secondary accent (Teal)
              size="icon"
              onClick={fetchPetImage}
              disabled={isGeneratingImage}
              title="Summon new form"
              className="text-muted-foreground hover:text-secondary rounded-md border-secondary hover:border-secondary" 
            >
              <PixelRefreshIcon className={cn("w-5 h-5", isGeneratingImage ? "animate-spin" : "")} />
            </Button>
          </div>
          <div className={cn(
              "relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] rounded-lg overflow-hidden shadow-lg mb-6 bg-muted/50 flex items-center justify-center border-2 border-border",
              isGeneratingImage ? "border-dashed border-primary/50" : ""
            )}>
            {isGeneratingImage && petImageUrl === DEFAULT_PET_IMAGE && (
              <p className="text-sm text-muted-foreground font-pixel">Vel is materializing...</p>
            )}
            <Image
              src={petImageUrl}
              alt={`${petName} - Virtual Pet`}
              width={300}
              height={300}
              className={cn("object-contain transition-opacity duration-500", isGeneratingImage && petImageUrl !== DEFAULT_PET_IMAGE ? "opacity-40" : "opacity-100")}
              data-ai-hint="cool pixel art creature companion, video game style, dark theme friendly colors"
              unoptimized={petImageUrl.startsWith('data:')} 
              priority
            />
          </div>
          <div className="w-full space-y-4 max-w-lg">
            <div>
              <div className="flex items-center justify-between mb-1 text-sm">
                {/* Heart icon uses --destructive color */}
                <span className="text-foreground flex items-center"><PixelHeartIcon className="w-4 h-4 mr-2 text-destructive" /> Spirit (Happiness)</span>
                <span className="font-medium text-foreground">{happiness}%</span>
              </div>
              {/* Progress bar uses --destructive for fill */}
              <Progress value={happiness} className="h-3 [&>div]:bg-destructive" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1 text-sm">
                {/* Soup bowl icon uses --gold-accent */}
                <span className="text-foreground flex items-center"><PixelSoupBowlIcon className="w-4 h-4 mr-2 text-gold-accent" /> Satiation</span>
                 <span className="font-medium text-foreground">{100-hunger}%</span>
              </div>
              {/* Progress bar uses --gold-accent for fill */}
              <Progress value={100-hunger} className="h-3 [&>div]:bg-gold-accent" />
            </div>
             <div>
              <div className="flex items-center justify-between mb-1 text-sm">
                {/* Lightning icon uses --secondary (Teal) */}
                <span className="text-foreground flex items-center"><PixelLightningIcon className="w-4 h-4 mr-2 text-secondary" /> XP to Next Level</span>
                 <span className="font-medium text-foreground">{petXP}%</span>
              </div>
              {/* Progress bar uses --secondary (Teal) for fill */}
              <Progress value={petXP} className="h-3 [&>div]:bg-secondary" />
            </div>
          </div>
        </ContentCard>

        <div className="space-y-6">
          <ContentCard className="p-4">
            <div className="flex items-center gap-3 mb-2">
              {/* Coin icon uses --gold-accent */}
              <PixelGoldCoinIcon className="w-6 h-6 text-gold-accent" /> 
              <h3 className="text-xl font-pixel text-foreground">Your Hoard: <span className="text-gold-accent font-bold">{currentCoins}</span></h3>
            </div>
            <p className="text-sm text-muted-foreground">Earn coins by completing quests and caring for {petName}.</p>
          </ContentCard>

          <ContentCard className="p-4">
            {/* Section title uses .font-pixel and --primary color */}
            <h3 className="text-xl font-pixel text-primary mb-3">Familiar Care</h3>
            <div className="space-y-3">
              {/* Primary action button uses .btn-primary-action (Blue) */}
              <Button className="w-full btn-primary-action" onClick={handleFeed} disabled={isGeneratingImage || currentCoins < 10}>
                <PixelSoupBowlIcon className="w-4 h-4 mr-2"/> Feed {petName} (10 Coins)
              </Button>
              {/* Secondary action button uses .btn-secondary-action (Teal) */}
              <Button className="w-full btn-secondary-action" onClick={handlePlay} disabled={isGeneratingImage}>
                <PixelGameControllerIcon className="w-4 h-4 mr-2"/> Play with {petName}
              </Button>
            </div>
          </ContentCard>
          
          <ContentCard className="p-4">
             {/* Section title uses .font-pixel and --primary color */}
            <h3 className="text-xl font-pixel text-primary mb-3">Adventurer's Market</h3>
             {/* Button uses outline style with secondary accent (Teal) */}
             <Button variant="outline" className="w-full border-secondary hover:bg-secondary/20 hover:text-secondary-foreground" onClick={() => toast({title: "Coming Soon!", description: "The Market is currently stocking its wares."})} disabled={isGeneratingImage}>
                <PixelShopBagIcon className="w-4 h-4 mr-2"/> Browse Wares
              </Button>
            <p className="text-xs text-muted-foreground mt-2">Acquire potent provisions and curious baubles!</p>
          </ContentCard>
        </div>
      </div>
    </div>
  );
}
    