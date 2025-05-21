
import { ContentCard } from '@/components/ui/ContentCard';
import { Button } from '@/components/ui/button';
import { PixelTrophyIcon } from '@/components/icons/PixelTrophyIcon';
import Link from 'next/link';

export default function ChallengesPage() {
  return (
    <div className="space-y-6 sm:space-y-8 text-center max-w-xl mx-auto">
      <ContentCard>
        <div className="flex flex-col items-center">
          <div className="p-4 bg-primary/10 rounded-lg inline-block mb-6">
            <PixelTrophyIcon className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-3">Challenges</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md">
            Test your knowledge and compete with yourself. New challenge packs are coming soon!
          </p>
          <Link href="/" passHref>
            <Button className="btn-secondary-action">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </ContentCard>
    </div>
  );
}
