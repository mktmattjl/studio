
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ContentCard } from '@/components/ui/ContentCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import type { Flashcard, FlashcardSet } from '@/types';
import { cn } from '@/lib/utils';
import { CheckCircle2, XCircle, RotateCcw, Award, BookOpen } from 'lucide-react';

const AllFlashcardSets: FlashcardSet[] = [
    { 
      id: '1', 
      name: 'Intro to React', 
      cardCount: 5,
      lastStudied: '2 days ago', 
      progress: 75,
      cards: [
        { id: '1-1', question: 'What is JSX?', answer: 'JSX is a syntax extension for JavaScript. It is used with React to describe what the UI should look like. JSX may remind you of a template language, but it comes with the full power of JavaScript.', options: ['A JavaScript library', 'A CSS pre-processor', 'A syntax extension for JavaScript'], correctOption: 'A syntax extension for JavaScript' },
        { id: '1-2', question: 'What is a component?', answer: 'A component is an independent, reusable piece of UI. It’s like a JavaScript function that returns HTML.', options: ['A type of CSS class', 'A JavaScript function for logic', 'An independent, reusable piece of UI'], correctOption: 'An independent, reusable piece of UI' },
        { id: '1-3', question: 'What is "state" in React?', answer: 'State is a built-in React object that is used to contain data or information about the component. A component’s state can change over time; whenever it changes, the component re-renders.', options: ['A component\'s visual style', 'Static data that never changes', 'A built-in object to contain data or information about the component'], correctOption: 'A built-in object to contain data or information about the component' },
        { id: '1-4', question: 'What is a hook?', answer: 'Hooks are special functions that let you “hook into” React features. For example, useState is a Hook that lets you add React state to function components.', options: ['A way to handle events', 'A special function that lets you “hook into” React features', 'A method for fetching data'], correctOption: 'A special function that lets you “hook into” React features' },
        { id: '1-5', question: 'What does useState do?', answer: 'It declares a “state variable”. It returns a pair of values: the current state and a function that lets you update it.', options: ['It returns a static value', 'It returns a stateful value and a function to update it', 'It only stores strings'], correctOption: 'It returns a stateful value and a function to update it' },
      ]
    },
    { 
      id: '2', 
      name: 'Intro to Python', 
      cardCount: 1,
      lastStudied: '5 days ago', 
      progress: 40,
      cards: [
        { id: '2-1', question: 'What is a list in Python?', answer: 'A list is a data structure in Python that is a mutable, or changeable, ordered sequence of elements. Each element or value that is inside of a list is called an item.', options: ['An immutable sequence of characters', 'A mutable, ordered sequence of elements', 'A collection of key-value pairs'], correctOption: 'A mutable, ordered sequence of elements' },
      ]
    },
];

