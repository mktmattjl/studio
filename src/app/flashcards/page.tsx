import { ContentCard } from '@/components/ui/ContentCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle, Eye, Search, BookCopy, Brain, Zap } from 'lucide-react'; // Added Brain, Zap
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

export default function FlashcardsPage() {
  const flashcardSets = [
    { id: '1', name: 'History - WW2 Dates', cardCount: 50, lastStudied: '2 days ago', progress: 75 },
    { id: '2', name: 'Biology - Cell Structure', cardCount: 30, lastStudied: '5 days ago', progress: 40 },
    { id: '3', name: 'JavaScript Fundamentals', cardCount: 75, lastStudied: 'Yesterday', progress: 90 },
    { id: '4', name: 'Philosophical Concepts', cardCount: 25, lastStudied: 'Never', progress: 0 },

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
              <PlusCircle size={20} className="mr-2" />
              Create New Set
            </Button>
          </Link>
        </div>
        <div className="mt-6">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
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
                  <Link href={`/flashcards/set/${set.id}`} className="flex flex-col h-full">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{set.name}</h3>
                      <Eye size={20} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </div>
                    <p className="text-sm text-muted-foreground">{set.cardCount} cards</p>
                    <p className="text-xs text-muted-foreground mt-1">Last studied: {set.lastStudied}</p>
                    
                    <div className="mt-4 mb-2 flex-grow"> {/* Pushes progress to bottom */}
                        {/* Spacer or other content could go here */}
                    </div>

                    <div className="mt-auto"> {/* Progress bar at the bottom */}
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
          <BookCopy size={56} className="mx-auto text-muted-foreground/50 mb-6" />
          <h2 className="text-2xl font-semibold text-foreground mb-2">No Flashcard Sets Yet</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-md mx-auto">Start by creating your first set of flashcards to begin your learning journey.</p>
          <Link href="/flashcards/new" passHref>
            <Button size="lg" className="btn-primary-action">
                <PlusCircle size={20} className="mr-2" /> Get Started
            </Button>
          </Link>
        </ContentCard>
      )}

      <ContentCard>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Study Modes</h2>
        <div className="grid md:grid-cols-2 gap-4">
            <Button variant="outline" size="lg" className="w-full py-3 justify-start text-base h-auto"> {/* Increased padding & h-auto */}
                <Brain size={22} className="mr-3 text-primary"/> 
                <div>
                    <span className="font-medium">Multiple Choice Quiz</span>
                    <p className="text-xs text-muted-foreground font-normal">Test your knowledge with MCQs.</p>
                </div>
            </Button>
            <Button variant="outline" size="lg" className="w-full py-3 justify-start text-base h-auto">
                <Zap size={22} className="mr-3 text-primary"/> 
                 <div>
                    <span className="font-medium">Spaced Repetition</span>
                    <p className="text-xs text-muted-foreground font-normal">Optimize learning with SRS.</p>
                </div>
            </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-4">Select a flashcard set to start studying, or try a general quiz based on difficulty.</p>
      </ContentCard>
    </div>
  );
}
