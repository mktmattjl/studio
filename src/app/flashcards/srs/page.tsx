
import { ContentCard } from '@/components/ui/ContentCard';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';
import Link from 'next/link';

export default function SrsPage() {
  return (
    <div className="space-y-6 sm:space-y-8 text-center max-w-xl mx-auto">
      <ContentCard>
        <div className="flex flex-col items-center">
          <div className="p-4 bg-primary/10 rounded-lg inline-block mb-6 border border-primary/30">
            <Zap className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-primary mb-3">Spaced Repetition (SRS)</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md">
            This intelligent study mode is currently in development and will be available soon to optimize your learning!
          </p>
          <Link href="/flashcards" passHref>
            <Button variant="secondary">
              Back to Flashcards
            </Button>
          </Link>
        </div>
      </ContentCard>
    </div>
  );
}
