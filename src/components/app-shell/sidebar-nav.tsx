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
} from 'lucide-react';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import type { UserRole } from '@/lib/types';

const donorLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/donations/new', label: 'New Donation', icon: PlusCircle },
  { href: '/donations', label: 'My Donations', icon: Package },
  { href: '/impact', label: 'Impact', icon: BarChart2 },
];

const ngoLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/donations', label: 'Browse', icon: Package },
  { href: '/matches', label: 'Smart Matches', icon: BrainCircuit },
  { href: '/impact', label: 'Claimed', icon: HeartHandshake },
];

const commonLinks = [
    { href: '/settings', label: 'Settings', icon: Settings },
    { href: '/help', label: 'Help', icon: LifeBuoy },
];


export function SidebarNav({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const links = role === 'donor' ? donorLinks : ngoLinks;

  return (
    <>
      <SidebarMenu>
        {links.map((link) => (
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
