
'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ContentCard } from '@/components/ui/ContentCard';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { PixelFantasyAvatarIcon } from '@/components/icons/fantasy';

const signupSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // path of error
});

type SignupFormInputs = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const { signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    setIsLoading(true);
    try {
      await signup(data.email, data.password);
      // Redirect is handled by AuthContext
    } catch (error) {
      // Error is handled by AuthContext toast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-var(--header-height,8rem)-2rem)]">
      <ContentCard className="w-full max-w-md p-6 sm:p-8">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-primary/10 rounded-lg mb-4 border border-primary/30">
            <PixelFantasyAvatarIcon className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-pixel text-primary">Create Your Account</h1>
          <p className="text-muted-foreground mt-1">Join Cerebro and start your learning journey!</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="you@example.com"
              className="mt-1"
            />
            {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register('password')}
              placeholder="Minimum 6 characters"
              className="mt-1"
            />
            {errors.password && <p className="text-destructive text-sm mt-1">{errors.password.message}</p>}
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              placeholder="Re-enter your password"
              className="mt-1"
            />
            {errors.confirmPassword && <p className="text-destructive text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-pixel text-base py-2.5 px-6 rounded-md border-2 border-primary-foreground/40 shadow-[3px_3px_0px_hsl(var(--primary-foreground)/0.7)] hover:shadow-[2px_2px_0px_hsl(var(--primary-foreground)/0.7)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all duration-100 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign Up
          </Button>
        </form>
        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Log In
          </Link>
        </p>
      </ContentCard>
    </div>
  );
}
