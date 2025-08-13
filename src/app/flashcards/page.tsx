
'use client';

import { ContentCard } from '@/components/ui/ContentCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import type { FlashcardSet } from '@/types';
import React from 'react';
import { PlusCircle, Book, Search, BrainCircuit, Zap } from 'lucide-react';

export default function FlashcardsPage() {
  const flashcardSets: FlashcardSet[] = [
    {
      id: '1',
      name: 'Intro to React',
      cardCount: 5,
      lastStudied: '2 days ago',
      progress: 75,
      cards: [
        { id: '1-1', question: 'What is JSX?', answer: 'A syntax extension for JavaScript.' },
        { id: '1-2', question: 'What is a component?', answer: 'An independent, reusable piece of UI.' },
        { id: '1-3', question: 'What is state in React?', answer: 'A built-in object to contain data or information about the component.' },
        { id: '1-4', question: 'What is a hook?', answer: 'A special function that lets you “hook into” React features.' },
        { id: '1-5', question: 'What does useState do?', answer: 'It returns a stateful value and a function to update it.' },
      ]
    },
    {
      id: '2',
      name: 'Intro to Python',
      cardCount: 1,
      lastStudied: '5 days ago',
      progress: 40,
      cards: [
        { id: '2-1', question: 'What is a list in Python?', answer: 'A mutable, or changeable, ordered sequence of elements.' },
      ]
    },
    {
      id: '3',
      name: 'Advanced CSS',
      cardCount: 75,
      lastStudied: 'Yesterday',
      progress: 90,
      cards: []
    },
    {
      id: '4',
      name: 'Data Structures',
      cardCount: 25,
      lastStudied: 'Never Studied',
      progress: 0,
      cards: []
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <ContentCard>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold text-primary">Flashcard Library</h1>
            <p className="text-muted-foreground mt-1 text-lg">Create, manage, and review your flashcard sets.</p>
          </div>
          <Link href="/flashcards/new" passHref>
            <Button className="w-full sm:w-auto">
              <PlusCircle className="w-5 h-5 mr-2" />
              New Set
            </Button>
          </Link>
        </div>
        <div className="mt-6">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
            <Input placeholder="Search your flashcard sets..." className="pl-10 text-base bg-input text-input-foreground" />
          </div>
        </div>
      </ContentCard>

      {flashcardSets.length > 0 ? (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-foreground px-1 mb-4">Your Sets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {flashcardSets.map((set) => (
                <ContentCard key={set.id} className="flex flex-col hover:shadow-xl transition-all duration-150 ease-in-out group border-2 border-transparent hover:border-primary/50" interactive>
                  <Link href={`/flashcards/quiz?set=${set.id}`} className="flex flex-col h-full p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{set.name}</h3>
                      <Book className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </div>
                    <p className="text-sm text-muted-foreground">{set.cards.length > 0 ? `${set.cards.length} card${set.cards.length === 1 ? '' : 's'}` : `${set.cardCount} cards`}</p>
                    <p className="text-xs text-muted-foreground mt-1">Last studied: {set.lastStudied}</p>
                    
                    <div className="mt-4 mb-2 flex-grow"></div>

                    <div className="mt-auto"> 
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>Mastery</span>
                            <span className="font-medium text-foreground">{set.progress}%</span>
                        </div>
                        <Progress value={set.progress} className="h-2 [&>div]:bg-primary" />
                    </div>
                  </Link>
                </ContentCard>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <ContentCard className="text-center py-16">
          <Book className="w-14 h-14 mx-auto text-muted-foreground/50 mb-6" />
          <h2 className="text-2xl font-semibold text-foreground mb-2">No Flashcard Sets Yet</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-md mx-auto">Start by creating your first set of flashcards.</p>
          <Link href="/flashcards/new" passHref>
            <Button size="lg">
                <PlusCircle className="w-5 h-5 mr-2" /> Create First Set
            </Button>
          </Link>
        </ContentCard>
      )}

      <ContentCard>
        <h2 className="text-2xl font-semibold text-secondary mb-4">Study Modes</h2>
        <div className="grid md:grid-cols-2 gap-4">
            <Link href="/flashcards/quiz?set=1" passHref className="w-full">
              <Button variant="outline" size="lg" className="w-full py-3 justify-start text-base h-auto hover:border-primary hover:bg-primary/10">
                  <BrainCircuit className="w-5 h-5 mr-3 text-primary"/> 
                  <div>
                      <span className="font-medium">Quiz Mode</span>
                      <p className="text-xs text-muted-foreground font-normal">Test your knowledge with challenging questions.</p>
                  </div>
              </Button>
            </Link>
            <Link href="/flashcards/srs" passHref className="w-full">
              <Button variant="outline" size="lg" className="w-full py-3 justify-start text-base h-auto hover:border-secondary hover:bg-secondary/10">
                  <Zap className="w-5 h-5 mr-3 text-secondary"/> 
                   <div>
                      <span className="font-medium">Spaced Repetition (SRS)</span>
                      <p className="text-xs text-muted-foreground font-normal">Optimize learning with an intelligent algorithm.</p>
                  </div>
              </Button>
            </Link>
        </div>
      </ContentCard>
    </div>
  );
}
