'use client';

import type { ReactNode } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile, // Import updateProfile
  type User,
  type AuthError,
} from 'firebase/auth';
import { auth, storage } from '@/lib/firebase'; // Ensure you have this file configured
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Storage imports
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (details: { displayName?: string; photoFile?: File | null }) => Promise<void>; // New method
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

  const updateUserProfile = async (details: { displayName?: string; photoFile?: File | null }) => {
    if (!auth.currentUser) {
      toast({ title: 'Error', description: 'No user logged in.', variant: 'destructive' });
      throw new Error('No user logged in');
    }

    let photoURLToUpdate: string | undefined = undefined;
    const updatesToApply: { displayName?: string; photoURL?: string } = {};

    try {
      if (details.photoFile) {
        const file = details.photoFile;
        // Use a consistent file name or a unique ID. For simplicity, using user's UID and original file name.
        // Consider adding a timestamp or unique ID to filename to prevent overwrites if users can upload multiple files with same name, though not typical for profile pics.
        const filePath = `profilePictures/${auth.currentUser.uid}/${file.name}`;
        const storageRef = ref(storage, filePath);
        await uploadBytes(storageRef, file);
        photoURLToUpdate = await getDownloadURL(storageRef);
        updatesToApply.photoURL = photoURLToUpdate;
      }

      if (details.displayName !== undefined && details.displayName !== auth.currentUser.displayName) {
         updatesToApply.displayName = details.displayName;
      }
      
      if (Object.keys(updatesToApply).length > 0) {
        await updateProfile(auth.currentUser, updatesToApply);
        // Manually update the context's currentUser state for immediate UI reflection
        setCurrentUser(prevUser => prevUser ? { ...prevUser, ...updatesToApply } : null);
        toast({ title: 'Profile Updated', description: 'Your profile has been successfully updated.' });
      } else {
        toast({ title: 'No Changes', description: 'No new information was provided to update.' });
      }

    } catch (error) {
      const authError = error as AuthError;
      console.error("Failed to update profile:", authError);
      toast({ title: 'Profile Update Failed', description: authError.message || 'Could not update profile.', variant: 'destructive' });
      throw authError;
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
