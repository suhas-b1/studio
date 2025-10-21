
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  HeartHandshake,
  BarChart2,
  BrainCircuit,
  Settings,
  LifeBuoy,
  MessageSquare,
  ChevronDown,
  Building,
  Utensils,
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import type { UserRole } from '@/lib/types';
import { cn } from '@/lib/utils';
import React from 'react';

const commonLinks = [
    { href: '/settings', label: 'Settings', icon: Settings },
    { href: '/help', label: 'Help', icon: LifeBuoy },
    { href: '/feedback', label: 'Feedback', icon: MessageSquare },
];

export function SidebarNav({ role }: { role: UserRole }) {
  const pathname = usePathname();

  const getHref = (href: string) => {
    return `${href}?role=${role}`;
  }

  const isDonorSectionActive = ['/donations', '/donations/new', '/impact'].includes(pathname) && role === 'donor';
  const isNgoSectionActive = ['/donations', '/matches', '/impact'].includes(pathname) && role === 'ngo';

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
            <Link href={getHref('/dashboard')}>
                <SidebarMenuButton
                    isActive={pathname === '/dashboard'}
                    tooltip={'Dashboard'}
                >
                    <LayoutDashboard />
                    <span>Dashboard</span>
                </SidebarMenuButton>
            </Link>
        </SidebarMenuItem>
      </SidebarMenu>

       <Collapsible defaultOpen={isDonorSectionActive}>
        <CollapsibleTrigger className="w-full">
            <SidebarMenuButton
                variant="default"
                className="w-full justify-start"
                 data-state={isDonorSectionActive ? 'open' : 'closed'}
            >
                <Utensils className="h-5 w-5" />
                <span className="flex-1 text-left">Donor</span>
                <ChevronDown className="h-4 w-4 transition-transform [&[data-state=open]]:-rotate-180" />
            </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
            <SidebarMenu className="py-2 pl-6">
                <SidebarMenuItem>
                    <Link href={getHref('/donations/new')}>
                        <SidebarMenuButton size="sm" isActive={pathname === '/donations/new'} className="w-full justify-start">
                            <PlusCircle />
                            <span>New Donation</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <Link href={getHref('/donations')}>
                        <SidebarMenuButton size="sm" isActive={pathname === '/donations' && role === 'donor'} className="w-full justify-start">
                            <Package />
                            <span>My Donations</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <Link href={getHref('/impact')}>
                        <SidebarMenuButton size="sm" isActive={pathname === '/impact' && role === 'donor'} className="w-full justify-start">
                            <BarChart2 />
                            <span>Impact</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            </SidebarMenu>
        </CollapsibleContent>
       </Collapsible>

        <Collapsible defaultOpen={isNgoSectionActive}>
        <CollapsibleTrigger className="w-full">
            <SidebarMenuButton
                variant="default"
                className="w-full justify-start"
                data-state={isNgoSectionActive ? 'open' : 'closed'}
            >
                <Building className="h-5 w-5" />
                <span className="flex-1 text-left">Recipient</span>
                <ChevronDown className="h-4 w-4 transition-transform [&[data-state=open]]:-rotate-180" />
            </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
            <SidebarMenu className="py-2 pl-6">
                <SidebarMenuItem>
                    <Link href={getHref('/donations')}>
                        <SidebarMenuButton size="sm" isActive={pathname === '/donations' && role === 'ngo'} className="w-full justify-start">
                            <Package />
                            <span>Browse Donations</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <Link href={getHref('/matches')}>
                        <SidebarMenuButton size="sm" isActive={pathname === '/matches'} className="w-full justify-start">
                            <BrainCircuit />
                            <span>Smart Matches</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <Link href={getHref('/impact')}>
                        <SidebarMenuButton size="sm" isActive={pathname === '/impact' && role === 'ngo'} className="w-full justify-start">
                            <HeartHandshake />
                            <span>My Claims</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            </SidebarMenu>
        </CollapsibleContent>
       </Collapsible>
      
       <SidebarMenu className="mt-auto">
        {commonLinks.map((link) => (
            <SidebarMenuItem key={link.href}>
                <Link href={`${link.href}?role=${role}`}>
                <SidebarMenuButton
                    isActive={pathname === link.href}
                    tooltip={link.label}
                >
                    <link.icon />
                    <span>{link.label}</span>
                </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            ))}
      </SidebarMenu>
    </>
  );
}
