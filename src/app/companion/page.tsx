
'use client';

import { PixelatedContainer } from '@/components/PixelatedContainer';
import { PixelatedButton } from '@/components/PixelatedButton';
import Image from 'next/image';
import { Heart, Drumstick, ShoppingBag, RefreshCw } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { generatePetImage } from '@/ai/flows/generate-pet-image-flow';
import { PixelCoinIcon } from '@/components/icons/PixelCoinIcon'; // Updated import

const DEFAULT_PET_IMAGE = "https://placehold.co/250x250.png?bg=333333&fc=FFFFFF";

export default function CompanionPage() {
  const petName = "PixelPup";
  const coins = 100;
  const [happiness, setHappiness] = useState(80); // out of 100
  const [hunger, setHunger] = useState(30); // out of 100
  const [petImageUrl, setPetImageUrl] = useState(DEFAULT_PET_IMAGE);
  const [isGeneratingImage, setIsGeneratingImage] = useState(true);

  const fetchPetImage = useCallback(async () => {
    setIsGeneratingImage(true);
    setPetImageUrl(DEFAULT_PET_IMAGE); // Show placeholder while loading
    try {
      const result = await generatePetImage({ petType: "friendly pixel creature digital pet" });
      if (result?.imageDataUri) {
        setPetImageUrl(result.imageDataUri);
      } else {
        setPetImageUrl(DEFAULT_PET_IMAGE);
        console.warn("Failed to generate pet image, using placeholder.");
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
    if (coins >= 10) {
      setHunger(prev => Math.max(0, prev - 20));
      setHappiness(prev => Math.min(100, prev + 5));
      alert(`Feeding ${petName}! Costs 10 Coins.`);
    } else {
      alert("Not enough coins to feed!");
    }
  };

  const handlePlay = () => {
    setHappiness(prev => Math.min(100, prev + 15));
    setHunger(prev => Math.min(100, prev + 5));
    alert(`Playing with ${petName}!`);
  };

  return (
    <div className="space-y-8">
      <PixelatedContainer>
        <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">Your Virtual Companion: <span className="text-accent">{petName}</span></h1>
        <p className="text-muted-foreground mt-1 text-lg">Take care of your study buddy!</p>
      </PixelatedContainer>

      <div className="grid md:grid-cols-3 gap-6 items-start">
        <PixelatedContainer className="md:col-span-2 bg-card flex flex-col items-center p-6">
          <div className="flex justify-between items-center w-full mb-4">
            <h2 className="text-2xl font-semibold text-primary-foreground">{petName}</h2>
            <PixelatedButton
              size="sm"
              variant="outline"
              onClick={fetchPetImage}
              disabled={isGeneratingImage}
              title="Generate new image"
            >
              <RefreshCw size={16} className={isGeneratingImage ? "animate-spin" : ""} />
            </PixelatedButton>
          </div>
          <div className="relative w-[250px] h-[250px] border-4 border-accent shadow-[4px_4px_0px_hsl(var(--primary))] mb-4 bg-muted/50 flex items-center justify-center">
            {isGeneratingImage && petImageUrl === DEFAULT_PET_IMAGE && (
              <p className="text-sm text-muted-foreground">Generating art...</p>
            )}
            <Image
              src={petImageUrl}
              alt={`${petName} - Virtual Pet`}
              width={250}
              height={250}
              className={cn("object-contain", isGeneratingImage && petImageUrl !== DEFAULT_PET_IMAGE ? "opacity-50" : "")}
              data-ai-hint="pixel creature"
              unoptimized={petImageUrl.startsWith('data:')} 
              priority
            />
          </div>
          <div className="w-full space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-primary-foreground flex items-center"><Heart size={18} className="mr-2 text-destructive" /> Happiness:</span>
              <div className="w-1/2 bg-muted h-4 border-2 border-primary"><div className="bg-destructive h-full" style={{ width: `${happiness}%`}}></div></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-primary-foreground flex items-center"><Drumstick size={18} className="mr-2 text-accent" /> Hunger:</span>
              <div className="w-1/2 bg-muted h-4 border-2 border-primary"><div className="bg-accent h-full" style={{ width: `${hunger}%`}}></div></div>
            </div>
          </div>
        </PixelatedContainer>

        <div className="space-y-6">
          <PixelatedContainer className="bg-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <PixelCoinIcon className="w-6 h-6 text-yellow-400" /> {/* Using the new icon */}
              <h3 className="text-xl font-semibold text-primary-foreground">Your Coins: <span className="text-accent font-bold">{coins}</span></h3>
            </div>
            <p className="text-sm text-muted-foreground">Earn coins by completing study tasks and reviewing flashcards.</p>
          </PixelatedContainer>

          <PixelatedContainer className="bg-card p-4">
            <h3 className="text-xl font-semibold text-primary-foreground mb-3">Actions</h3>
            <div className="space-y-3">
              <PixelatedButton className="w-full" onClick={handleFeed} disabled={isGeneratingImage}>
                <Drumstick size={18} className="mr-2"/> Feed {petName} (10 Coins)
              </PixelatedButton>
              <PixelatedButton className="w-full" onClick={handlePlay} disabled={isGeneratingImage}>
                <Heart size={18} className="mr-2"/> Play with {petName}
              </PixelatedButton>
            </div>
          </PixelatedContainer>
          
          <PixelatedContainer className="bg-card p-4">
            <h3 className="text-xl font-semibold text-primary-foreground mb-3">Pet Shop</h3>
             <PixelatedButton variant="outline" className="w-full" onClick={() => alert("Entering shop!")} disabled={isGeneratingImage}>
                <ShoppingBag size={18} className="mr-2"/> Browse Items
              </PixelatedButton>
            <p className="text-xs text-muted-foreground mt-2">Shop for food and toys (coming soon!).</p>
          </PixelatedContainer>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
