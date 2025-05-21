
'use client';

import { ContentCard } from '@/components/ui/ContentCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, PlayCircle } from 'lucide-react'; // Will be replaced by pixel icons if requested later
import Image from 'next/image';

interface CurrentLearningItem {
  id: string;
  title: string;
  category: string;
  progress: number;
  imageUrl?: string;
  description?: string;
}

export function JumpBackInCard() {
  const learningItem: CurrentLearningItem = {
    id: '1',
    title: 'Advanced React Patterns',
    category: 'Frontend Development',
    progress: 70,
    imageUrl: 'https://placehold.co/800x450/151A21/9CA3AF.png', 
    description: 'Dive deeper into React state management, context API, and performance optimization techniques.'
  };

  return (
    <ContentCard className="col-span-1 md:col-span-2 lg:col-span-3 shadow-xl overflow-hidden">
      <div className="md:flex">
        <div className="md:w-2/5 h-56 md:h-auto relative">
           <Image 
            src={learningItem.imageUrl || "https://placehold.co/800x450/151A21/9CA3AF.png"} 
            alt={learningItem.title} 
            fill // Changed from layout="fill"
            objectFit="cover" 
            className="rounded-l-lg md:rounded-t-none md:rounded-l-lg" 
            data-ai-hint="modern learning abstract"
            />
        </div>
        <div className="p-6 md:p-8 md:w-3/5 flex flex-col justify-center">
          <p className="text-xs text-primary font-semibold mb-1 uppercase tracking-wider">{learningItem.category}</p>
          <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-2">{learningItem.title}</h2> {/* Reduced font size */}
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {learningItem.description || "Pick up where you left off and continue your learning journey."}
          </p>
          <div className="mb-5">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Progress</span>
              <span className="font-semibold text-foreground">{learningItem.progress}%</span>
            </div>
            <Progress value={learningItem.progress} className="h-2 bg-muted [&>div]:bg-primary" />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="btn-primary-action flex-1 sm:flex-none"> 
              <PlayCircle size={20} className="mr-2" />
              Continue Learning
            </Button>
            <Button size="lg" variant="outline" className="flex-1 sm:flex-none">
              <BookOpen size={20} className="mr-2" />
              View Details
            </Button>
          </div>
        </div>
      </div>
    </ContentCard>
  );
}
