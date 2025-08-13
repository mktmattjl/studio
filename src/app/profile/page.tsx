
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { ContentCard } from '@/components/ui/ContentCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef, type ChangeEvent } from 'react';
import Image from 'next/image';
import { Loader2, UploadCloud, User } from 'lucide-react';

export default function ProfilePage() {
  const { currentUser, loading, logout, updateUserProfile } = useAuth();
  const router = useRouter();

  const [displayName, setDisplayName] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/login');
    } else if (currentUser) {
      setDisplayName(currentUser.displayName || '');
      if (currentUser.photoURL) {
        setPhotoPreview(currentUser.photoURL);
      }
    }
  }, [currentUser, loading, router]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setIsSaving(true);
    try {
      const detailsToUpdate: { displayName?: string; photoFile?: File | null } = {};
      if (displayName !== (currentUser.displayName || '')) {
        detailsToUpdate.displayName = displayName;
      }
      if (photoFile) {
        detailsToUpdate.photoFile = photoFile;
      }
      
      if(Object.keys(detailsToUpdate).length > 0 || photoFile) {
        await updateUserProfile(detailsToUpdate);
      } else {
        // useAuth already handles this toast
      }

    } catch (error) {
      // Error is handled by AuthContext toast
    } finally {
      setIsSaving(false);
      setPhotoFile(null); // Reset file input after save attempt
    }
  };

  if (loading) {
    return <div className="text-center p-10 font-semibold text-xl">Loading profile...</div>;
  }

  if (!currentUser) {
    return null; 
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <ContentCard>
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-primary/10 rounded-lg border border-primary/30">
             <User className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-primary">Your Profile</h1>
            <p className="text-muted-foreground mt-1">Manage your account details.</p>
          </div>
        </div>
        
        <form onSubmit={handleSaveProfile} className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div 
              className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-primary/30 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => fileInputRef.current?.click()}
              title="Click to change profile picture"
            >
              {photoPreview ? (
                <Image src={photoPreview} alt="Profile Preview" layout="fill" objectFit="cover" />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <User className="w-16 h-16 text-muted-foreground" />
                </div>
              )}
               <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <UploadCloud className="w-8 h-8 text-white" />
                </div>
            </div>
            <Input
              id="photoURL"
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/png, image/jpeg, image/gif"
              onChange={handleFileChange}
            />
             <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                Change Picture
            </Button>
          </div>

          <div>
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="e.g., Jane Doe"
              className="mt-1 bg-input text-input-foreground"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={currentUser.email || ''}
              disabled
              className="mt-1 bg-muted/50 text-muted-foreground cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground mt-1">Email address cannot be changed.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-border/50 mt-8">
            <Button type="submit" className="w-full sm:w-auto" disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button onClick={logout} variant="destructive" className="w-full sm:w-auto">
              Log Out
            </Button>
          </div>
        </form>
      </ContentCard>
    </div>
  );
}
