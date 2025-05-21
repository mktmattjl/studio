
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ContentCard } from '@/components/ui/ContentCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import type { Flashcard, FlashcardSet } from '@/types';
import { cn } from '@/lib/utils';

// Import Pixel Art Icons
import { PixelBrainIcon } from '@/components/icons/PixelBrainIcon';
import { PixelCoinIcon } from '@/components/icons/PixelCoinIcon';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react'; // Using Lucide for feedback icons for now

// Sample flashcard sets (ideally this would come from a data store or API)
// For now, using a simplified version of the data from flashcards/page.tsx for this quiz component
const AllFlashcardSets: FlashcardSet[] = [
    { 
      id: '1', 
      name: 'History - WW2 Dates & Events', 
      cardCount: 3,
      lastStudied: '2 days ago', 
      progress: 75,
      cards: [
        { id: '1-1', question: 'When did World War II begin?', answer: 'World War II began on September 1, 1939, when Germany invaded Poland.', options: ['September 1, 1939', 'December 7, 1941', 'June 6, 1944'], correctOption: 'September 1, 1939' },
        { id: '1-2', question: 'What event triggered the US entry into WWII?', answer: 'The attack on Pearl Harbor on December 7, 1941, by Japan led to the US officially entering the war.', options: ['D-Day Invasion', 'Battle of Britain', 'Attack on Pearl Harbor'], correctOption: 'Attack on Pearl Harbor' },
        { id: '1-3', question: 'Which countries were the primary Axis powers?', answer: 'The primary Axis powers were Germany, Italy, and Japan.', options: ['Germany, Italy, Spain', 'Germany, Japan, Russia', 'Germany, Italy, Japan'], correctOption: 'Germany, Italy, Japan' },
      ]
    },
    { 
      id: '2', 
      name: 'Biology - Cell Structure', 
      cardCount: 1,
      lastStudied: '5 days ago', 
      progress: 40,
      cards: [
        { id: '2-1', question: 'What is the powerhouse of the cell?', answer: 'Mitochondria are known as the powerhouses of the cell because they generate most of the cell\'s supply of adenosine triphosphate (ATP), used as a source of chemical energy.', options: ['Nucleus', 'Mitochondria', 'Ribosome'], correctOption: 'Mitochondria' },
      ]
    },
];


const TIMER_DURATION = 4000; // 4 seconds

