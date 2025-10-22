
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import type { Donation } from '@/lib/types';
import { Building, Phone, MapPin, Truck, Warehouse } from 'lucide-react';
import { Separator } from '../ui/separator';
import { useDonations } from '@/context/donations-context';
import { useUser } from '@/firebase';

const claimSchema = z.object({
  ngoName: z.string().min(2, 'Organization name is required.'),
  phone: z.string().min(10, 'A valid phone number is required.'),
  address: z.string().min(10, 'A valid address is required.'),
  pickupOption: z.enum(['pickup', 'delivery_assistance'], {
    required_error: 'Please select a pickup option.',
  }),
});

type ClaimDonationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  donation: Donation;
};

export function ClaimDonationDialog({
  open,
  onOpenChange,
  donation,
}: ClaimDonationDialogProps) {
  const { toast } = useToast();
  const { claimDonation } = useDonations();
  const { user } = useUser();

  const form = useForm<z.infer<typeof claimSchema>>({
    resolver: zodResolver(claimSchema),
    defaultValues: {
      ngoName: '',
      phone: '',
      address: '',
    },
  });

  function onSubmit(values: z.infer<typeof claimSchema>) {
    if (!user) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "You must be logged in to claim a donation."
        })
        return;
    }

    console.log('Claim submitted:', { ...values, donationId: donation.id });
    claimDonation(donation.id, user.uid);
    toast({
      title: 'Claim Submitted! 🎉',
      description: `The donor has been notified. Please coordinate for pickup.`,
    });
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">
            Confirm Claim for: {donation.title}
          </DialogTitle>
          <DialogDescription>
            Please provide your details to coordinate the pickup with the donor.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
               <FormField
                control={form.control}
                name="ngoName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NGO / Organization Name</FormLabel>
                    <div className="relative">
                       <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                       <FormControl>
                        <Input placeholder="Your organization's name" {...field} className="pl-10"/>
                       </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Phone Number</FormLabel>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <FormControl>
                            <Input placeholder="e.g., +1 234 567 890" {...field} className="pl-10"/>
                        </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Full Address</FormLabel>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <FormControl>
                            <Input placeholder="Street, City, Postal Code" {...field} className="pl-10"/>
                        </FormControl>
                    </div>
                     <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Separator />
            
            <FormField
              control={form.control}
              name="pickupOption"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Pickup & Delivery</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="space-y-2"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <RadioGroupItem value="pickup" />
                        </FormControl>
                        <div className='flex items-start gap-3'>
                            <Warehouse className="w-5 h-5 text-primary"/>
                            <div>
                                <FormLabel className="font-normal">We Will Pick Up</FormLabel>
                                <p className="text-xs text-muted-foreground">Our team will collect the donation from the donor's location.</p>
                            </div>
                        </div>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <RadioGroupItem value="delivery_assistance" />
                        </FormControl>
                         <div className='flex items-start gap-3'>
                            <Truck className="w-5 h-5 text-primary"/>
                            <div>
                                <FormLabel className="font-normal">Request Delivery Assistance</FormLabel>
                                <p className="text-xs text-muted-foreground">We need help getting the donation. A third-party service may be used.</p>
                            </div>
                        </div>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Confirm Claim</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
