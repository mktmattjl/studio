import Link from 'next/link';
import { NavItem } from './NavItem';
import { 
  LayoutDashboard, 
  NotebookText, 
  CalendarDays, 
  Sparkles, 
  UserCircle, 
  Bell, 
  Coins as CoinsIcon // Renamed to avoid conflict with coins variable
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  const coins = 125; // Placeholder value

  return (
    <header className="bg-card border-b border-border text-card-foreground sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/" className="text-xl font-bold text-primary hover:text-primary/80 transition-colors">
            Cerebro
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <NavItem href="/" icon={<LayoutDashboard size={16} />}>Dashboard</NavItem>
            <NavItem href="/flashcards" icon={<NotebookText size={16} />}>Flashcards</NavItem>
            <NavItem href="/planner" icon={<CalendarDays size={16} />}>Planner</NavItem>
            <NavItem href="/ai-generator" icon={<Sparkles size={16} />}>AI Gen</NavItem>
          </nav>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 text-sm text-foreground bg-secondary px-3 py-1.5 rounded-full">
            <CoinsIcon size={16} className="text-primary" />
            <span className="font-medium">{coins}</span>
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-full">
            <Bell size={20} />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-full">
            <UserCircle size={24} />
            <span className="sr-only">User Profile</span>
          </Button>
          {/* TODO: Mobile Menu Trigger for smaller screens */}
          {/* <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground hover:text-foreground rounded-full">
            <Menu size={24} />
          </Button> */}
        </div>
      </div>
    </header>
  );
}
