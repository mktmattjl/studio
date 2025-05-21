import { PixelatedContainer } from '@/components/PixelatedContainer';
import { AiFlashcardGeneratorForm } from '@/components/features/ai-flashcard-generator/AiFlashcardGeneratorForm';
import { Sparkles } from 'lucide-react';

export default function AiGeneratorPage() {
  return (
    <div className="space-y-8">
      <PixelatedContainer>
        <div className="flex items-center gap-3">
          <Sparkles size={36} className="text-accent" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">AI Flashcard Generator</h1>
            <p className="text-muted-foreground mt-1 text-lg">Paste your notes and let Cerebro's AI create flashcards for you!</p>
          </div>
        </div>
      </PixelatedContainer>
      
      <PixelatedContainer>
        <AiFlashcardGeneratorForm />
      </PixelatedContainer>
    </div>
  );
}
