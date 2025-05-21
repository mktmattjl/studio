export interface FlashcardCore {
  question: string;
  answer: string;
}

export interface Flashcard extends FlashcardCore {
  id: string;
  options?: string[]; // For multiple choice
  correctOption?: string; // For multiple choice
  lastReviewed?: string; // ISO date string
  nextReview?: string; // ISO date string
  leitnerBox?: number;
  tags?: string[];
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
