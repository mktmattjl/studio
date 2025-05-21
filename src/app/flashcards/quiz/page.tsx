
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ContentCard } from '@/components/ui/ContentCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import type { Flashcard, FlashcardSet } from '@/types';
import { cn } from '@/lib/utils';
import { AnimateCoinBonus } from '@/components/ui/AnimateCoinBonus'; // Import the new component

// Import Pixel Art Icons
import { PixelBrainIcon } from '@/components/icons/PixelBrainIcon';
import { PixelCoinIcon } from '@/components/icons/PixelCoinIcon';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

// Sample flashcard sets (ideally this would come from a data store or API)
const AllFlashcardSets: FlashcardSet[] = [
    { 
      id: '1', 
      name: 'History - WW2 Dates & Events', 
      cardCount: 5,
      lastStudied: '2 days ago', 
      progress: 75,
      cards: [
        { id: '1-1', question: 'When did World War II begin?', answer: 'World War II began on September 1, 1939, when Germany invaded Poland.', options: ['September 1, 1939', 'December 7, 1941', 'June 6, 1944'], correctOption: 'September 1, 1939' },
        { id: '1-2', question: 'What event triggered the US entry into WWII?', answer: 'The attack on Pearl Harbor on December 7, 1941, by Japan led to the US officially entering the war.', options: ['D-Day Invasion', 'Battle of Britain', 'Attack on Pearl Harbor'], correctOption: 'Attack on Pearl Harbor' },
        { id: '1-3', question: 'Which countries were the primary Axis powers?', answer: 'The primary Axis powers were Germany, Italy, and Japan.', options: ['Germany, Italy, Spain', 'Germany, Japan, Russia', 'Germany, Italy, Japan'], correctOption: 'Germany, Italy, Japan' },
        { id: '1-4', question: 'What was the code name for the Allied invasion of Normandy in 1944?', answer: 'Operation Overlord was the code name for the Allied invasion of Normandy.', options: ['Operation Barbarossa', 'Operation Overlord', 'Operation Market Garden'], correctOption: 'Operation Overlord' },
        { id: '1-5', question: 'Which battle is considered the turning point on the Eastern Front in WWII?', answer: 'The Battle of Stalingrad is widely considered the turning point on the Eastern Front.', options: ['Battle of Moscow', 'Battle of Kursk', 'Battle of Stalingrad'], correctOption: 'Battle of Stalingrad' },
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
  
  const [animateCoinKey, setAnimateCoinKey] = useState(0);
  const [animateCardGlowKey, setAnimateCardGlowKey] = useState(0);
  const [correctButtonPulse, setCorrectButtonPulse] = useState(false);


  useEffect(() => {
    const setId = searchParams.get('set');
    const foundSet = AllFlashcardSets.find(s => s.id === setId);
    if (foundSet && foundSet.cards.length > 0) {
      setQuizSet(foundSet);
      setQuizFlashcards(foundSet.cards.filter(card => card.options && card.options.length >= 3 && card.correctOption));
    } else {
      toast({ title: "Quiz Set Not Found", description: "Could not load the selected flashcard set or it has no quizable cards.", variant: "destructive" });
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
    setCorrectButtonPulse(false);
    // setAnimateCardGlowKey(prev => prev +1); // Re-trigger glow on next card if desired, but usually per answer
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
      }, 100);
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
      setAnimateCoinKey(prevKey => prevKey + 1);
      setAnimateCardGlowKey(prevKey => prevKey + 1);
      setCorrectButtonPulse(true);
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
    if (quizSet) {
      setQuizFlashcards(quizSet.cards.filter(card => card.options && card.options.length >= 3 && card.correctOption));
    }
    // Reset states for the first card by advancing to it (which also resets necessary states)
    setIsAnswered(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowFullAnswer(false);
    setProgressValue(0);
    setCorrectButtonPulse(false);
    // Reset animation keys if desired, though next card will naturally clear these effects
    // setAnimateCardGlowKey(0); 
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
        <div className="flex items-center justify-center gap-2 text-4xl font-bold text-chart-3 mb-6">
          <PixelCoinIcon className="w-10 h-10 text-yellow-400" /> 
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
     return <p className="text-center text-muted-foreground">Error: Could not load current card.</p>;
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto relative">
      {animateCoinKey > 0 && <AnimateCoinBonus key={animateCoinKey} amount={5} />}

      <ContentCard>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-foreground">{quizSet.name} - Quiz</h1>
          <div className="flex items-center gap-2 text-lg font-medium text-chart-3">
            <PixelCoinIcon className="w-5 h-5 text-yellow-400" />
            <span>{coins}</span>
          </div>
        </div>
        <p className="text-muted-foreground mb-1 text-sm">Card {currentCardIndex + 1} of {quizFlashcards.length}</p>
         <Progress value={(currentCardIndex / quizFlashcards.length) * 100} className="h-2 mb-6 [&>div]:bg-secondary" />
      </ContentCard>

      <ContentCard 
        key={`card-glow-${animateCardGlowKey}`}
        className={cn(
          "transition-all duration-300 ease-in-out",
          isAnswered && isCorrect === true && "animate-card-correct-glow",
          isAnswered && isCorrect === false && "border-destructive ring-2 ring-destructive/50 shadow-lg shadow-destructive/20"
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
              selectedAnswer === option && !isCorrect && "bg-destructive/20 border-destructive text-destructive-foreground hover:bg-destructive/30",
              selectedAnswer === option && isCorrect && "bg-chart-3/20 border-chart-3 text-foreground hover:bg-chart-3/30",
              selectedAnswer === option && isCorrect && correctButtonPulse && "animate-button-correct-pulse",
              isAnswered && option !== currentCard.correctOption && option !== selectedAnswer && "opacity-60 cursor-not-allowed",
              isAnswered && option === currentCard.correctOption && selectedAnswer !== option && "bg-chart-3/20 border-chart-3 text-foreground" // Show correct if user chose wrong
            )}
            onClick={() => handleAnswerSelect(option)}
            disabled={isAnswered}
          >
            <span className="mr-3 font-mono text-muted-foreground">{(index + 1)}.</span>
            {option}
            {selectedAnswer === option && isCorrect === true && <CheckCircle2 className="ml-auto w-5 h-5 text-chart-3" />}
            {selectedAnswer === option && isCorrect === false && <XCircle className="ml-auto w-5 h-5 text-destructive" />}
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
