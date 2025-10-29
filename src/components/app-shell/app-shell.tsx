
'use client';
import type { ReactNode } from 'react';
import type { User } from 'firebase/auth';
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
import type { UserRole } from '@/lib/types';

export const AppShell = ({ children, role, user }: { children: ReactNode, role: UserRole, user: User }) => {
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
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
