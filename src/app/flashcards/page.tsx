
import { ContentCard } from '@/components/ui/ContentCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import type { FlashcardSet } from '@/types';

// Import Pixel Art Icons
import { PixelPlusIcon } from '@/components/icons/PixelPlusIcon';
import { PixelBrainIcon } from '@/components/icons/PixelBrainIcon'; // Changed from PixelEyeIcon
import { PixelMagnifyingGlassIcon } from '@/components/icons/PixelMagnifyingGlassIcon';
import { PixelBookIcon } from '@/components/icons/PixelBookIcon';
import { PixelLightningIcon } from '@/components/icons/PixelLightningIcon';


export default function FlashcardsPage() {
  const flashcardSets: FlashcardSet[] = [
    {
      id: '1',
      name: 'History - WW2 Dates & Events',
      cardCount: 5,
      lastStudied: '2 days ago',
      progress: 75,
      cards: [
        { id: '1-1', question: 'When did World War II begin?', answer: 'World War II began on September 1, 1939, when Germany invaded Poland.', options: ['September 1, 1939', 'December 7, 1941', 'June 6, 1944'], correctOption: 'September 1, 1939' },
        { id: '1-2', question: 'What event triggered the US entry into WWII?', answer: 'The attack on Pearl Harbor on December 7, 1941, by Japan led to the US officially entering the war.', options: ['D-Day Invasion', 'Battle of Britain', 'Attack on Pearl Harbor'], correctOption: 'Attack on Pearl Harbor' },
        { id: '1-3', question: 'Which countries were the primary Axis powers?', answer: 'The primary Axis powers were Germany, Italy, and Japan.', options: ['Germany, Italy, Spain', 'Germany, Japan, Russia', 'Germany, Italy, Japan'], correctOption: 'Germany, Italy, Japan' },
        { id: '1-4', question: 'What was the code name for the Allied invasion of Normandy in 1944?', answer: 'Operation Overlord was the code name for the Allied invasion of Normandy.', options: ['Operation Barbarossa', 'Operation Overlord', 'Operation Market Garden'], correctOption: 'Operation Overlord' },
        { id: '1-5', question: 'Which battle is considered the turning point on the Eastern Front in WWII?', answer: 'The Battle of Stalingrad is widely considered the turning point on the Eastern Front.', options: ['Battle of Moscow', 'Battle of Kursk', 'Battle of Stalingrad'], correctOption: 'Battle of Stalingrad' },
      ]
    },
    {
      id: '2',
      name: 'Biology - Cell Structure',
      cardCount: 1,
      lastStudied: '5 days ago',
      progress: 40,
      cards: [
        { id: '2-1', question: 'What is the powerhouse of the cell?', answer: 'Mitochondria are known as the powerhouses of the cell because they generate most of the cell\'s supply of adenosine triphosphate (ATP), used as a source of chemical energy.', options: ['Nucleus', 'Mitochondria', 'Ribosome'], correctOption: 'Mitochondria' },
      ]
    },
    {
      id: '3',
      name: 'JavaScript Fundamentals',
      cardCount: 75,
      lastStudied: 'Yesterday',
      progress: 90,
      cards: []
    },
    {
      id: '4',
      name: 'Philosophical Concepts',
      cardCount: 25,
      lastStudied: 'Never',
      progress: 0,
      cards: []
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <ContentCard>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold text-foreground">Flashcard Library</h1>
            <p className="text-muted-foreground mt-1 text-lg">Create, manage, and master your flashcards.</p>
          </div>
          <Link href="/flashcards/new" passHref>
            <Button className="btn-primary-action w-full sm:w-auto">
              <PixelPlusIcon className="w-5 h-5 mr-2" />
              Create New Set
            </Button>
          </Link>
        </div>
        <div className="mt-6">
          <div className="relative">
            <PixelMagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
            <Input placeholder="Search flashcard sets by name or tag..." className="pl-10 text-base" />
          </div>
        </div>
      </ContentCard>

      {flashcardSets.length > 0 ? (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-foreground px-1 mb-4">Your Flashcard Sets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {flashcardSets.map((set) => (
                <ContentCard key={set.id} className="flex flex-col hover:shadow-xl transition-all duration-150 ease-in-out group" interactive>
                  <Link href={`/flashcards/quiz?set=${set.id}`} className="flex flex-col h-full"> {/* Updated href here */}
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{set.name}</h3>
                      <PixelBrainIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" /> {/* Changed icon */}
                    </div>
                    <p className="text-sm text-muted-foreground">{set.cards.length > 0 ? `${set.cards.length} card${set.cards.length === 1 ? '' : 's'}` : `${set.cardCount} cards (placeholder)`}</p>
                    <p className="text-xs text-muted-foreground mt-1">Last studied: {set.lastStudied}</p>
                    
                    <div className="mt-4 mb-2 flex-grow"> 
                    </div>

                    <div className="mt-auto"> 
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>Progress</span>
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
          <h2 className="text-2xl font-semibold text-foreground mb-2">No Flashcard Sets Yet</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-md mx-auto">Start by creating your first set of flashcards to begin your learning journey.</p>
          <Link href="/flashcards/new" passHref>
            <Button size="lg" className="btn-primary-action">
                <PixelPlusIcon className="w-5 h-5 mr-2" /> Get Started
            </Button>
          </Link>
        </ContentCard>
      )}

      <ContentCard>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Study Modes</h2>
        <div className="grid md:grid-cols-2 gap-4">
            <Link href="/flashcards/quiz?set=1" passHref className="w-full"> {/* Example: quiz for set 1 */}
              <Button variant="outline" size="lg" className="w-full py-3 justify-start text-base h-auto">
                  <PixelBrainIcon className="w-5 h-5 mr-3 text-primary"/> 
                  <div>
                      <span className="font-medium">Multiple Choice Quiz</span>
                      <p className="text-xs text-muted-foreground font-normal">Test your knowledge with MCQs.</p>
                  </div>
              </Button>
            </Link>
            <Link href="/flashcards/srs" passHref className="w-full">
              <Button variant="outline" size="lg" className="w-full py-3 justify-start text-base h-auto">
                  <PixelLightningIcon className="w-5 h-5 mr-3 text-primary"/> 
                   <div>
                      <span className="font-medium">Spaced Repetition</span>
                      <p className="text-xs text-muted-foreground font-normal">Optimize learning with SRS.</p>
                  </div>
              </Button>
            </Link>
        </div>
        <p className="text-sm text-muted-foreground mt-4">Select a flashcard set to start studying, or try a general quiz based on difficulty.</p>
      </ContentCard>
    </div>
  );
}
