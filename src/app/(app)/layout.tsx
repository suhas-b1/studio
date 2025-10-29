
// src/app/(app)/layout.tsx
'use client';
import type { ReactNode } from 'react';
import { Suspense, useEffect } from 'react';
import { useUser } from '@/firebase';
import { useRouter, useSearchParams } from 'next/navigation';
import { Logo } from '@/components/common/logo';
import { Skeleton } from '@/components/ui/skeleton';
import { AppShell } from '@/components/app-shell/app-shell';
import { DonationsProvider } from '@/context/donations-context';
import type { UserRole } from '@/lib/types';


export default function AppLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = (searchParams.get('role') as UserRole) || 'donor';
  const { user, isUserLoading, userError } = useUser();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [isUserLoading, user, router]);

  if (isUserLoading || !user) {
     return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <Logo />
                 <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 animate-spin rounded-full" />
                    <p className="text-muted-foreground">Loading user session...</p>
                </div>
            </div>
        </div>
    )
  }
  
  if (userError) {
       return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-4 text-destructive">
                <Logo />
                <p>An error occurred loading your session. Please try logging in again.</p>
            </div>
        </div>
    )
  }


  return (
    <DonationsProvider>
      <AppShell role={role} user={user}>
          <Suspense fallback={
             <div className="flex h-full items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Logo />
                    <p>Loading page...</p>
                </div>
            </div>
          }>
            {children}
          </Suspense>
      </AppShell>
    </DonationsProvider>
  );
}
