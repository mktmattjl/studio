'use client';

import { useAuth } from '@/contexts/AuthContext';
import { ContentCard } from '@/components/ui/ContentCard';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { PixelUserIcon } from '@/components/icons/PixelUserIcon';

export default function ProfilePage() {
  const { currentUser, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/login');
    }
  }, [currentUser, loading, router]);

  if (loading) {
    return <div className="text-center p-10">Loading profile...</div>;
  }

  if (!currentUser) {
    return null; // Or a message encouraging login, though useEffect should redirect
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <ContentCard>
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-primary/10 rounded-lg">
             <PixelUserIcon className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground">User Profile</h1>
            <p className="text-muted-foreground mt-1">Manage your account information.</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-medium text-foreground">Email Address</h2>
            <p className="text-muted-foreground">{currentUser.email}</p>
          </div>
          <div>
            <h2 className="text-lg font-medium text-foreground">User ID</h2>
            <p className="text-muted-foreground text-sm">{currentUser.uid}</p>
          </div>
           {/* Add more profile fields here as needed */}
        </div>

        <div className="mt-8">
          <Button onClick={logout} variant="outline" className="w-full sm:w-auto">
            Log Out
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center pt-4">Profile editing functionality coming soon.</p>
      </ContentCard>
    </div>
  );
}
