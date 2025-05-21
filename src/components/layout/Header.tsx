import Link from 'next/link';
import { NavItem } from './NavItem';
import { NotebookText, CalendarDays, LayoutDashboard, Sparkles, Cat } from 'lucide-react';

// Pixel Art Gem Icon
const PixelGemIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5">
    <path d="M8 1L7 2H9L8 1ZM6 2L5 3H7L6 2ZM10 2L9 3H11L10 2ZM5 3L4 4H6L5 3ZM11 3L10 4H12L11 3ZM4 4L3 5H5L4 4ZM12 4L11 5H13L12 4ZM3 5L2 6H4L3 5ZM13 5L12 6H14L13 5ZM2 6L3 7H1V6H2ZM14 6L13 7H15V6H14ZM3 7L4 8H2V7H3ZM13 7L12 8H14V7H13ZM4 8L5 9H3V8H4ZM12 8L11 9H13V8H12ZM5 9L6 10H4V9H5ZM11 9L10 10H12V9H11ZM6 10L7 11H5V10H6ZM10 10L9 11H11V10H10ZM7 11L8 12H6V11H7ZM9 11L8 12H10V11H9ZM8 12L7 13H9L8 12ZM7 13L6 14H8L7 13ZM9 13L8 14H10L9 13ZM6 14L8 15H4L6 14ZM10 14L8 15H12L10 14Z"/>
  </svg>
);

export function Header() {
  // Placeholder values
  const coins = 0;
  const petName = "PixelPup";

  return (
    <header className="bg-card border-b-4 border-accent shadow-[0px_4px_0px_hsl(var(--primary))] text-card-foreground sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between">
        <Link href="/" className="text-3xl font-bold text-accent hover:text-primary-foreground transition-colors">
          Cerebro Companion
        </Link>
        
        <nav className="mt-2 sm:mt-0 flex flex-wrap items-center justify-center gap-1 sm:gap-2">
          <NavItem href="/" icon={<LayoutDashboard size={18} />}>Dashboard</NavItem>
          <NavItem href="/flashcards" icon={<NotebookText size={18} />}>Flashcards</NavItem>
          <NavItem href="/planner" icon={<CalendarDays size={18} />}>Planner</NavItem>
          <NavItem href="/ai-generator" icon={<Sparkles size={18} />}>AI Gen</NavItem>
          <NavItem href="/companion" icon={<Cat size={18} />}>Pet</NavItem>
        </nav>

        <div className="mt-2 sm:mt-0 flex items-center gap-3 text-sm sm:text-base text-primary-foreground">
          <div className="flex items-center gap-1">
            <PixelGemIcon />
            <span className="text-accent font-semibold">{coins}</span>
          </div>
          <div className="flex items-center gap-1">
            <Cat size={20} className="text-accent" />
            <span>{petName}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
