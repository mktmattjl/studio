import { PixelatedContainer } from '@/components/PixelatedContainer';
import { PixelatedButton } from '@/components/PixelatedButton';
import Link from 'next/link';
import { PlusCircle, Eye } from 'lucide-react';

export default function FlashcardsPage() {
  // Placeholder data for existing flashcard sets
  const flashcardSets = [
    { id: '1', name: 'History - WW2 Dates', cardCount: 50 },
    { id: '2', name: 'Biology - Cell Structure', cardCount: 30 },
    { id: '3', name: 'JavaScript Fundamentals', cardCount: 75 },
  ];

  return (
    <div className="space-y-8">
      <PixelatedContainer>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">Flashcard Pro</h1>
            <p className="text-muted-foreground mt-1 text-lg">Create, manage, and review your flashcards.</p>
          </div>
          <Link href="/flashcards/new" passHref>
            <PixelatedButton>
              <PlusCircle size={20} className="mr-2" />
              Create New Set
            </PixelatedButton>
          </Link>
        </div>
      </PixelatedContainer>

      {flashcardSets.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary-foreground">Your Flashcard Sets</h2>
          {flashcardSets.map((set) => (
            <PixelatedContainer key={set.id} className="bg-card" interactive>
              <Link href={`/flashcards/set/${set.id}`} className="block">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-accent">{set.name}</h3>
                    <p className="text-sm text-muted-foreground">{set.cardCount} cards</p>
                  </div>
                  <Eye size={24} className="text-primary-foreground group-hover:text-accent transition-colors" />
                </div>
              </Link>
            </PixelatedContainer>
          ))}
        </div>
      ) : (
        <PixelatedContainer className="text-center">
          <p className="text-xl text-muted-foreground mb-4">You haven't created any flashcard sets yet.</p>
          <Link href="/flashcards/new" passHref>
            <PixelatedButton>Get Started!</PixelatedButton>
          </Link>
        </PixelatedContainer>
      )}

      <PixelatedContainer>
        <h2 className="text-2xl font-semibold text-primary-foreground mb-3">Study Modes</h2>
        <div className="grid md:grid-cols-2 gap-4">
            <PixelatedButton variant="outline" className="w-full py-4 text-lg">Multiple Choice Quiz</PixelatedButton>
            <PixelatedButton variant="outline" className="w-full py-4 text-lg">Spaced Repetition Review</PixelatedButton>
        </div>
        <p className="text-sm text-muted-foreground mt-3">Select a flashcard set to start studying.</p>
      </PixelatedContainer>
    </div>
  );
}
