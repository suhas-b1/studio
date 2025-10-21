
'use client';

import { useState } from "react";
import { BrainCircuit, Loader2, ServerCrash, Users } from "lucide-react";

import { generateMatchesAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Ngo } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { NgoDetailsDialog } from "@/components/donations/ngo-details-dialog";

export default function MatchesPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [matches, setMatches] = useState<Ngo[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedNgo, setSelectedNgo] = useState<Ngo | null>(null);
    const { toast } = useToast();

    const handleGenerate = async () => {
        setIsLoading(true);
        setError(null);
        setMatches([]);

        const result = await generateMatchesAction();

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
        <>
        <div className="container mx-auto py-8 px-4 md:px-8">
            <div className="mb-8 text-center">
                <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
                    <BrainCircuit className="h-12 w-12 text-primary" />
                </div>
                <h1 className="text-3xl font-bold font-headline tracking-tight">Smart Donation Matching</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
                    Let our AI find the most suitable NGOs for a sample donation based on needs, location, and food type.
                </p>
            </div>

            <div className="flex justify-center mb-12">
                <Button size="lg" onClick={handleGenerate} disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating Matches...
                        </>
                    ) : "Generate Matches for Sample Donation"}
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
                     <h2 className="text-2xl font-bold text-center mb-6 font-headline">Top 3 Matches Found</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                        {matches.map((ngo) => (
                            <Card key={ngo.id} className="flex flex-col">
                                <CardHeader className="flex-row items-center gap-4">
                                     <Avatar className="h-12 w-12">
                                        <AvatarImage src={`https://picsum.photos/seed/${ngo.id}/100/100`} />
                                        <AvatarFallback>{ngo.name ? ngo.name.charAt(0) : 'N'}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle>{ngo.name}</CardTitle>
                                        <CardDescription>{ngo.distance} away</CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <p className="text-sm text-muted-foreground italic">"{ngo.reasonForMatch}"</p>
                                </CardContent>
                                <div className="p-4 pt-0">
                                    <Button className="w-full" onClick={() => setSelectedNgo(ngo)}>Contact NGO</Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
        <NgoDetailsDialog 
            ngo={selectedNgo}
            open={!!selectedNgo}
            onOpenChange={(open) => !open && setSelectedNgo(null)}
        />
        </>
    );
}