export default function QuizPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [quizSet, setQuizSet] = useState<FlashcardSet | null>(null);
  const [quizFlashcards, setQuizFlashcards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFullAnswer, setShowFullAnswer] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [coins, setCoins] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  useEffect(() => {
    const setId = searchParams.get('set');
    const foundSet = AllFlashcardSets.find(s => s.id === setId);
    if (foundSet && foundSet.cards.length > 0) {
      setQuizSet(foundSet);
      // Shuffle cards for variety? For now, sequential.
      setQuizFlashcards(foundSet.cards.filter(card => card.options && card.options.length >= 3 && card.correctOption));
    } else {
      toast({ title: "Quiz Set Not Found", description: "Could not load the selected flashcard set for the quiz or it has no quizable cards.", variant: "destructive" });
      router.push('/flashcards');
    }
  }, [searchParams, router, toast]);
  

  const currentCard = quizFlashcards[currentCardIndex];

  const handleNextCard = useCallback(() => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowFullAnswer(false);
    setProgressValue(0);
    if (currentCardIndex < quizFlashcards.length - 1) {
      setCurrentCardIndex(prevIndex => prevIndex + 1);
    } else {
      setIsQuizComplete(true);
    }
  }, [currentCardIndex, quizFlashcards.length]);


  useEffect(() => {
    let timerInterval: NodeJS.Timeout;
    if (isAnswered && showFullAnswer) {
      let startTime = Date.now();
      timerInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const newProgress = Math.min(100, (elapsedTime / TIMER_DURATION) * 100);
        setProgressValue(newProgress);
        if (elapsedTime >= TIMER_DURATION) {
          clearInterval(timerInterval);
          handleNextCard();
        }
      }, 100); // Update progress bar frequently
    }
    return () => clearInterval(timerInterval);
  }, [isAnswered, showFullAnswer, handleNextCard]);


  const handleAnswerSelect = (option: string) => {
    if (isAnswered) return;

    setSelectedAnswer(option);
    setIsAnswered(true);
    const correct = option === currentCard.correctOption;
    setIsCorrect(correct);
    setShowFullAnswer(true);

    if (correct) {
      setCoins(prevCoins => prevCoins + 5);
      toast({
        title: "Correct!",
        description: "+5 Coins!",
        duration: 2000,
      });
    } else {
      toast({
        title: "Incorrect!",
        description: `The correct answer was: ${currentCard.correctOption}`,
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  const restartQuiz = () => {
    setCurrentCardIndex(0);
    setCoins(0);
    setIsQuizComplete(false);
    // Optionally re-shuffle cards if shuffling is implemented
     if (quizSet) {
      setQuizFlashcards(quizSet.cards.filter(card => card.options && card.options.length >= 3 && card.correctOption));
    }
    handleNextCard(); // Reset states for the first card
  };


  if (!quizSet || quizFlashcards.length === 0) {
    return (
      <div className="text-center py-10">
        <PixelBrainIcon className="w-16 h-16 mx-auto text-primary mb-4" />
        <p className="text-xl text-muted-foreground">Loading quiz or no quizable cards in this set...</p>
        <Button onClick={() => router.push('/flashcards')} className="mt-4 btn-secondary-action">Back to Library</Button>
      </div>
    );
  }

  if (isQuizComplete) {
    return (
      <ContentCard className="text-center p-8 max-w-lg mx-auto">
        <PixelBrainIcon className="w-16 h-16 mx-auto text-primary mb-6" />
        <h1 className="text-3xl font-semibold text-foreground mb-3">Quiz Complete!</h1>
        <p className="text-xl text-muted-foreground mb-2">You earned a total of</p>
        <div className="flex items-center justify-center gap-2 text-4xl font-bold text-primary mb-6">
          <PixelCoinIcon className="w-10 h-10 text-[#39FF14]" /> 
          {coins}
        </div>
        <div className="space-y-3 sm:space-y-0 sm:flex sm:gap-3 justify-center">
          <Button onClick={restartQuiz} className="btn-primary-action w-full sm:w-auto">
            <RotateCcw className="w-4 h-4 mr-2" /> Restart Quiz
          </Button>
          <Button onClick={() => router.push('/flashcards')} variant="outline" className="w-full sm:w-auto">
            Back to Flashcard Library
          </Button>
        </div>
      </ContentCard>
    );
  }


  if (!currentCard) {
    // Should not happen if quizFlashcards is populated and isQuizComplete is false
     return <p className="text-center text-muted-foreground">Error: Could not load current card.</p>;
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <ContentCard>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-foreground">{quizSet.name} - Quiz</h1>
          <div className="flex items-center gap-2 text-lg font-medium text-primary">
            <PixelCoinIcon className="w-5 h-5 text-[#39FF14]" />
            <span>{coins}</span>
          </div>
        </div>
        <p className="text-muted-foreground mb-1 text-sm">Card {currentCardIndex + 1} of {quizFlashcards.length}</p>
         <Progress value={(currentCardIndex / quizFlashcards.length) * 100} className="h-2 mb-6 [&>div]:bg-secondary" />
      </ContentCard>

      <ContentCard className={cn(
          "transition-all duration-300 ease-in-out",
          isAnswered && isCorrect === true && "border-green-500 ring-2 ring-green-500/50 shadow-lg shadow-green-500/20",
          isAnswered && isCorrect === false && "border-red-500 ring-2 ring-red-500/50 shadow-lg shadow-red-500/20"
        )}>
        <div className="p-6 min-h-[120px] flex items-center justify-center">
          <p className="text-xl md:text-2xl text-center font-medium text-foreground">{currentCard.question}</p>
        </div>
      </ContentCard>

      <div className="grid grid-cols-1 gap-3">
        {currentCard.options?.map((option, index) => (
          <Button
            key={index}
            variant="outline"
            className={cn(
              "text-left justify-start p-4 h-auto text-base leading-normal w-full transition-all duration-150 ease-in-out",
              "hover:bg-accent/50 focus:bg-accent/60",
              selectedAnswer === option && !isCorrect && "bg-red-500/20 border-red-500 text-red-200 hover:bg-red-500/30",
              selectedAnswer === option && isCorrect && "bg-green-500/20 border-green-500 text-green-200 hover:bg-green-500/30",
              isAnswered && option !== currentCard.correctOption && option !== selectedAnswer && "opacity-60 cursor-not-allowed",
              isAnswered && option === currentCard.correctOption && "bg-green-500/20 border-green-500 text-green-200"
            )}
            onClick={() => handleAnswerSelect(option)}
            disabled={isAnswered}
          >
            <span className="mr-3 font-mono text-muted-foreground">{(index + 1)}.</span>
            {option}
            {selectedAnswer === option && isCorrect === true && <CheckCircle2 className="ml-auto w-5 h-5 text-green-400" />}
            {selectedAnswer === option && isCorrect === false && <XCircle className="ml-auto w-5 h-5 text-red-400" />}
          </Button>
        ))}
      </div>

      {showFullAnswer && (
        <ContentCard className="mt-6 p-6 bg-muted/30 border-t-2 border-primary">
          <h3 className="text-lg font-semibold text-primary mb-2">Correct Answer:</h3>
          <p className="text-foreground leading-relaxed">{currentCard.answer}</p>
          {isAnswered && <Progress value={progressValue} className="mt-4 h-1.5 [&>div]:bg-primary transition-all duration-100 ease-linear" />}
        </ContentCard>
      )}
       <div className="text-center mt-8">
        <Button onClick={() => router.push('/flashcards')} variant="ghost" className="text-muted-foreground">
          End Quiz & Back to Library
        </Button>
      </div>
    </div>
  );
}
