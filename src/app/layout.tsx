
import type { Metadata } from 'next';
import { Inter, Pixelify_Sans } from 'next/font/google'; // Correctly import Pixelify_Sans
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // CSS variable for Inter
  display: 'swap',
});

const pixelifySans = Pixelify_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Specify desired weights
  variable: '--font-pixelify-sans', // CSS variable for Pixelify Sans
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
    // Apply both font variables to the html tag
    <html lang="en" className={cn(inter.variable, pixelifySans.variable, "dark h-full")}>
      <body 
        className="font-sans antialiased bg-background text-foreground flex flex-col min-h-screen"
        suppressHydrationWarning={true}
      >
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
