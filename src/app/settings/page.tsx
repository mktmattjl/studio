
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { ContentCard } from '@/components/ui/ContentCard';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Settings } from 'lucide-react';

export default function SettingsPage() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/login');
    }
  }, [currentUser, loading, router]);

  if (loading) {
    return <div className="text-center p-10 font-semibold text-xl">Loading settings...</div>;
  }

  if (!currentUser) {
    return null; 
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <ContentCard>
        <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-lg border border-primary/30">
                <Settings className="w-8 h-8 text-primary" />
            </div>
            <div>
                <h1 className="text-2xl md:text-3xl font-semibold text-primary">Settings</h1>
                <p className="text-muted-foreground mt-1">Adjust your application preferences.</p>
            </div>
        </div>
        
        <div className="space-y-4">
          <p className="text-muted-foreground">
            More settings for themes and notifications are currently under development.
          </p>
        </div>
      </ContentCard>
    </div>
  );
}
