
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
  User,
  MessageSquare,
} from 'lucide-react';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import type { UserRole } from '@/lib/types';

const commonLinks = [
    { href: '/profile', label: 'Profile', icon: User },
    { href: '/settings', label: 'Settings', icon: Settings },
    { href: '/help', label: 'Help', icon: LifeBuoy },
    { href: '/feedback', label: 'Feedback', icon: MessageSquare },
];


export function SidebarNav({ role }: { role: UserRole }) {
  const pathname = usePathname();

  const getHref = (href: string) => {
    if (href.includes('?')) {
      return href;
    }
    return `${href}?role=${role}`;
  }

  const donorMenu = (
    <SidebarGroup>
      <SidebarGroupLabel>Donor</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href={getHref('/donations/new')}>
              <SidebarMenuButton isActive={pathname === '/donations/new'} tooltip="New Donation">
                <PlusCircle />
                <span>New Donation</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href={getHref('/donations')}>
              <SidebarMenuButton isActive={pathname === '/donations'} tooltip="My Donations">
                <Package />
                <span>My Donations</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <Link href={getHref('/impact')}>
              <SidebarMenuButton isActive={pathname === '/impact'} tooltip="Impact">
                <BarChart2 />
                <span>Impact</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  const ngoMenu = (
     <SidebarGroup>
      <SidebarGroupLabel>Recipient</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href={getHref('/matches')}>
              <SidebarMenuButton isActive={pathname === '/matches'} tooltip="Smart Matches">
                <BrainCircuit />
                <span>Smart Matches</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <Link href={getHref('/impact')}>
              <SidebarMenuButton isActive={pathname === '/impact'} tooltip="Claimed">
                <HeartHandshake />
                <span>Claimed</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

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

      {role === 'donor' ? donorMenu : ngoMenu}
      
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
