
'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { generateFlashcards, type GenerateFlashcardsOutput, type GenerateFlashcardsInput } from '@/ai/flows/generate-flashcards-from-notes';
import { ContentCard } from '@/components/ui/ContentCard';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react'; // Loader can stay as lucide for now or be replaced later

// Import Pixel Art Icons
import { PixelWandIcon } from '@/components/icons/PixelWandIcon';
import { PixelFloppyDiskIcon } from '@/components/icons/PixelFloppyDiskIcon';


const FormSchema = z.object({
  notes: z.string().min(50, { message: "Notes must be at least 50 characters long." }).max(10000, { message: "Notes must be at most 10,000 characters long." }),
});

type FormData = z.infer<typeof FormSchema>;

export function AiFlashcardGeneratorForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedFlashcards, setGeneratedFlashcards] = useState<GenerateFlashcardsOutput['flashcards'] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setGeneratedFlashcards(null);
    setError(null);
    try {
      const input: GenerateFlashcardsInput = { notes: data.notes };
      const result = await generateFlashcards(input);
      if (result && result.flashcards) {
        setGeneratedFlashcards(result.flashcards);
        if (result.flashcards.length === 0) {
          toast({
            title: "No Flashcards Generated",
            description: "The AI couldn't find key concepts in your notes. Try providing more details or rephrasing.",
            variant: "default",
          });
        } else {
          toast({
            title: "Flashcards Generated!",
            description: `Successfully created ${result.flashcards.length} flashcards.`,
          });
        }
      } else {
        setError("Failed to generate flashcards. The AI returned an unexpected response.");
        toast({ title: "Generation Error", description: "The AI returned an unexpected response.", variant: "destructive"});
      }
    } catch (e) {
      console.error("Error generating flashcards:", e);
      setError("An error occurred while generating flashcards. Please try again.");
      toast({ title: "Generation Failed", description: "An error occurred. Please try again.", variant: "destructive"});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="notes" className="block text-md font-medium text-foreground mb-2">
          Paste Your Study Notes Here:
        </label>
        <Textarea
          id="notes"
          {...register('notes')}
          rows={12}
          className="bg-input text-input-foreground border-border focus:border-primary focus:ring-primary p-3 rounded-md shadow-sm text-sm"
          placeholder="e.g., Photosynthesis is a process used by plants, algae, and certain bacteria to convert light energy into chemical energy... Key concepts include chloroplasts, chlorophyll, light-dependent reactions, and the Calvin cycle."
        />
        {errors.notes && <p className="text-sm text-destructive mt-1">{errors.notes.message}</p>}
        <p className="text-xs text-muted-foreground mt-1">Min 50 characters, Max 10,000 characters.</p>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full md:w-auto btn-primary-action py-2.5 px-6 text-base">
        {isLoading ? (
          <>
            <Loader2 size={20} className="mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <PixelWandIcon className="w-5 h-5 mr-2" />
            Generate Flashcards
          </>
        )}
      </Button>

      {error && (
        <ContentCard className="border-destructive bg-destructive/10 text-destructive p-4">
          <p className="font-semibold text-sm">Error:</p>
          <p className="text-sm">{error}</p>
        </ContentCard>
      )}

      {generatedFlashcards && generatedFlashcards.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-border">
          <h2 className="text-xl font-semibold text-foreground">Generated Flashcards ({generatedFlashcards.length})</h2>
          <Accordion type="single" collapsible className="w-full space-y-3">
            {generatedFlashcards.map((card, index) => (
              <AccordionItem key={index} value={`item-${index}`} 
                className="border border-border bg-muted/30 shadow-sm rounded-md overflow-hidden">
                <AccordionTrigger className="px-4 py-3 text-left hover:bg-muted/50 text-foreground rounded-md text-sm font-medium">
                  <span className="truncate">{index + 1}. {card.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 bg-background text-card-foreground text-sm leading-relaxed">
                  {card.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
           <Button variant="outline" onClick={() => toast({title: "Save Feature", description: "Save flashcards functionality will be implemented soon."})}>
            <PixelFloppyDiskIcon className="w-4 h-4 mr-2" /> Save These Flashcards
          </Button>
        </div>
      )}
    </form>
  );
}
