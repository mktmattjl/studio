
import Link from 'next/link';
import { NavItem } from './NavItem';
import { Button } from '@/components/ui/button';

// Import Pixel Art Icons
import { PixelJoystickIcon } from '@/components/icons/PixelJoystickIcon';
import { PixelBookIcon } from '@/components/icons/PixelBookIcon';
import { PixelCalendarIcon } from '@/components/icons/PixelCalendarIcon';
import { PixelSparkleIcon } from '@/components/icons/PixelSparkleIcon';
import { PixelUserIcon } from '@/components/icons/PixelUserIcon';
import { PixelBellIcon } from '@/components/icons/PixelBellIcon';
import { PixelCoinIcon } from '@/components/icons/PixelCoinIcon';


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
            <NavItem href="/" icon={<PixelJoystickIcon className="w-4 h-4" />}>Dashboard</NavItem>
            <NavItem href="/flashcards" icon={<PixelBookIcon className="w-4 h-4" />}>Flashcards</NavItem>
            <NavItem href="/planner" icon={<PixelCalendarIcon className="w-4 h-4" />}>Planner</NavItem>
            <NavItem href="/ai-generator" icon={<PixelSparkleIcon className="w-4 h-4" />}>AI Gen</NavItem>
          </nav>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 text-sm bg-muted px-3 py-1.5 rounded-full">
            <PixelCoinIcon className="w-4 h-4 text-[#ECC94B]" /> {/* Golden Yellow for Coins */}
            <span className="font-medium text-foreground">{coins}</span>
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-full">
            <PixelBellIcon className="w-5 h-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-full">
            <PixelUserIcon className="w-6 h-6" />
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
