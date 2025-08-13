
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
import { LogOut, LogIn, UserPlus, Settings, UserCircle, LayoutDashboard, BookOpen, Calendar, Bell } from 'lucide-react';

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
          width={28} 
          height={28} 
          className="rounded-full object-cover"
        />
      );
    }
    return <UserCircle className="w-6 h-6 text-muted-foreground group-hover:text-foreground" />;
  };

  return (
    <header className="bg-card border-b border-border text-card-foreground sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/" className="font-semibold text-xl text-foreground hover:text-muted-foreground transition-colors">
            Cerebro
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <NavItem href="/" icon={<LayoutDashboard />}>Dashboard</NavItem>
            <NavItem href="/flashcards" icon={<BookOpen />}>Flashcards</NavItem>
            <NavItem href="/planner" icon={<Calendar />}>Planner</NavItem>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-md w-9 h-9">
            <Bell className="w-5 h-5" />
            <span className="sr-only">Notifications</span>
          </Button>

          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-full w-9 h-9 p-0.5">
                  <UserAvatar />
                  <span className="sr-only">User Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover border-border text-popover-foreground rounded-md shadow-lg w-52">
                <DropdownMenuLabel className="font-normal text-sm text-popover-foreground px-2 py-1.5">
                  <div className="font-semibold">{currentUser.displayName || 'User'}</div>
                  <div className="text-xs text-muted-foreground">{currentUser.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer">
                  <UserCircle className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/settings')} className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border/50"/>
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive-foreground cursor-pointer">
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
                <UserPlus className="mr-2 h-4 w-4" /> Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
