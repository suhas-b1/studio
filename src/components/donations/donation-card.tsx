
'use client';
import Image from "next/image";
import { formatDistanceToNow } from 'date-fns';
import { MapPin, Calendar, Clock, Award, XCircle } from "lucide-react";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Donation, UserRole } from "@/lib/types";
import { ClaimDonationDialog } from "./claim-donation-dialog";
import { useState } from "react";

const statusColors = {
  available: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-300 dark:border-green-700',
  claimed: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700',
  'picked-up': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-blue-300 dark:border-blue-700',
  expired: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 border-red-300 dark:border-red-700',
};

export function DonationCard({ donation, role }: { donation: Donation; role: UserRole }) {
  const [isClaiming, setIsClaiming] = useState(false);

  const isExpired = new Date() > donation.pickupDeadline;
  const currentStatus = isExpired && donation.status === 'available' ? 'expired' : donation.status;


  return (
    <>
    <Card className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
      <CardHeader className="p-0">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={donation.imageUrl}
            alt={donation.title}
            fill
            className="object-cover"
            data-ai-hint={donation.imageHint}
          />
           <Badge variant="outline" className={`absolute top-2 right-2 backdrop-blur-sm ${statusColors[currentStatus]}`}>
            {currentStatus}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{donation.distance.toFixed(1)} km away</span>
          <span className="mx-1">·</span>
          <Badge variant="secondary">{donation.type}</Badge>
        </div>
        <CardTitle className="text-lg font-headline mb-2">{donation.title}</CardTitle>
        
        <div className="mt-4 flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={donation.donor.avatarUrl} />
            <AvatarFallback>{donation.donor.organizationName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">{donation.donor.organizationName}</p>
            {donation.donor.isVerified && (
                <div className="flex items-center text-xs text-muted-foreground">
                    <Award className="w-3 h-3 mr-1 text-accent"/>
                    Verified Donor
                </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4 bg-secondary/50 p-4">
        <div className="flex justify-between w-full text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Listed {formatDistanceToNow(donation.createdAt, { addSuffix: true })}</span>
            </div>
             {currentStatus === 'expired' ? (
                <div className="flex items-center gap-2 text-destructive">
                    <XCircle className="h-4 w-4" />
                    <span>Expired</span>
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Pickup by: {donation.pickupDeadline.toLocaleDateString()}</span>
                </div>
            )}
        </div>
        {role === 'ngo' && currentStatus === 'available' && (
          <Button className="w-full" onClick={() => setIsClaiming(true)}>
            Claim Donation
          </Button>
        )}
         {role === 'donor' && (
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        )}
      </CardFooter>
    </Card>
    <ClaimDonationDialog open={isClaiming} onOpenChange={setIsClaiming} donation={donation} />
    </>
  );
}
