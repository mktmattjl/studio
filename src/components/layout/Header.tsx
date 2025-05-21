'use client';

import Link from 'next/link';
import { NavItem } from './NavItem';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

// Import Pixel Art Icons
import { PixelJoystickIcon } from '@/components/icons/PixelJoystickIcon';
import { PixelBookIcon } from '@/components/icons/PixelBookIcon';
import { PixelCalendarIcon } from '@/components/icons/PixelCalendarIcon';
import { PixelSparkleIcon } from '@/components/icons/PixelSparkleIcon';
import { PixelUserIcon } from '@/components/icons/PixelUserIcon';
import { PixelBellIcon } from '@/components/icons/PixelBellIcon';
import { PixelCoinIcon } from '@/components/icons/PixelCoinIcon';
import { LogOut, Settings, UserCircle, LogIn, UserPlus } from 'lucide-react'; // For dropdown

export function Header() {
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  const coins = 125; // Placeholder value

  const handleLogout = async () => {
    await logout();
    // router.push('/login'); // Handled by AuthContext now
  };

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
          {currentUser && (
            <div className="flex items-center gap-1.5 text-sm bg-muted px-3 py-1.5 rounded-full">
              <PixelCoinIcon className="w-4 h-4 text-[#39FF14]" /> {/* Glitch Lime Green for Coins */}
              <span className="font-medium text-foreground">{coins}</span>
            </div>
          )}
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-full">
            <PixelBellIcon className="w-5 h-5" />
            <span className="sr-only">Notifications</span>
          </Button>

          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-full">
                  <PixelUserIcon className="w-6 h-6" />
                  <span className="sr-only">User Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover border-border text-popover-foreground rounded-md shadow-lg w-48">
                <DropdownMenuLabel className="text-sm font-medium">
                  {currentUser.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer hover:bg-muted/50">
                  <UserCircle className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/settings')} className="cursor-pointer hover:bg-muted/50">
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border"/>
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:bg-destructive/20 focus:text-destructive cursor-pointer hover:bg-destructive/10">
                  <LogOut className="mr-2 h-4 w-4" /> Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" onClick={() => router.push('/login')} className="text-sm font-medium">
                <LogIn className="mr-1.5 h-4 w-4" /> Log In
              </Button>
              <Button onClick={() => router.push('/signup')} className="btn-primary-action text-sm">
                <UserPlus className="mr-1.5 h-4 w-4" /> Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
