
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { ContentCard } from '@/components/ui/ContentCard';
// import { Button } from '@/components/ui/button'; // Not used currently
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { PixelFantasySettingsIcon as PixelGearIcon } from '@/components/icons/fantasy/PixelFantasySettingsIcon';

export default function SettingsPage() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/login');
    }
  }, [currentUser, loading, router]);

  if (loading) {
    return <div className="text-center p-10 font-pixel text-xl">Loading ancient settings...</div>;
  }

  if (!currentUser) {
    return null; 
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <ContentCard>
        <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-lg border border-primary/30">
                <PixelGearIcon className="w-8 h-8 text-primary" />
            </div>
            <div>
                <h1 className="text-2xl md:text-3xl font-pixel text-primary">Realm Configuration</h1>
                <p className="text-muted-foreground mt-1">Adjust thy application preferences and arcane settings.</p>
            </div>
        </div>
        
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Settings for altering login credentials, visual themes, and notification enchantments are currently under development by the Guild Artificers.
          </p>
        </div>
         <p className="text-xs text-muted-foreground text-center pt-6">Advanced configurations are being etched into reality.</p>
      </ContentCard>
    </div>
  );
}

    