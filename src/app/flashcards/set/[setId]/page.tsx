
import { ContentCard } from '@/components/ui/ContentCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PixelBookIcon } from '@/components/icons/PixelBookIcon';

interface FlashcardSetPageProps {
  params: {
    setId: string;
  };
}

export default function FlashcardSetPage({ params }: FlashcardSetPageProps) {
  const { setId } = params;

  // In a real app, you would fetch flashcard set data using setId
  const setName = `Flashcard Set ${setId}`; // Placeholder name

  return (
    <div className="space-y-6 sm:space-y-8 max-w-3xl mx-auto">
      <ContentCard>
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-primary/10 rounded-lg">
            <PixelBookIcon className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
              {setName}
            </h1>
            <p className="text-muted-foreground mt-1 text-md">
              Viewing details for flashcard set: {setId}. Flashcard display and study features for this set will be here soon.
            </p>
          </div>
        </div>
        {/* Placeholder for flashcards in this set */}
        <div className="text-center py-10 border-t border-border mt-6">
            <p className="text-muted-foreground mb-4">Individual flashcards and study modes for this set are coming soon!</p>
            <Link href="/flashcards" passHref>
              <Button variant="outline">Back to Flashcard Library</Button>
            </Link>
        </div>
      </ContentCard>
    </div>
  );
}
