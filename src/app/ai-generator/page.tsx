import { ContentCard } from '@/components/ui/ContentCard';
import { AiFlashcardGeneratorForm } from '@/components/features/ai-flashcard-generator/AiFlashcardGeneratorForm';
import { Sparkles, Brain } from 'lucide-react'; // Added Brain icon

export default function AiGeneratorPage() {
  return (
    <div className="space-y-6 sm:space-y-8 max-w-3xl mx-auto">
      <ContentCard>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Brain size={28} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground">AI Flashcard Generator</h1>
            <p className="text-muted-foreground mt-1 text-md">
              Let Cerebro's AI assist you in creating flashcards from your study notes.
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
