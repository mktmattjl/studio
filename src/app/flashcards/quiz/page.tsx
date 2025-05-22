
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ContentCard } from '@/components/ui/ContentCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import type { Flashcard, FlashcardSet } from '@/types';
import { cn } from '@/lib/utils';
import { AnimateCoinBonus } from '@/components/ui/AnimateCoinBonus'; 

// Fantasy Pixel Art Icons
import { PixelMagicOrbIcon as PixelBrainIcon } from '@/components/icons/fantasy/PixelMagicOrbIcon';
import { PixelGoldCoinIcon } from '@/components/icons/fantasy/PixelGoldCoinIcon';
import { PixelScrollIcon } from '@/components/icons/fantasy/PixelScrollIcon';

import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react'; // Keep for now, or replace with thematic pixel icons

// Sample flashcard sets (ideally this would come from a data store or API)
const AllFlashcardSets: FlashcardSet[] = [
    { 
      id: '1', 
      name: 'Ancient Runes: Vol. I', 
      cardCount: 5,
      lastStudied: '2 moons ago', 
      progress: 75,
      cards: [
        { id: '1-1', question: 'What is the rune for "Strength"?', answer: 'Uruz is the rune representing primal strength and untamed power.', options: ['Uruz', 'Fehu', 'Thurisaz'], correctOption: 'Uruz' },
        { id: '1-2', question: 'The rune "Ansuz" primarily represents?', answer: 'Ansuz signifies divine breath, communication, inspiration, and wisdom from the gods.', options: ['Wealth', 'Journey', 'Divine breath'], correctOption: 'Divine breath' },
        { id: '1-3', question: 'Which rune signifies "Journey" or "Travel," both physical and spiritual?', answer: 'Raido is the rune of the chariot, representing travel, rhythm, and right action.', options: ['Kenaz', 'Raido', 'Gebo'], correctOption: 'Raido' },
        { id: '1-4', question: 'What is the meaning of "Hagalaz," the rune of disruption?', answer: 'Hagalaz represents hail, destructive natural forces, and sudden, uncontrolled change.', options: ['Joy', 'Harvest', 'Hail'], correctOption: 'Hail' },
        { id: '1-5', question: 'The rune for "Ice" or "Challenge," representing a state of stillness or blockage, is?', answer: 'Isa symbolizes ice, a state of stasis, challenge, or introspection.', options: ['Isa', 'Jera', 'Eihwaz'], correctOption: 'Isa' },
      ]
    },
    { 
      id: '2', 
      name: 'Creature Compendium: Goblins', 
      cardCount: 1,
      lastStudied: '5 suns past', 
      progress: 40,
      cards: [
        { id: '2-1', question: 'Typical goblin weapon of choice for ambushes?', answer: 'Goblins favor rusty daggers or crude, often poisoned, short swords for their sneaky tactics.', options: ['Enchanted Longswords', 'Glimmering Magic Staves', 'Rusty daggers'], correctOption: 'Rusty daggers' },
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
      toast({ title: "Scroll Set Not Found", description: "Could not decipher the selected scroll set or it holds no trials.", variant: "destructive" });
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
        title: "Victory!",
        description: "+5 Gold Pieces!",
        duration: 2000,
      });
    } else {
      toast({
        title: "Defeated!",
        description: `The true answer was: ${currentCard.correctOption}`,
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
    setIsAnswered(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowFullAnswer(false);
    setProgressValue(0);
    setCorrectButtonPulse(false);
  };


  if (!quizSet || quizFlashcards.length === 0) {
    return (
      <div className="text-center py-10">
        <PixelScrollIcon className="w-16 h-16 mx-auto text-primary mb-4" />
        <p className="text-xl text-muted-foreground font-pixel">Loading Trial or no challenges in this scroll...</p>
        <Button onClick={() => router.push('/flashcards')} className="mt-4 btn-secondary-action">Back to Library</Button>
      </div>
    );
  }

  if (isQuizComplete) {
    return (
      <ContentCard className="text-center p-8 max-w-lg mx-auto">
        <PixelBrainIcon className="w-16 h-16 mx-auto text-primary mb-6" />
        <h1 className="text-3xl font-pixel text-primary mb-3">Trial Complete!</h1>
        <p className="text-xl text-muted-foreground mb-2">Thou hast earned a total of</p>
        <div className="flex items-center justify-center gap-2 text-4xl font-bold text-gold-accent mb-6">
          <PixelGoldCoinIcon className="w-10 h-10" /> 
          {coins}
        </div>
        <div className="space-y-3 sm:space-y-0 sm:flex sm:gap-3 justify-center">
          <Button onClick={restartQuiz} className="btn-primary-action w-full sm:w-auto">
            <RotateCcw className="w-4 h-4 mr-2" /> Face Trial Again
          </Button>
          <Button onClick={() => router.push('/flashcards')} variant="outline" className="w-full sm:w-auto">
            Return to Scroll Library
          </Button>
        </div>
      </ContentCard>
    );
  }

  if (!currentCard) {
     return <p className="text-center text-muted-foreground font-pixel">Error: Could not unroll current scroll.</p>;
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto relative">
      {animateCoinKey > 0 && <AnimateCoinBonus key={animateCoinKey} amount={5} />}

      <ContentCard>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-pixel text-primary">{quizSet.name} - Trial</h1>
          <div className="flex items-center gap-2 text-lg font-medium text-gold-accent">
            <PixelGoldCoinIcon className="w-5 h-5" />
            <span className="font-pixel">{coins}</span>
          </div>
        </div>
        <p className="text-muted-foreground mb-1 text-sm">Scroll {currentCardIndex + 1} of {quizFlashcards.length}</p>
         <Progress value={(currentCardIndex / quizFlashcards.length) * 100} className="h-2 mb-6 [&>div]:bg-secondary" />
      </ContentCard>

      <ContentCard 
        key={`card-glow-${animateCardGlowKey}`}
        className={cn(
          "transition-all duration-300 ease-in-out bg-card border-2 border-border", // Thematic card
          isAnswered && isCorrect === true && "animate-card-correct-glow border-secondary", // Emerald glow
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
              "hover:bg-accent/50 focus:bg-accent/60 border-border hover:border-accent", // Thematic hover
              selectedAnswer === option && !isCorrect && "bg-destructive/20 border-destructive text-destructive-foreground hover:bg-destructive/30",
              selectedAnswer === option && isCorrect && "bg-secondary/20 border-secondary text-secondary-foreground hover:bg-secondary/30", // Emerald for correct
              selectedAnswer === option && isCorrect && correctButtonPulse && "animate-button-correct-pulse",
              isAnswered && option !== currentCard.correctOption && option !== selectedAnswer && "opacity-60 cursor-not-allowed",
              isAnswered && option === currentCard.correctOption && selectedAnswer !== option && "bg-secondary/20 border-secondary text-secondary-foreground"
            )}
            onClick={() => handleAnswerSelect(option)}
            disabled={isAnswered}
          >
            <span className="mr-3 font-pixel text-muted-foreground">{(index + 1)}.</span>
            {option}
            {selectedAnswer === option && isCorrect === true && <CheckCircle2 className="ml-auto w-5 h-5 text-secondary" />}
            {selectedAnswer === option && isCorrect === false && <XCircle className="ml-auto w-5 h-5 text-destructive" />}
          </Button>
        ))}
      </div>

      {showFullAnswer && (
        <ContentCard className="mt-6 p-6 bg-muted/30 border-t-2 border-primary">
          <h3 className="text-lg font-pixel text-primary mb-2">The Sage's Wisdom:</h3>
          <p className="text-foreground leading-relaxed">{currentCard.answer}</p>
          {isAnswered && <Progress value={progressValue} className="mt-4 h-1.5 [&>div]:bg-primary transition-all duration-100 ease-linear" />}
        </ContentCard>
      )}
       <div className="text-center mt-8">
        <Button onClick={() => router.push('/flashcards')} variant="ghost" className="text-muted-foreground font-pixel">
          End Trial & Return to Library
        </Button>
      </div>
    </div>
  );
}

    