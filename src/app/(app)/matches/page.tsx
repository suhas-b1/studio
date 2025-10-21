

'use client';

import { useState } from "react";
import { BrainCircuit, Loader2, ServerCrash, PackageSearch } from "lucide-react";
import { findRelevantDonationsAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DonationCard } from "@/components/donations/donation-card";
import type { Donation } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useDonations } from "@/context/donations-context";

export default function MatchesPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [matches, setMatches] = useState<Donation[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();
    const { donations } = useDonations();

    const handleGenerate = async () => {
        setIsLoading(true);
        setError(null);
        setMatches([]);

        const availableDonations = donations.filter(d => d.status === 'available');
        const result = await findRelevantDonationsAction(availableDonations);

        if (result.error) {
            setError(result.error);
            toast({
                variant: "destructive",
                title: "Matching Error",
                description: result.error,
            });
        } else if (result.matches) {
            setMatches(result.matches);
        }
        setIsLoading(false);
    };

    return (
        <div className="container mx-auto py-8 px-4 md:px-8">
            <div className="mb-8 text-center">
                <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
                    <BrainCircuit className="h-12 w-12 text-primary" />
                </div>
                <h1 className="text-3xl font-bold font-headline tracking-tight">Smart Donation Matching</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
                    Let our AI find the most relevant and nearby food donations based on your organization's needs.
                </p>
            </div>

            <div className="flex justify-center mb-12">
                <Button size="lg" onClick={handleGenerate} disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Finding Donations...
                        </>
                    ) : "Find Relevant Donations"}
                </Button>
            </div>
            
            {error && (
                 <Card className="max-w-2xl mx-auto bg-destructive/10 border-destructive">
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-destructive/20 p-3 rounded-full w-fit">
                            <ServerCrash className="h-8 w-8 text-destructive" />
                        </div>
                        <CardTitle className="text-destructive">An Error Occurred</CardTitle>
                        <CardDescription className="text-destructive/80">{error}</CardDescription>
                    </CardHeader>
                </Card>
            )}

            {matches.length > 0 && (
                <div>
                     <h2 className="text-2xl font-bold text-center mb-6 font-headline">Top Matches Found for You</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                        {matches.map((donation) => (
                            <DonationCard key={donation.id} donation={donation} role="ngo" />
                        ))}
                    </div>
                </div>
            )}
            
            {!isLoading && !error && matches.length === 0 && (
                 <Card className="max-w-2xl mx-auto border-dashed">
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-secondary/80 p-3 rounded-full w-fit">
                            <PackageSearch className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <CardTitle>Ready to Find Donations?</CardTitle>
                        <CardDescription>Click the button above to start your smart search.</CardDescription>
                    </CardHeader>
                </Card>
            )}
        </div>
    );
}
