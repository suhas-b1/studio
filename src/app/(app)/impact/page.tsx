import { HandHeart, HeartPulse, BarChart, Truck } from "lucide-react";
import { impactStats, mockDonations } from "@/lib/mock-data";
import { StatCard } from "@/components/dashboard/stat-card";
import { ImpactChart } from "@/components/impact/impact-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { UserRole } from "@/lib/types";
import { format } from "date-fns";

const DonorImpactPage = () => (
    <>
        <div className="mb-8">
            <h1 className="text-3xl font-bold font-headline tracking-tight">Your Impact</h1>
            <p className="text-muted-foreground">See the difference your generosity is making in the community.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 mb-8">
            <StatCard title="Total Meals Provided" value={impactStats.mealsProvided} icon={HandHeart} description="Estimated from all your donations" />
            <StatCard title="Food Saved (KG)" value={impactStats.foodSavedKg} icon={HeartPulse} description="Total weight of food rescued" />
            <StatCard title="CO2 Reduced (Tons)" value={impactStats.co2ReducedTons} icon={BarChart} description="Environmental impact" />
            <StatCard title="Total Donations Made" value={impactStats.donationsMade} icon={Truck} description="Total number of listings" />
        </div>
        <ImpactChart />
    </>
)

const NgoImpactPage = () => {
    const claimedDonations = mockDonations.filter(d => d.claimedByNgoId === 'user-ngo-1');

    return (
        <>
        <div className="mb-8">
            <h1 className="text-3xl font-bold font-headline tracking-tight">Claimed Donations</h1>
            <p className="text-muted-foreground">A history of all the donations you've claimed.</p>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Donation History</CardTitle>
                <CardDescription>You have claimed {claimedDonations.length} donations.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Donation</TableHead>
                            <TableHead>Donor</TableHead>
                            <TableHead>Date Claimed</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {claimedDonations.map(donation => (
                            <TableRow key={donation.id}>
                                <TableCell className="font-medium">{donation.title}</TableCell>
                                <TableCell>{donation.donor.organizationName}</TableCell>
                                <TableCell>{format(donation.createdAt, 'PPP')}</TableCell>
                                <TableCell>
                                    <Badge variant={donation.status === 'picked-up' ? 'default': 'secondary'}>{donation.status}</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        </>
    )
}


export default function ImpactPage({ searchParams }: { searchParams: { role: UserRole }}) {
    const role = searchParams.role || 'donor';
    return(
        <div className="container mx-auto py-8 px-4 md:px-8">
            {role === 'donor' ? <DonorImpactPage /> : <NgoImpactPage />}
        </div>
    )
}
