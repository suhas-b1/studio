
'use client';
import { use } from 'react';
import { mockDonations } from "@/lib/mock-data";
import { DonationCard } from "@/components/donations/donation-card";
import { UserRole } from "@/lib/types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

function PageHeader({ role }: { role: UserRole }) {
  const title = role === 'donor' ? "My Donations History" : "Available Food Donations";
  const description = role === 'donor' 
    ? "Track all your past and current food listings."
    : "Browse and claim surplus food from generous donors in your area.";

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold font-headline tracking-tight">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function Filters() {
    return (
        <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
                <Input placeholder="Search by keyword..." className="pl-10"/>
            </div>
            <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="distance">Distance</SelectItem>
                    <SelectItem value="deadline">Pickup Deadline</SelectItem>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Food type..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="pantry">Pantry</SelectItem>
                    <SelectItem value="produce">Produce</SelectItem>
                    <SelectItem value="baked">Baked Goods</SelectItem>
                    <SelectItem value="canned">Canned Goods</SelectItem>
                    <SelectItem value="prepared">Prepared Meals</SelectItem>
                    <SelectItem value="dairy">Dairy</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default function DonationsPage({ searchParams }: { searchParams: { role?: UserRole }}) {
  const role = use(searchParams)?.role || 'ngo';
  const donations = role === 'donor' 
    ? mockDonations.filter(d => d.donorId === 'user-donor-1' || d.donorId === 'user-donor-2')
    : mockDonations.filter(d => d.status === 'available');

  return (
    <div className="container mx-auto py-8 px-4 md:px-8">
        <PageHeader role={role} />
        <Filters />
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {donations.map(donation => (
                <DonationCard key={donation.id} donation={donation} role={role} />
            ))}
        </div>
    </div>
  );
}
