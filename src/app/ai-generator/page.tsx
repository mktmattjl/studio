
'use client'; // Required if using client-side features like form handling directly

import { ContentCard } from '@/components/ui/ContentCard';
import { AiFlashcardGeneratorForm } from '@/components/features/ai-flashcard-generator/AiFlashcardGeneratorForm';
import { PixelMagicOrbIcon as PixelBrainIcon } from '@/components/icons/fantasy/PixelMagicOrbIcon'; // Thematic Icon
import React from 'react';

export default function AiGeneratorPage() {
  return (
    <div className="space-y-6 sm:space-y-8 max-w-3xl mx-auto">
      <ContentCard>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-lg border border-primary/30">
            <PixelBrainIcon className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-pixel text-primary">Oracle's Scroll Scribe</h1>
            <p className="text-muted-foreground mt-1 text-md">
              Let Cerebro's Oracle assist thee in creating potent scrolls from thy notes.
            </p>
          </div>
        </div>
      </ContentCard>
      
      <ContentCard>
        <AiFlashcardGeneratorForm />
      </ContentCard>
    </div>
  );
}

    