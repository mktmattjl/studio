'use client';

import type { ReactNode } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type User,
  type AuthError,
} from 'firebase/auth';
import { auth } from '@/lib/firebase'; // Ensure you have this file configured
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      toast({ title: 'Logged In!', description: 'Welcome back.' });
      router.push('/');
    } catch (error) {
      const authError = error as AuthError;
      console.error("Failed to log in:", authError);
      toast({ title: 'Login Failed', description: authError.message || 'Please check your credentials.', variant: 'destructive' });
      throw authError;
    }
  };

  const signup = async (email: string, pass: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      toast({ title: 'Account Created!', description: 'You have successfully signed up.' });
      router.push('/'); // Redirect to dashboard or a welcome page
    } catch (error) {
      const authError = error as AuthError;
      console.error("Failed to sign up:", authError);
      toast({ title: 'Signup Failed', description: authError.message || 'Could not create account.', variant: 'destructive' });
      throw authError;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
      router.push('/login');
    } catch (error) {
      const authError = error as AuthError;
      console.error("Failed to log out:", authError);
      toast({ title: 'Logout Failed', description: authError.message || 'Could not log out.', variant: 'destructive' });
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
