
import { ContentCard } from '@/components/ui/ContentCard';
import { Button } from '@/components/ui/button';
import { PixelTrophyIcon } from '@/components/icons/fantasy/PixelTrophyIcon';
import Link from 'next/link';

export default function ChallengesPage() {
  return (
    <div className="space-y-6 sm:space-y-8 text-center max-w-xl mx-auto">
      <ContentCard>
        <div className="flex flex-col items-center">
          <div className="p-4 bg-primary/10 rounded-lg inline-block mb-6 border border-primary/30">
            <PixelTrophyIcon className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-pixel text-primary mb-3">The Gauntlet of Trials</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md">
            Test thy knowledge and compete for glory. New challenge scrolls are being forged by the Guild Artificers!
          </p>
          <Link href="/" passHref>
            <Button className="btn-secondary-action">
              Back to the Stronghold
            </Button>
          </Link>
        </div>
      </ContentCard>
    </div>
  );
}

    