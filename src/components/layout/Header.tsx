import Link from 'next/link';
import { NavItem } from './NavItem';
import { NotebookText, CalendarDays, LayoutDashboard, Sparkles, Cat } from 'lucide-react';
import { PixelCoinIcon } from '@/components/icons/PixelCoinIcon'; // Updated import

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
            <PixelCoinIcon className="w-5 h-5 text-yellow-400" /> {/* Using the new icon */}
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
