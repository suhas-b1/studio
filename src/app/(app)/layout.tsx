
// src/app/(app)/layout.tsx
'use client';
import type { ReactNode } from 'react';
import { Suspense } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Logo } from '@/components/common/logo';
import { AppHeader } from '@/components/app-shell/app-header';
import { SidebarNav } from '@/components/app-shell/sidebar-nav';
import { useUser } from '@/firebase';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import type { UserRole } from '@/lib/types';
import { DonationsProvider } from '@/context/donations-context';


const AuthLayout = ({ children, role }: { children: ReactNode, role: UserRole }) => {
  const { user, isUserLoading } = useUser();

  if (isUserLoading) {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <Logo />
                <Skeleton className="h-4 w-48" />
            </div>
        </div>
    )
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav role={role} />
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || ''} />
              <AvatarFallback>{user?.displayName?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-sm">
                <span className="font-semibold">{user?.displayName}</span>
                <span className="text-muted-foreground">{user?.email}</span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <AppHeader role={role} />
        <main className="flex-1 overflow-y-auto bg-secondary/50">
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}


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
                <p>Loading user...</p>
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
      <AuthLayout role={role}>{children}</AuthLayout>
    </DonationsProvider>
  );
}
