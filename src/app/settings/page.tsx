'use client';

import { useAuth } from '@/contexts/AuthContext';
import { ContentCard } from '@/components/ui/ContentCard';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { PixelGearIcon } from '@/components/icons/PixelGearIcon';

export default function SettingsPage() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/login');
    }
  }, [currentUser, loading, router]);

  if (loading) {
    return <div className="text-center p-10">Loading settings...</div>;
  }

  if (!currentUser) {
    return null; // Or a message encouraging login
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <ContentCard>
        <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-lg">
                <PixelGearIcon className="w-8 h-8 text-primary" />
            </div>
            <div>
                <h1 className="text-2xl md:text-3xl font-semibold text-foreground">Settings</h1>
                <p className="text-muted-foreground mt-1">Configure your application preferences.</p>
            </div>
        </div>
        
        <div className="space-y-4">
          <p className="text-muted-foreground">
            User settings, such as changing login information, appearance preferences, and notification settings, will be available here soon.
          </p>
          {/* Placeholder for future settings options */}
          {/* Example:
          <div>
            <Label htmlFor="theme">Theme</Label>
            <Select> ... </Select>
          </div>
          */}
        </div>
         <p className="text-xs text-muted-foreground text-center pt-6">Advanced settings are under construction.</p>
      </ContentCard>
    </div>
  );
}
