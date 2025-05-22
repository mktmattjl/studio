
import type { Metadata } from 'next';
import { Inter, VT323 } from 'next/font/google'; // Import VT323
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const vt323 = VT323({ // Initialize VT323
  subsets: ['latin'],
  weight: ['400'], // VT323 typically only has a 400 weight
  variable: '--font-vt323',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Cerebro Study Companion',
  description: 'Your AI-powered modern study platform!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.variable, vt323.variable, "dark h-full")}> {/* Add vt323 variable */}
      <body className="font-sans antialiased bg-background text-foreground flex flex-col min-h-screen">
        <AuthProvider>
          <TooltipProvider delayDuration={0}>
            <Header />
            <main className="flex-grow container mx-auto px-4 py-6 sm:py-8">
              {children}
            </main>
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </body>
    </html>
  );
}


    