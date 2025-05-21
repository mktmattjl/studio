
export interface FlashcardCore {
  question: string;
  answer: string;
}

export interface Flashcard extends FlashcardCore {
  id: string;
  options?: string[]; // For multiple choice, array of 3-4 options
  correctOption?: string; // The correct string from the options array
  lastReviewed?: string; // ISO date string
  nextReview?: string; // ISO date string
  leitnerBox?: number;
  tags?: string[];
}

export interface FlashcardSet {
  id: string;
  name: string;
  cardCount: number; // This might become dynamic based on cards.length
  lastStudied: string;
  progress: number;
  cards: Flashcard[]; // Array of flashcards within the set
}

export interface StudyEvent {
  id:string;
  title: string;
  date: string; // ISO date string
  type: 'class' | 'deadline' | 'study_session' | 'exam';
  description?: string;
  subject?: string;
}

export interface VirtualPet {
  name: string;
  happiness: number;
  hunger: number;
  // Add more pet attributes if needed
}
