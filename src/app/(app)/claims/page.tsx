
'use client';
import { useUser } from '@/firebase';
import { useDonations } from '@/context/donations-context';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Check, Package, ThumbsUp, Truck } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useState } from 'react';
import { TrackDeliveryDialog } from '@/components/donations/track-delivery-dialog';

function ClaimedDonationCard({ donation, trackingStatus }: { donation: any, trackingStatus: any }) {
    const [isTracking, setIsTracking] = useState(false);
    
    const statusSteps = [
        { name: 'Claimed', icon: ThumbsUp, completed: trackingStatus.claimed },
        { name: 'Out for Delivery', icon: Truck, completed: trackingStatus.outForDelivery },
        { name: 'Completed', icon: Check, completed: trackingStatus.completed },
    ];

    const progressValue = (() => {
        if (trackingStatus.completed) return 100;
        if (trackingStatus.outForDelivery) return 66;
        if (trackingStatus.claimed) return 33;
        return 0;
    })();

    return (
        <>
        <Card className="overflow-hidden">
            <CardHeader className="flex-row gap-4 items-start p-4">
                <div className="relative w-24 h-24 aspect-square rounded-md overflow-hidden">
                    <Image src={donation.imageUrl} alt={donation.title} fill className="object-cover" />
                </div>
                <div className="flex-1">
                    <CardTitle className="text-lg font-headline mb-1">{donation.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={donation.donor.avatarUrl} />
                            <AvatarFallback>{donation.donor.organizationName?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{donation.donor.organizationName}</span>
                    </div>
                     <p className="text-xs text-muted-foreground mt-2">Claimed on {format(donation.createdAt, 'PPP')}</p>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <Separator className="my-4" />
                <div className="space-y-4">
                    <div>
                        <p className="text-sm font-medium mb-2">Tracking Status</p>
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>{trackingStatus.message}</span>
                            <span>Est. Arrival: {trackingStatus.eta}</span>
                        </div>
                        <Progress value={progressValue} className="h-2"/>
                    </div>

                    <div className="flex justify-between">
                        {statusSteps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center text-center">
                                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step.completed ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                                    <step.icon className="w-4 h-4" />
                                </div>
                                <p className={`text-xs mt-1 ${step.completed ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>{step.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {trackingStatus.outForDelivery && !trackingStatus.completed && (
                     <div className="mt-4 p-3 bg-secondary/50 rounded-lg">
                        <p className="text-sm font-semibold mb-2">Delivery Details</p>
                        <div className="flex justify-between items-center text-sm">
                             <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="https://picsum.photos/seed/delivery1/100/100" />
                                    <AvatarFallback>D</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium">David R.</p>
                                    <p className="text-xs text-muted-foreground">NourishConnect Logistics</p>
                                </div>
                            </div>
                            <Button variant="outline" size="sm" onClick={() => setIsTracking(true)}>Track Live</Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
        <TrackDeliveryDialog open={isTracking} onOpenChange={setIsTracking} donation={donation} />
        </>
    );
}

// Mock tracking data for demonstration
const mockTrackingData: { [key: string]: any } = {
    'donation-3': { claimed: true, outForDelivery: true, completed: false, message: 'On its way!', eta: '45 mins' },
    'donation-5': { claimed: true, outForDelivery: true, completed: true, message: 'Delivered Yesterday', eta: '-' },
};

export default function MyClaimsPage() {
    const { user } = useUser();
    const { donations } = useDonations();

    const claimedDonations = donations.filter(d => d.claimedByNgoId === user?.uid);

    if (claimedDonations.length === 0) {
        return (
            <div className="container mx-auto py-8 px-4 md:px-8 text-center">
                 <div className="mb-8">
                    <h1 className="text-3xl font-bold font-headline tracking-tight">My Claims</h1>
                    <p className="text-muted-foreground">A history of all the donations you've claimed.</p>
                </div>
                <Card className="max-w-md mx-auto border-dashed">
                    <CardHeader>
                        <div className="mx-auto bg-secondary p-3 rounded-full w-fit mb-2">
                           <Package className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <CardTitle>No Donations Claimed Yet</CardTitle>
                        <CardDescription>
                            Head over to the browse or smart match page to find donations for your community.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }
    
    return (
        <div className="container mx-auto py-8 px-4 md:px-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold font-headline tracking-tight">My Claims</h1>
                <p className="text-muted-foreground">Track the status of all your claimed donations.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {claimedDonations.map(donation => (
                    <ClaimedDonationCard 
                        key={donation.id} 
                        donation={donation} 
                        trackingStatus={mockTrackingData[donation.id] || { claimed: true, outForDelivery: false, completed: false, message: 'Awaiting pickup', eta: 'TBD' }}
                    />
                ))}
            </div>
        </div>
    );
}
