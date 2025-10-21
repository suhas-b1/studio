'use client';

import { usePathname } from 'next/navigation';
import { UserNav } from '@/components/common/user-nav';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
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
              <BreadcrumbLink href={`/dashboard?role=${role}`}>Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            {segments.map((segment, index) => {
              if (segment === 'app') return null; // Assuming (app) group folder
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
