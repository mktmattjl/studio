'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Textarea } from '@/components/ui/textarea';
import { PixelatedButton } from '@/components/PixelatedButton';
import { generateFlashcards, type GenerateFlashcardsOutput, type GenerateFlashcardsInput } from '@/ai/flows/generate-flashcards-from-notes';
import { Loader2, Wand2 } from 'lucide-react';
import { PixelatedContainer } from '@/components/PixelatedContainer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FormSchema = z.object({
  notes: z.string().min(50, { message: "Notes must be at least 50 characters long." }).max(5000, { message: "Notes must be at most 5000 characters long." }),
});

type FormData = z.infer<typeof FormSchema>;

export function AiFlashcardGeneratorForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedFlashcards, setGeneratedFlashcards] = useState<GenerateFlashcardsOutput['flashcards'] | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      } else {
        setError("Failed to generate flashcards. The AI returned an unexpected response.");
      }
    } catch (e) {
      console.error("Error generating flashcards:", e);
      setError("An error occurred while generating flashcards. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="notes" className="block text-lg font-medium text-primary-foreground mb-1">
          Paste Your Study Notes Here:
        </label>
        <Textarea
          id="notes"
          {...register('notes')}
          rows={10}
          className="bg-input text-input-foreground border-2 border-border focus:border-accent focus:ring-accent p-3 rounded-none shadow-[2px_2px_0px_hsl(var(--primary))]"
          placeholder="e.g., The mitochondria is the powerhouse of the cell. It generates most of the cell's supply of adenosine triphosphate (ATP), used as a source of chemical energy..."
        />
        {errors.notes && <p className="text-sm text-destructive mt-1">{errors.notes.message}</p>}
        <p className="text-xs text-muted-foreground mt-1">Min 50 characters, Max 5000 characters.</p>
      </div>

      <PixelatedButton type="submit" disabled={isLoading} className="w-full md:w-auto">
        {isLoading ? (
          <>
            <Loader2 size={20} className="mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Wand2 size={20} className="mr-2" />
            Generate Flashcards
          </>
        )}
      </PixelatedButton>

      {error && (
        <PixelatedContainer className="border-destructive bg-destructive/10 text-destructive">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </PixelatedContainer>
      )}

      {generatedFlashcards && generatedFlashcards.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary-foreground">Generated Flashcards ({generatedFlashcards.length})</h2>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {generatedFlashcards.map((card, index) => (
              <AccordionItem key={index} value={`item-${index}`} 
                className="border-2 border-accent bg-card shadow-[2px_2px_0px_hsl(var(--primary))] rounded-none overflow-hidden">
                <AccordionTrigger className="px-4 py-3 text-left hover:bg-accent/10 text-primary-foreground rounded-none">
                  <span className="truncate text-lg">{index + 1}. {card.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 bg-background/50 text-card-foreground text-md">
                  {card.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
           <PixelatedButton variant="outline" onClick={() => alert("Save flashcards functionality to be implemented.")}>
            Save These Flashcards
          </PixelatedButton>
        </div>
      )}
      {generatedFlashcards && generatedFlashcards.length === 0 && (
         <PixelatedContainer>
          <p className="text-muted-foreground">The AI couldn't generate any flashcards from your notes. Try providing more detailed notes.</p>
        </PixelatedContainer>
      )}
    </form>
  );
}
