
import { ContentCard } from '@/components/ui/ContentCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PixelPlusIcon } from '@/components/icons/PixelPlusIcon';
import { PixelBookIcon } from '@/components/icons/PixelBookIcon';
import Link from 'next/link';

export default function NewFlashcardSetPage() {
  return (
    <div className="space-y-6 sm:space-y-8 max-w-2xl mx-auto">
      <ContentCard>
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-primary/10 rounded-lg">
            <PixelBookIcon className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground">Create New Flashcard Set</h1>
            <p className="text-muted-foreground mt-1 text-md">
              Start building your new collection of flashcards.
            </p>
          </div>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <Label htmlFor="setName" className="block text-sm font-medium text-foreground mb-1.5">Set Name</Label>
            <Input id="setName" placeholder="e.g., Biology - Chapter 5" className="bg-input text-input-foreground" />
          </div>
          <div>
            <Label htmlFor="setDescription" className="block text-sm font-medium text-foreground mb-1.5">Description (Optional)</Label>
            <Textarea id="setDescription" placeholder="A brief description of what this set covers." rows={3} className="bg-input text-input-foreground" />
          </div>
          <div>
            <Label htmlFor="setTags" className="block text-sm font-medium text-foreground mb-1.5">Tags (Optional, comma-separated)</Label>
            <Input id="setTags" placeholder="e.g., biology, cells, mitochondria" className="bg-input text-input-foreground" />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button type="submit" className="btn-primary-action w-full sm:w-auto">
              <PixelPlusIcon className="w-5 h-5 mr-2" />
              Create Set & Add Cards
            </Button>
            <Link href="/flashcards" passHref>
              <Button type="button" variant="outline" className="w-full sm:w-auto">
                Cancel
              </Button>
            </Link>
          </div>
          <p className="text-xs text-muted-foreground text-center pt-2">Note: Full card creation functionality will be added soon.</p>
        </form>
      </ContentCard>
    </div>
  );
}
