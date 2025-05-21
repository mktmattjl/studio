
import { ContentCard } from '@/components/ui/ContentCard';
import { Button } from '@/components/ui/button';
import { PixelBrainIcon } from '@/components/icons/PixelBrainIcon';
import Link from 'next/link';

export default function QuizPage() {
  return (
    <div className="space-y-6 sm:space-y-8 text-center max-w-xl mx-auto">
      <ContentCard>
        <div className="flex flex-col items-center">
          <div className="p-4 bg-primary/10 rounded-lg inline-block mb-6">
            <PixelBrainIcon className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-3">Multiple Choice Quiz</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md">
            The Multiple Choice Quiz mode is currently under construction. Check back soon to test your knowledge!
          </p>
          <Link href="/flashcards" passHref>
            <Button className="btn-secondary-action">
              Back to Flashcard Library
            </Button>
          </Link>
        </div>
      </ContentCard>
    </div>
  );
}
