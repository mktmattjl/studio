
'use client';

import { PixelatedContainer } from '@/components/PixelatedContainer';
import { PixelatedButton } from '@/components/PixelatedButton';
import Image from 'next/image';
import { Heart, Drumstick, ShoppingBag, RefreshCw } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { generatePetImage } from '@/ai/flows/generate-pet-image-flow';

const DEFAULT_PET_IMAGE = "https://placehold.co/250x250.png?bg=333333&fc=FFFFFF";

// Pixel Art Gem Icon
const PixelGemIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-6 h-6">
    <path d="M8 1L7 2H9L8 1ZM6 2L5 3H7L6 2ZM10 2L9 3H11L10 2ZM5 3L4 4H6L5 3ZM11 3L10 4H12L11 3ZM4 4L3 5H5L4 4ZM12 4L11 5H13L12 4ZM3 5L2 6H4L3 5ZM13 5L12 6H14L13 5ZM2 6L3 7H1V6H2ZM14 6L13 7H15V6H14ZM3 7L4 8H2V7H3ZM13 7L12 8H14V7H13ZM4 8L5 9H3V8H4ZM12 8L11 9H13V8H12ZM5 9L6 10H4V9H5ZM11 9L10 10H12V9H11ZM6 10L7 11H5V10H6ZM10 10L9 11H11V10H10ZM7 11L8 12H6V11H7ZM9 11L8 12H10V11H9ZM8 12L7 13H9L8 12ZM7 13L6 14H8L7 13ZM9 13L8 14H10L9 13ZM6 14L8 15H4L6 14ZM10 14L8 15H12L10 14Z"/>
  </svg>
);


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
              <PixelGemIcon />
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
