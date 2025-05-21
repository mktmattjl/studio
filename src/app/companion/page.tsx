import { PixelatedContainer } from '@/components/PixelatedContainer';
import { PixelatedButton } from '@/components/PixelatedButton';
import Image from 'next/image';
import { Heart, Drumstick, Coins, ShoppingBag } from 'lucide-react';

export default function CompanionPage() {
  const petName = "PixelPup";
  const coins = 100;
  const happiness = 80; // out of 100
  const hunger = 30; // out of 100

  return (
    <div className="space-y-8">
      <PixelatedContainer>
        <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">Your Virtual Companion: <span className="text-accent">{petName}</span></h1>
        <p className="text-muted-foreground mt-1 text-lg">Take care of your study buddy!</p>
      </PixelatedContainer>

      <div className="grid md:grid-cols-3 gap-6 items-start">
        <PixelatedContainer className="md:col-span-2 bg-card flex flex-col items-center p-6">
          <h2 className="text-2xl font-semibold text-primary-foreground mb-4">{petName}</h2>
          <Image
            src="https://placehold.co/250x250.png?bg=333333&fc=39FF14" // Larger placeholder for main view
            alt={`${petName} - Virtual Pet`}
            width={250}
            height={250}
            className="border-4 border-accent shadow-[4px_4px_0px_hsl(var(--primary))] mb-4"
            data-ai-hint="pixel creature"
          />
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
              <Coins size={24} className="text-accent" />
              <h3 className="text-xl font-semibold text-primary-foreground">Your Coins: <span className="text-accent">{coins}</span></h3>
            </div>
            <p className="text-sm text-muted-foreground">Earn coins by completing study tasks and reviewing flashcards.</p>
          </PixelatedContainer>

          <PixelatedContainer className="bg-card p-4">
            <h3 className="text-xl font-semibold text-primary-foreground mb-3">Actions</h3>
            <div className="space-y-3">
              <PixelatedButton className="w-full" onClick={() => alert(`Feeding ${petName}!`)}>
                <Drumstick size={18} className="mr-2"/> Feed {petName} (10 Coins)
              </PixelatedButton>
              <PixelatedButton className="w-full" onClick={() => alert(`Playing with ${petName}!`)}>
                <Heart size={18} className="mr-2"/> Play with {petName}
              </PixelatedButton>
            </div>
          </PixelatedContainer>
          
          <PixelatedContainer className="bg-card p-4">
            <h3 className="text-xl font-semibold text-primary-foreground mb-3">Pet Shop</h3>
             <PixelatedButton variant="outline" className="w-full" onClick={() => alert("Entering shop!")}>
                <ShoppingBag size={18} className="mr-2"/> Browse Items
              </PixelatedButton>
            <p className="text-xs text-muted-foreground mt-2">Shop for food and toys (coming soon!).</p>
          </PixelatedContainer>
        </div>
      </div>
    </div>
  );
}
