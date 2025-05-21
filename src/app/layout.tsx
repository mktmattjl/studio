
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Changed from VT323 to Inter
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter', // Standard variable name for Inter
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Cerebro Study Companion',
  description: 'Your AI-powered modern study platform!', // Updated description slightly
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.variable, "dark h-full")}>
      <body className="font-sans antialiased bg-background text-foreground flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-6 sm:py-8">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
