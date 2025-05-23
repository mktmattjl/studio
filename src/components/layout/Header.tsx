// src/components/layout/Header.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
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

// Import your new PNG icons
import BellIcon from '@/components/icons/ICONS_DASHBOARD/Bell.png';
import CalendarIcon from '@/components/icons/ICONS_DASHBOARD/Calendar.png';
import CoinIcon from '@/components/icons/ICONS_DASHBOARD/Coin.png';
import FlameIcon from '@/components/icons/ICONS_DASHBOARD/Flame.png';
import MapIcon from '@/components/icons/ICONS_DASHBOARD/Map.png';
import PetIcon from '@/components/icons/ICONS_DASHBOARD/Pet.png';
import WizardIcon from '@/components/icons/ICONS_DASHBOARD/Wizard.png';

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
          <Link href="/" className="font-pixel text-2xl font-bold text-[hsl(var(--text-accent-thematic))] hover:text-[hsl(var(--text-accent-thematic)/0.8)] transition-colors">
            Cerebro
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <NavItem href="/" icon={<Image src={FlameIcon} alt="Dashboard" width={20} height={20} />}>Dashboard</NavItem>
            <NavItem
              href="/flashcards"
              icon={<Image src={CalendarIcon} alt="Flashcards" width={20} height={20} />}
            >
              Flashcards
            </NavItem>
            <NavItem href="/planner" icon={<Image src={MapIcon} alt="Planner" width={20} height={20} />}>Planner</NavItem>
            <NavItem href="/ai-generator" icon={<Image src={WizardIcon} alt="AI Wizard" width={20} height={20} />}>AI Wizard</NavItem>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {currentUser && (
            <div className="flex items-center gap-1.5 text-sm bg-muted/50 text-foreground px-3 py-1.5 rounded-md border border-border">
              <Image src={CoinIcon} alt="Coin" width={20} height={20} />
              <span className="font-pixel text-base text-foreground">{coins}</span>
            </div>
          )}
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-md w-9 h-9">
            <Image src={BellIcon} alt="Notifications" width={24} height={24} />
            <span className="sr-only">Notifications</span>
          </Button>

          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-md">
                  <Image src={PetIcon} alt="User Menu" width={24} height={24} />
                  <span className="sr-only">User Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover border-border text-popover-foreground rounded-md shadow-lg w-48 font-pixel">
                <DropdownMenuLabel className="text-sm font-medium text-popover-foreground">
                  {currentUser.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer hover:bg-muted/50 text-popover-foreground">
                  <Image src={PetIcon} alt="Profile" width={16} height={16} className="mr-2" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/settings')} className="cursor-pointer hover:bg-muted/50 text-popover-foreground">
                  <Image src={FlameIcon} alt="Settings" width={16} height={16} className="mr-2" /> Settings
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
                className="font-pixel text-sm bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-2 rounded-md border-2 border-primary-foreground/40 shadow-[2px_2px_0px_hsl(var(--primary-foreground)/0.6)] hover:shadow-[1px_1px_0px_hsl(var(--primary-foreground)/0.6)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px] transition-all duration-100 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