const TIMER_DURATION = 4000;

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
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  
  const [animateCardGlowKey, setAnimateCardGlowKey] = useState(0);

  useEffect(() => {
    const setId = searchParams.get('set');
    const foundSet = AllFlashcardSets.find(s => s.id === setId);
    if (foundSet && foundSet.cards.length > 0) {
      const validCards = foundSet.cards.filter(card => card.options && card.options.length >= 2 && card.correctOption);
      setQuizSet(foundSet);
      setQuizFlashcards(validCards);
    } else {
      toast({ title: "Flashcard Set Not Found", description: "This set could not be found or has no valid quiz questions.", variant: "destructive" });
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
      setCorrectAnswers(prev => prev + 1);
      setAnimateCardGlowKey(prevKey => prevKey + 1);
      toast({
        title: "Correct!",
        description: "Great job!",
        duration: 2000,
      });
    } else {
      toast({
        title: "Incorrect",
        description: `The correct answer was: ${currentCard.correctOption}`,
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  const restartQuiz = () => {
    setCurrentCardIndex(0);
    setCorrectAnswers(0);
    setIsQuizComplete(false);
    if (quizSet) {
      setQuizFlashcards(quizSet.cards.filter(card => card.options && card.options.length >= 2 && card.correctOption));
    }
    setIsAnswered(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowFullAnswer(false);
    setProgressValue(0);
  };


  if (!quizSet || quizFlashcards.length === 0) {
    return (
      <div className="text-center py-10">
        <BookOpen className="w-16 h-16 mx-auto text-primary mb-4" />
        <p className="text-xl text-muted-foreground">Loading quiz or no questions available...</p>
        <Button onClick={() => router.push('/flashcards')} className="mt-4" variant="secondary">Back to Library</Button>
      </div>
    );
  }

  if (isQuizComplete) {
    const score = Math.round((correctAnswers / quizFlashcards.length) * 100);
    return (
      <ContentCard className="text-center p-8 max-w-lg mx-auto">
        <Award className="w-16 h-16 mx-auto text-primary mb-6" />
        <h1 className="text-3xl font-semibold text-primary mb-3">Quiz Complete!</h1>
        <p className="text-xl text-muted-foreground mb-2">You scored</p>
        <div className="text-5xl font-bold text-foreground mb-6">
          {score}%
        </div>
        <p className="text-muted-foreground">{correctAnswers} out of {quizFlashcards.length} correct</p>
        <div className="space-y-3 sm:space-y-0 sm:flex sm:gap-3 justify-center mt-8">
          <Button onClick={restartQuiz} className="w-full sm:w-auto">
            <RotateCcw className="w-4 h-4 mr-2" /> Take Quiz Again
          </Button>
          <Button onClick={() => router.push('/flashcards')} variant="outline" className="w-full sm:w-auto">
            Return to Library
          </Button>
        </div>
      </ContentCard>
    );
  }

  if (!currentCard) {
     return <p className="text-center text-muted-foreground">Error: Could not load the current card.</p>;
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto relative">
      <ContentCard>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-primary truncate">{quizSet.name}</h1>
          <div className="text-lg font-medium text-muted-foreground whitespace-nowrap">
            {currentCardIndex + 1} / {quizFlashcards.length}
          </div>
        </div>
        <Progress value={((currentCardIndex + 1) / quizFlashcards.length) * 100} className="h-2 mb-6 [&>div]:bg-secondary" />
      </ContentCard>

      <ContentCard 
        key={`card-glow-${animateCardGlowKey}`}
        className={cn(
          "transition-all duration-300 ease-in-out bg-card border-2",
          isAnswered && isCorrect === true && "animate-card-correct-glow border-green-500",
          isAnswered && isCorrect === false && "border-destructive ring-2 ring-destructive/50",
          !isAnswered && "border-border"
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
              "hover:bg-accent/50 focus:bg-accent/60 border-border hover:border-accent",
              selectedAnswer === option && !isCorrect && "bg-destructive/20 border-destructive text-destructive-foreground hover:bg-destructive/30",
              selectedAnswer === option && isCorrect && "bg-green-500/20 border-green-500 text-foreground hover:bg-green-500/30 animate-button-correct-pulse",
              isAnswered && option !== currentCard.correctOption && option !== selectedAnswer && "opacity-60 cursor-not-allowed",
              isAnswered && option === currentCard.correctOption && selectedAnswer !== option && "bg-green-500/20 border-green-500 text-foreground"
            )}
            onClick={() => handleAnswerSelect(option)}
            disabled={isAnswered}
          >
            <span className="mr-3 font-semibold text-muted-foreground">{String.fromCharCode(65 + index)}.</span>
            {option}
            {selectedAnswer === option && isCorrect === true && <CheckCircle2 className="ml-auto w-5 h-5 text-green-500" />}
            {selectedAnswer === option && isCorrect === false && <XCircle className="ml-auto w-5 h-5 text-destructive" />}
          </Button>
        ))}
      </div>

      {showFullAnswer && (
        <ContentCard className="mt-6 p-6 bg-muted/30 border-t-2 border-primary">
          <h3 className="text-lg font-semibold text-primary mb-2">Answer Explanation:</h3>
          <p className="text-foreground leading-relaxed">{currentCard.answer}</p>
          {isAnswered && <Progress value={progressValue} className="mt-4 h-1 [&>div]:bg-primary transition-all duration-100 ease-linear" />}
        </ContentCard>
      )}
       <div className="text-center mt-8">
        <Button onClick={() => router.push('/flashcards')} variant="ghost" className="text-muted-foreground">
          End Quiz & Return to Library
        </Button>
      </div>
    </div>
  );
}
