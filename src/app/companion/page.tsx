
'use client';

import { ContentCard } from '@/components/ui/ContentCard';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { generatePetImage } from '@/ai/flows/generate-pet-image-flow';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { useToast } from "@/hooks/use-toast";

// Import Pixel Art Icons
import { PixelSparkleIcon } from '@/components/icons/PixelSparkleIcon';
import { PixelRefreshIcon } from '@/components/icons/PixelRefreshIcon';
import { PixelHeartIcon } from '@/components/icons/PixelHeartIcon';
import { PixelSoupBowlIcon } from '@/components/icons/PixelSoupBowlIcon';
import { PixelLightningIcon } from '@/components/icons/PixelLightningIcon'; // For XP
import { PixelCoinIcon } from '@/components/icons/PixelCoinIcon';
import { PixelGameControllerIcon } from '@/components/icons/PixelGameControllerIcon';
import { PixelShopBagIcon } from '@/components/icons/PixelShopBagIcon';


const DEFAULT_PET_IMAGE = "https://placehold.co/300x300/151A21/9CA3AF.png";

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
      const result = await generatePetImage({ petType: "detailed, friendly digital creature mascot, vibrant colors" });
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
      toast({ title: `Fed ${petName}!`, description: "Cost: 10 Coins. Yum!" });
    } else {
      toast({ title: "Not enough coins!", description: "Complete tasks to earn more.", variant: "destructive" });
    }
  };

  const handlePlay = () => {
    setHappiness(prev => Math.min(100, prev + 20));
    setHunger(prev => Math.min(100, prev + 10)); 
    setPetXP(prev => Math.min(100, prev + 10));
    toast({ title: `Played with ${petName}!`, description: `${petName} seems happier!` });
  };
  
  useEffect(() => {
    if (petXP >= 100) {
        setPetLevel(prev => prev + 1);
        setPetXP(0);
        setHappiness(100);
        toast({ title: "Level Up!", description: `${petName} reached Level ${petLevel + 1}!`, duration: 5000 });
    }
  }, [petXP, petLevel, toast, fetchPetImage]);


  return (
    <div className="space-y-6 sm:space-y-8">
      <ContentCard className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
            <PixelSparkleIcon className="w-9 h-9 text-primary" />
            <h1 className="text-3xl md:text-4xl font-semibold text-foreground">Meet <span className="text-primary font-bold">{petName}</span></h1>
        </div>
        <p className="text-muted-foreground mt-1 text-lg">Your dedicated study companion. Keep them happy and fed!</p>
      </ContentCard>

      <div className="grid md:grid-cols-3 gap-6 items-start">
        <ContentCard className="md:col-span-2 flex flex-col items-center p-6 shadow-xl">
          <div className="flex justify-between items-center w-full mb-4">
            <h2 className="text-2xl font-semibold text-foreground">{petName} - Lv. {petLevel}</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={fetchPetImage}
              disabled={isGeneratingImage}
              title="Generate new image"
              className="text-muted-foreground hover:text-primary rounded-full"
            >
              <PixelRefreshIcon className={cn("w-5 h-5", isGeneratingImage ? "animate-spin" : "")} />
            </Button>
          </div>
          <div className={cn(
              "relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] rounded-lg overflow-hidden shadow-lg mb-6 bg-muted flex items-center justify-center border-2",
              isGeneratingImage ? "border-dashed border-primary/50" : "border-transparent"
            )}>
            {isGeneratingImage && petImageUrl === DEFAULT_PET_IMAGE && (
              <p className="text-sm text-muted-foreground">Vel is evolving...</p>
            )}
            <Image
              src={petImageUrl}
              alt={`${petName} - Virtual Pet`}
              width={300}
              height={300}
              className={cn("object-contain transition-opacity duration-500", isGeneratingImage && petImageUrl !== DEFAULT_PET_IMAGE ? "opacity-40" : "opacity-100")}
              data-ai-hint="detailed digital pet mascot character art"
              unoptimized={petImageUrl.startsWith('data:')} 
              priority
            />
          </div>
          <div className="w-full space-y-4 max-w-lg">
            <div>
              <div className="flex items-center justify-between mb-1 text-sm">
                <span className="text-foreground flex items-center"><PixelHeartIcon className="w-4 h-4 mr-2" /> Happiness</span>
                <span className="font-medium text-foreground">{happiness}%</span>
              </div>
              <Progress value={happiness} className="h-3 [&>div]:bg-gradient-to-r [&>div]:from-red-500 [&>div]:to-pink-500" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1 text-sm">
                <span className="text-foreground flex items-center"><PixelSoupBowlIcon className="w-4 h-4 mr-2" /> Satiation</span>
                 <span className="font-medium text-foreground">{100-hunger}%</span>
              </div>
              <Progress value={100-hunger} className="h-3 [&>div]:bg-gradient-to-r [&>div]:from-orange-500 [&>div]:to-yellow-500" />
            </div>
             <div>
              <div className="flex items-center justify-between mb-1 text-sm">
                <span className="text-foreground flex items-center"><PixelLightningIcon className="w-4 h-4 mr-2" /> XP to Next Level</span>
                 <span className="font-medium text-foreground">{petXP}%</span>
              </div>
              <Progress value={petXP} className="h-3 [&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:to-indigo-500" />
            </div>
          </div>
        </ContentCard>

        <div className="space-y-6">
          <ContentCard className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <PixelCoinIcon className="w-6 h-6 text-primary" /> 
              <h3 className="text-xl font-semibold text-foreground">Your Coins: <span className="text-primary font-bold">{currentCoins}</span></h3>
            </div>
            <p className="text-sm text-muted-foreground">Earn coins by studying and caring for {petName}.</p>
          </ContentCard>

          <ContentCard className="p-4">
            <h3 className="text-xl font-semibold text-foreground mb-3">Care Actions</h3>
            <div className="space-y-3">
              <Button className="w-full btn-primary-action" onClick={handleFeed} disabled={isGeneratingImage || currentCoins < 10}>
                <PixelSoupBowlIcon className="w-4 h-4 mr-2"/> Feed {petName} (10 Coins)
              </Button>
              <Button className="w-full btn-secondary-action" onClick={handlePlay} disabled={isGeneratingImage}>
                <PixelGameControllerIcon className="w-4 h-4 mr-2"/> Play with {petName}
              </Button>
            </div>
          </ContentCard>
          
          <ContentCard className="p-4">
            <h3 className="text-xl font-semibold text-foreground mb-3">Pet Shop</h3>
             <Button variant="outline" className="w-full" onClick={() => toast({title: "Coming Soon!", description: "The Pet Shop is under construction."})} disabled={isGeneratingImage}>
                <PixelShopBagIcon className="w-4 h-4 mr-2"/> Browse Items
              </Button>
            <p className="text-xs text-muted-foreground mt-2">Shop for special food and fun toys!</p>
          </ContentCard>
        </div>
      </div>
    </div>
  );
}
