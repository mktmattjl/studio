
'use client';

import { ContentCard } from '@/components/ui/ContentCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Book } from 'lucide-react';
import React from 'react';

interface FlashcardSetPageProps {
  params: {
    setId: string;
  };
}

export default function FlashcardSetPage({ params }: FlashcardSetPageProps) {
  const { setId } = params;

  const setName = `Flashcard Set ${setId}`; // Placeholder name

  return (
    <div className="space-y-6 sm:space-y-8 max-w-3xl mx-auto">
      <ContentCard>
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-primary/10 rounded-lg border border-primary/30">
            <Book className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-primary">
              {setName}
            </h1>
            <p className="text-muted-foreground mt-1 text-md">
              Viewing details for set: {setId}. Individual card display and editing coming soon.
            </p>
          </div>
        </div>
        <div className="text-center py-10 border-t border-border/50 mt-6">
            <p className="text-muted-foreground mb-4">Individual card management for this set is being developed.</p>
            <Link href="/flashcards" passHref>
              <Button variant="outline">Back to Library</Button>
            </Link>
        </div>
      </ContentCard>
    </div>
  );
}
