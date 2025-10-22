
'use client';
import { HandHeart, HeartPulse, BarChart, Truck, FileText } from "lucide-react";
import { impactStats } from "@/lib/mock-data";
import { StatCard } from "@/components/dashboard/stat-card";
import { ImpactChart } from "@/components/impact/impact-chart";

export default function ImpactPage() {
    return(
        <div className="container mx-auto py-8 px-4 md:px-8">
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
        </div>
    )
}
