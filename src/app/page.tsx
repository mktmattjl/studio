import { PixelatedContainer } from '@/components/PixelatedContainer';
import { PixelatedButton } from '@/components/PixelatedButton';
import Image from 'next/image';
import Link from 'next/link';

export default function DashboardPage() {
  const userName = "PlayerOne"; // Placeholder
  const petName = "PixelPup"; // Placeholder

  const upcomingEvents = [
    { id: '1', title: 'Math Exam', date: '2024-08-15', type: 'Exam' },
    { id: '2', title: 'History Project Due', date: '2024-08-20', type: 'Deadline' },
    { id: '3', title: 'Study CS Chapter 5', date: '2024-08-10', type: 'Study Session' },
  ];

  return (
    <div className="space-y-8">
      <PixelatedContainer>
        <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">Welcome back, <span className="text-accent">{userName}</span>!</h1>
        <p className="text-muted-foreground mt-2 text-lg">Ready to supercharge your studies? Let's get to it!</p>
      </PixelatedContainer>

      <div className="grid md:grid-cols-2 gap-6">
        <PixelatedContainer className="bg-card">
          <h2 className="text-2xl font-semibold text-primary-foreground mb-4">Upcoming Deadlines & Events</h2>
          {upcomingEvents.length > 0 ? (
            <ul className="space-y-3">
              {upcomingEvents.map((event) => (
                <li key={event.id} className="p-3 bg-background/50 border-l-4 border-accent">
                  <p className="font-semibold text-primary-foreground">{event.title} - <span className="text-sm text-muted-foreground">{new Date(event.date).toLocaleDateString()}</span></p>
                  <p className="text-xs text-muted-foreground">{event.type}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No upcoming deadlines or events. Time to plan or relax!</p>
          )}
          <Link href="/planner" passHref>
            <PixelatedButton className="mt-4 w-full">View Full Planner</PixelatedButton>
          </Link>
        </PixelatedContainer>

        <PixelatedContainer className="bg-card flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold text-primary-foreground mb-2">Your Companion: {petName}</h2>
          <Image
            src="https://placehold.co/150x150.png?bg=333333&fc=FFFFFF"
            alt="Virtual Pet Placeholder"
            width={150}
            height={150}
            className="border-4 border-accent shadow-[4px_4px_0px_hsl(var(--primary))]"
            data-ai-hint="pixel pet"
          />
          <p className="text-muted-foreground mt-2 text-center">Keep studying to earn coins and care for {petName}!</p>
          <Link href="/companion" passHref>
            <PixelatedButton className="mt-4">Visit {petName}</PixelatedButton>
          </Link>
        </PixelatedContainer>
      </div>
      
      <PixelatedContainer className="bg-card">
        <h2 className="text-2xl font-semibold text-primary-foreground mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/flashcards/new" passHref><PixelatedButton variant="outline" className="w-full">Create Flashcards</PixelatedButton></Link>
          <Link href="/ai-generator" passHref><PixelatedButton variant="outline" className="w-full">AI Generate Cards</PixelatedButton></Link>
          <Link href="/planner#new-event" passHref><PixelatedButton variant="outline" className="w-full">Add New Event</PixelatedButton></Link>
        </div>
      </PixelatedContainer>

    </div>
  );
}
