
'use client';
import { use } from 'react';
import { Activity, Users, Package, BarChart, PoundSterling, Truck, HandHeart, HeartPulse } from 'lucide-react';
import { StatCard } from '@/components/dashboard/stat-card';
import { mockDonations, impactStats } from '@/lib/mock-data';
import type { UserRole } from '@/lib/types';
import { DonationCard } from '@/components/donations/donation-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const DonorDashboard = () => {
  const myDonations = mockDonations.filter(d => d.donorId === 'user-donor-1' || d.donorId === 'user-donor-2');
  const activeListings = myDonations.filter(d => d.status === 'available');

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <StatCard
          title="Meals Provided"
          value={impactStats.mealsProvided}
          icon={HandHeart}
          description="Estimated from your donations"
        />
        <StatCard
          title="Active Listings"
          value={activeListings.length}
          icon={Package}
          description="Currently available for pickup"
        />
        <StatCard
          title="Food Saved (KG)"
          value={impactStats.foodSavedKg}
          icon={HeartPulse}
          description="Total weight of food donated"
        />
        <StatCard
          title="Total Donations"
          value={myDonations.length}
          icon={BarChart}
          description="Since joining Nourish Connect"
        />
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>My Recent Listings</CardTitle>
          <Button asChild variant="outline">
            <Link href="/donations?role=donor">View All</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {myDonations.slice(0,3).map(donation => (
              <DonationCard key={donation.id} donation={donation} role="donor" />
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

const NgoDashboard = () => {
    const claimedDonations = mockDonations.filter(d => d.claimedByNgoId === 'user-ngo-1');
    const availableDonations = mockDonations.filter(d => d.status === 'available');

    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <StatCard
                title="Donations Claimed"
                value={claimedDonations.length}
                icon={Package}
                description="Total donations you've claimed"
                />
                <StatCard
                title="Pickups Pending"
                value={claimedDonations.filter(d => d.status === 'claimed').length}
                icon={Truck}
                description="Awaiting pickup"
                />
                <StatCard
                title="Available Now"
                value={availableDonations.length}
                icon={Activity}
                description="Listings ready to be claimed"
                />
                <StatCard
                title="Verified Donors"
                value="18"
                icon={Users}
                description="Active donors in your area"
                />
            </div>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Newest Listings</CardTitle>
                <Button asChild variant="outline">
                    <Link href="/donations?role=ngo">Browse All</Link>
                </Button>
                </CardHeader>
                <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {availableDonations.slice(0,3).sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime()).map(donation => (
                    <DonationCard key={donation.id} donation={donation} role="ngo" />
                    ))}
                </div>
                </CardContent>
            </Card>
        </>
    )
}

export default function DashboardPage({ searchParams }: { searchParams: { role?: UserRole }}) {
  const role = use(Promise.resolve(searchParams.role)) || 'donor';

  return (
    <div className="container mx-auto py-8 px-4 md:px-8 space-y-8">
      {role === 'donor' ? <DonorDashboard /> : <NgoDashboard />}
    </div>
  );
}
