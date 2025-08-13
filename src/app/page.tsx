
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { TaskList } from '@/components/dashboard/TaskList';
import { StudySpinner } from '@/components/dashboard/StudySpinner';
import { DashboardPlannerPreview } from '@/components/dashboard/DashboardPlannerPreview';

export default function DashboardPage() {
  const { currentUser } = useAuth();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const getGreetingTitle = () => {
    if (currentUser?.displayName) {
      return `${greeting}, ${currentUser.displayName.split(' ')[0]}!`;
    }
    return `${greeting}!`;
  };

  const studyTopics = [
    { value: 'React Hooks', color: '#61DAFB' },
    { value: 'Python Lists', color: '#3776AB' },
    { value: 'CSS Flexbox', color: '#1572B6' },
    { value: 'Data Structures', color: '#F7DF1E' },
    { value: 'Algorithms', color: '#FF4136' },
    { value: 'Next.js', color: '#000000' },
  ];

  return (
    <div className="flex-grow space-y-6 xl:space-y-8">
        <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">
            {getGreetingTitle()}
            </h1>
            <p className="text-md text-muted-foreground mt-1">Here’s your dashboard for today.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <DashboardPlannerPreview />
            </div>
            <div className="space-y-6">
                <TaskList />
                <StudySpinner topics={studyTopics} />
            </div>
        </div>
    </div>
  );
}
