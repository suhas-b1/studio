// @/app/(auth)/onboarding/page.tsx
'use client';
import { HandHeart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function OnboardingPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[hsl(var(--background))]">
      <div className="flex items-center gap-4 text-primary animate-pulse">
        <HandHeart className="h-16 w-16" />
        <h1 className="font-headline text-5xl font-bold tracking-tight text-primary">
          Nourish Connect
        </h1>
      </div>
    </div>
  );
}
