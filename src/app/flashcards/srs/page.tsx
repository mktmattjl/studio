
import { ContentCard } from '@/components/ui/ContentCard';
import { Button } from '@/components/ui/button';
import { PixelLightningIcon } from '@/components/icons/fantasy/PixelLightningIcon';
import Link from 'next/link';

export default function SrsPage() {
  return (
    <div className="space-y-6 sm:space-y-8 text-center max-w-xl mx-auto">
      <ContentCard>
        <div className="flex flex-col items-center">
          <div className="p-4 bg-primary/10 rounded-lg inline-block mb-6 border border-primary/30">
            <PixelLightningIcon className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-pixel text-primary mb-3">Ancient Mnemonics (SRS)</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md">
            The Mages are still deciphering the optimal Spaced Repetition System. It shall be unveiled soon to aid your mastery of lore!
          </p>
          <Link href="/flashcards" passHref>
            <Button className="btn-secondary-action">
              Back to Scroll Library
            </Button>
          </Link>
        </div>
      </ContentCard>
    </div>
  );
}

    