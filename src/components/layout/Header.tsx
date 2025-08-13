
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
import { LogOut, UserPlus, Settings, UserCircle, LayoutDashboard, BookOpen, Calendar, Bell } from 'lucide-react';

export function Header() {
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
  };

  const UserAvatar = () => {
    if (currentUser?.photoURL) {
      return (
        <Image 
          src={currentUser.photoURL} 
          alt={currentUser.displayName || "User Avatar"} 
          width={32} 
          height={32} 
          className="rounded-full object-cover"
        />
      );
    }
    return <UserCircle className="w-7 h-7 text-muted-foreground group-hover:text-foreground" />;
  };

  return (
    <header className="bg-card/80 backdrop-blur-lg border-b border-border text-card-foreground sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/" className="font-bold text-xl text-foreground hover:text-muted-foreground transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 2a10 10 0 0 0-10 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.5 2.3.96 2.87.73.09-.57.34-1.03.6-1.23-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.7-.1-.25-.45-1.29.1-2.65 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02.55 1.36.2 2.4.1 2.65.65.7 1.03 1.59 1.03 2.7 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85v2.72c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"></path></svg>
            Cerebro
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <NavItem href="/" icon={<LayoutDashboard />}>Dashboard</NavItem>
            <NavItem href="/flashcards" icon={<BookOpen />}>Flashcards</NavItem>
            <NavItem href="/planner" icon={<Calendar />}>Planner</NavItem>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-full w-9 h-9">
            <Bell className="w-5 h-5" />
            <span className="sr-only">Notifications</span>
          </Button>

          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-full w-10 h-10 p-0">
                  <UserAvatar />
                  <span className="sr-only">User Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover border-border text-popover-foreground rounded-lg shadow-xl w-56 mt-2">
                <DropdownMenuLabel className="font-normal text-sm text-popover-foreground px-2 py-1.5">
                  <div className="font-semibold">{currentUser.displayName || 'User'}</div>
                  <div className="text-xs text-muted-foreground truncate">{currentUser.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer">
                  <UserCircle className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/settings')} className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border/50"/>
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:bg-destructive focus:text-destructive-foreground cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" /> Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" onClick={() => router.push('/login')}>
                Log In
              </Button>
              <Button onClick={() => router.push('/signup')}>
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
