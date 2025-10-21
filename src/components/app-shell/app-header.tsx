
'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { UserNav } from '@/components/common/user-nav';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { PlusCircle, BrainCircuit, ChevronDown } from 'lucide-react';
import type { UserRole } from '@/lib/types';

function capitalize(s: string) {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function AppHeader({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-8">
      <div className="flex-1">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1 px-1 -ml-1">
                    <BreadcrumbLink asChild>
                        <Link href={`/dashboard?role=${role}`}>Dashboard</Link>
                    </BreadcrumbLink>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {role === 'donor' && (
                    <DropdownMenuItem asChild>
                      <Link href={`/donations/new?role=${role}`}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        <span>New Donation</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {role === 'ngo' && (
                    <DropdownMenuItem asChild>
                      <Link href={`/matches?role=${role}`}>
                        <BrainCircuit className="mr-2 h-4 w-4" />
                        <span>Smart Matches</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            {segments.map((segment, index) => {
              if (segment === 'dashboard') return null; // Assuming dashboard is the root, so we skip it.
              const href = `/${segments.slice(0, index + 1).join('/')}?role=${role}`;
              const isLast = index === segments.length - 1;
              return (
                <React.Fragment key={href}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{capitalize(segment)}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={href}>
                        {capitalize(segment)}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <UserNav role={role} />
    </header>
  );
}
