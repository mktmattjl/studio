
'use client'; // Ensure this is a client component if it uses hooks or event handlers directly

import { ContentCard } from '@/components/ui/ContentCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import type { FlashcardSet } from '@/types';
import React from 'react'; // Import React if using JSX extensively or hooks

// Fantasy Pixel Art Icons
import { PixelPlusIcon, PixelScrollIcon as PixelBookIcon, PixelMagicOrbIcon as PixelBrainIcon, PixelMagnifyingGlassIcon, PixelLightningIcon } from '@/components/icons/fantasy';

export default function FlashcardsPage() {
  const flashcardSets: FlashcardSet[] = [
    {
      id: '1',
      name: 'Ancient Runes: Vol. I',
      cardCount: 5,
      lastStudied: '2 moons ago',
      progress: 75,
      cards: [
        { id: '1-1', question: 'What is the rune for "Strength"?', answer: 'Uruz.', options: ['Uruz', 'Fehu', 'Thurisaz'], correctOption: 'Uruz' },
        { id: '1-2', question: 'The rune "Ansuz" primarily represents?', answer: 'Divine breath, communication.', options: ['Wealth', 'Journey', 'Divine breath'], correctOption: 'Divine breath' },
        { id: '1-3', question: 'Which rune signifies "Journey" or "Travel"?', answer: 'Raido.', options: ['Kenaz', 'Raido', 'Gebo'], correctOption: 'Raido' },
        { id: '1-4', question: 'What is the meaning of "Hagalaz"?', answer: 'Hail, destructive natural forces.', options: ['Joy', 'Harvest', 'Hail'], correctOption: 'Hail' },
        { id: '1-5', question: 'The rune for "Ice" or "Challenge" is?', answer: 'Isa.', options: ['Isa', 'Jera', 'Eihwaz'], correctOption: 'Isa' },
      ]
    },
    {
      id: '2',
      name: 'Creature Compendium: Goblins',
      cardCount: 1,
      lastStudied: '5 suns past',
      progress: 40,
      cards: [
        { id: '2-1', question: 'Typical goblin weapon of choice?', answer: 'Rusty daggers or crude clubs.', options: ['Longswords', 'Magic Staves', 'Rusty daggers'], correctOption: 'Rusty daggers' },
      ]
    },
    {
      id: '3',
      name: 'Forbidden Spells & Incantations',
      cardCount: 75,
      lastStudied: 'Yesterday\'s eve',
      progress: 90,
      cards: []
    },
    {
      id: '4',
      name: 'Philosopher\'s Stones: Fact or Fiction?',
      cardCount: 25,
      lastStudied: 'Never Chronicled',
      progress: 0,
      cards: []
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <ContentCard>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-pixel text-primary">Scroll Library</h1>
            <p className="text-muted-foreground mt-1 text-lg">Craft, manage, and master thy collection of enchanted scrolls.</p>
          </div>
          <Link href="/flashcards/new" passHref>
            <Button className="btn-primary-action w-full sm:w-auto">
              <PixelPlusIcon className="w-5 h-5 mr-2" />
              Scribe New Scroll Set
            </Button>
          </Link>
        </div>
        <div className="mt-6">
          <div className="relative">
            <PixelMagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
            <Input placeholder="Search scroll sets by name or incantation..." className="pl-10 text-base bg-input text-input-foreground" />
          </div>
        </div>
      </ContentCard>

      {flashcardSets.length > 0 ? (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-pixel text-secondary px-1 mb-4">Your Scroll Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {flashcardSets.map((set) => (
                <ContentCard key={set.id} className="flex flex-col hover:shadow-xl transition-all duration-150 ease-in-out group border-2 border-transparent hover:border-accent/50" interactive>
                  <Link href={`/flashcards/quiz?set=${set.id}`} className="flex flex-col h-full p-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{set.name}</h3>
                      <PixelBookIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </div>
                    <p className="text-sm text-muted-foreground">{set.cards.length > 0 ? `${set.cards.length} scroll${set.cards.length === 1 ? '' : 's'}` : `${set.cardCount} scrolls (sealed)`}</p>
                    <p className="text-xs text-muted-foreground mt-1">Last studied: {set.lastStudied}</p>
                    
                    <div className="mt-4 mb-2 flex-grow"></div>

                    <div className="mt-auto"> 
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>Mastery</span>
                            <span className="font-medium text-foreground">{set.progress}%</span>
                        </div>
                        <Progress value={set.progress} className="h-2 [&>div]:bg-primary" />
                    </div>
                  </Link>
                </ContentCard>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <ContentCard className="text-center py-16">
          <PixelBookIcon className="w-14 h-14 mx-auto text-muted-foreground/50 mb-6" />
          <h2 className="text-2xl font-pixel text-foreground mb-2">No Scrolls Scribed Yet</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-md mx-auto">Begin thy journey by scribing your first collection of scrolls.</p>
          <Link href="/flashcards/new" passHref>
            <Button size="lg" className="btn-primary-action">
                <PixelPlusIcon className="w-5 h-5 mr-2" /> Begin Scribing
            </Button>
          </Link>
        </ContentCard>
      )}

      <ContentCard>
        <h2 className="text-2xl font-pixel text-secondary mb-4">Divination Methods (Study Modes)</h2>
        <div className="grid md:grid-cols-2 gap-4">
            <Link href="/flashcards/quiz?set=1" passHref className="w-full">
              <Button variant="outline" size="lg" className="w-full py-3 justify-start text-base h-auto hover:border-primary hover:bg-primary/10">
                  <PixelBrainIcon className="w-5 h-5 mr-3 text-primary"/> 
                  <div>
                      <span className="font-medium">Trial by Combat (Quiz)</span>
                      <p className="text-xs text-muted-foreground font-normal">Test thy knowledge with challenging questions.</p>
                  </div>
              </Button>
            </Link>
            <Link href="/flashcards/srs" passHref className="w-full">
              <Button variant="outline" size="lg" className="w-full py-3 justify-start text-base h-auto hover:border-secondary hover:bg-secondary/10">
                  <PixelLightningIcon className="w-5 h-5 mr-3 text-secondary"/> 
                   <div>
                      <span className="font-medium">Ancient Mnemonics (SRS)</span>
                      <p className="text-xs text-muted-foreground font-normal">Optimize learning with spaced repetition.</p>
                  </div>
              </Button>
            </Link>
        </div>
        <p className="text-sm text-muted-foreground mt-4">Select a scroll set to begin thy studies, or try a general trial based on difficulty.</p>
      </ContentCard>
    </div>
  );
}

    