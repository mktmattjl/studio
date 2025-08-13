
import { ContentCard } from '@/components/ui/ContentCard';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';
import Link from 'next/link';

export default function ChallengesPage() {
  return (
    <div className="space-y-6 sm:space-y-8 text-center max-w-xl mx-auto">
      <ContentCard>
        <div className="flex flex-col items-center">
          <div className="p-4 bg-primary/10 rounded-lg inline-block mb-6 border border-primary/30">
            <Trophy className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-primary mb-3">Challenges</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md">
            Test your knowledge and compete for glory. New challenges are coming soon!
          </p>
          <Link href="/" passHref>
            <Button variant="secondary">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </ContentCard>
    </div>
  );
}
