import type { ReactNode, Suspense } from 'react';
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
import { getUser } from '@/lib/mock-data';
import type { UserRole } from '@/lib/types';

export default function AppLayout({
  children
}: {
  children: ReactNode;
}) {
  const role: UserRole = 'donor'; // layouts don't receive searchParams. Defaulting role.
  const user = getUser(role);

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
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-sm">
                <span className="font-semibold">{user.organizationName}</span>
                <span className="text-muted-foreground">{user.email}</span>
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
