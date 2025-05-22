// src/components/layout/Header.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image'; // Import the Next.js Image component
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

// Fantasy Pixel Art Icons
import {
  PixelCompassIcon,
  // PixelScrollIcon, // Replaced by PixelStackedDocumentsIcon for Flashcards
  PixelMapIcon,
  PixelMagicOrbIcon,
  PixelGoldCoinIcon,
  PixelFantasyAvatarIcon,
  PixelFantasySettingsIcon,
} from '@/components/icons/fantasy';
import { PixelBellIcon } from '@/components/icons/PixelBellIcon'; 
import { PixelStackedDocumentsIcon } from '@/components/icons/fantasy/PixelStackedDocumentsIcon';


// Lucide icons for dropdown actions
import { LogOut, LogIn, UserPlus } from 'lucide-react';

export function Header() {
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  const coins = 125; // Placeholder value

  const handleLogout = async () => {
    await logout();
    // router.push('/login'); // AuthContext already handles redirect
  };

  return (
    <header className="bg-card border-b border-border text-card-foreground sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-6">
          {/* Cerebro title text color now uses thematic text accent */}
          <Link href="/" className="font-pixel text-2xl font-bold text-[hsl(var(--text-accent-thematic))] hover:text-[hsl(var(--text-accent-thematic)/0.8)] transition-colors">
            Cerebro
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <NavItem href="/" icon={<PixelCompassIcon className="w-5 h-5" />}>Dashboard</NavItem>
            <NavItem
              href="/flashcards"
              icon={
                currentUser ? (
                  <Image src="/icons/flashcard-icon.png" alt="Flashcards" width={20} height={20} />
                ) : (
                  <PixelStackedDocumentsIcon className="w-5 h-5" />
                )
              }
            >
              Flashcards
            </NavItem>
            <NavItem href="/planner" icon={<PixelMapIcon className="w-5 h-5" />}>Planner</NavItem>
            <NavItem href="/ai-generator" icon={<PixelMagicOrbIcon className="w-5 h-5" />}>AI Wizard</NavItem>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {currentUser && (
            <div className="flex items-center gap-1.5 text-sm bg-muted/50 text-foreground px-3 py-1.5 rounded-md border border-border">
              <PixelGoldCoinIcon className="w-5 h-5 text-[hsl(var(--gold-accent))]" />
              <span className="font-pixel text-base text-foreground">{coins}</span>
            </div>
          )}
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-md w-9 h-9">
            <PixelBellIcon className="w-6 h-6" />
            <span className="sr-only">Notifications</span>
          </Button>

          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-md">
                  <PixelFantasyAvatarIcon className="w-6 h-6" />
                  <span className="sr-only">User Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover border-border text-popover-foreground rounded-md shadow-lg w-48 font-pixel">
                <DropdownMenuLabel className="text-sm font-medium text-popover-foreground">
                  {currentUser.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer hover:bg-muted/50 text-popover-foreground">
                  <PixelFantasyAvatarIcon className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/settings')} className="cursor-pointer hover:bg-muted/50 text-popover-foreground">
                  <PixelFantasySettingsIcon className="mr-2 h-4 w-4" /> Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border/50"/>
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:bg-destructive/20 focus:text-destructive-foreground cursor-pointer hover:bg-destructive/10">
                  <LogOut className="mr-2 h-4 w-4" /> Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" onClick={() => router.push('/login')} className="text-sm font-medium text-foreground hover:text-[hsl(var(--text-accent-thematic))] font-pixel">
                <LogIn className="mr-1.5 h-4 w-4" /> Log In
              </Button>
              <Button 
                onClick={() => router.push('/signup')} 
                className="font-pixel text-sm bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-2 rounded-xl border-2 border-primary-foreground/40 shadow-[2px_2px_0px_hsl(var(--primary-foreground)/0.6)] hover:shadow-[1px_1px_0px_hsl(var(--primary-foreground)/0.6)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px] transition-all duration-100 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <UserPlus className="mr-1.5 h-4 w-4" /> Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
