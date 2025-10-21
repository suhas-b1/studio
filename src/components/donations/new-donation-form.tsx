
'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { ChevronLeft, Upload, Sparkles, Loader2, Calendar as CalendarIcon } from 'lucide-react';
import { suggestTitlesAction } from '@/app/actions';
import { useDonations } from '@/context/donations-context';
import { useUser } from '@/firebase';
import { mockUsers } from '@/lib/mock-data';


const newDonationSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters long.'),
  description: z.string().min(10, 'Description must be at least 10 characters long.'),
  quantity: z.string().min(1, 'Please specify the quantity.'),
  type: z.enum(['Produce', 'Baked Goods', 'Canned Goods', 'Prepared Meal', 'Dairy', 'Pantry']),
  pickupDeadline: z.date({
    required_error: "A pickup deadline is required.",
  }),
  location: z.string().min(5, 'Please provide a pickup location.'),
  image: z.any().optional(),
  imageHint: z.string().optional(),
});

export function NewDonationForm() {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSuggesting, setIsSuggesting] = useState(false);
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { addDonation } = useDonations();
    const { user } = useUser();

    const form = useForm<z.infer<typeof newDonationSchema>>({
        resolver: zodResolver(newDonationSchema),
        defaultValues: {
            title: '',
            description: '',
            quantity: '',
            location: '',
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGenerateTitles = async () => {
        setIsSuggesting(true);
        const description = form.getValues('description');
        let photoDataUri: string | undefined = undefined;

        const imageFile = form.getValues('image');
        if (imageFile) {
           photoDataUri = imagePreview as string;
        }

        if (!description && !photoDataUri) {
            toast({
                variant: 'destructive',
                title: 'Input Needed',
                description: 'Please provide a description or upload an image to suggest titles.',
            });
            setIsSuggesting(false);
            return;
        }

        const result = await suggestTitlesAction({ description, photoDataUri });

        if (result.error) {
            toast({
                variant: 'destructive',
                title: 'AI Error',
                description: result.error,
            });
        } else if (result.suggestions && result.suggestions.length > 0) {
            form.setValue('title', result.suggestions[0]);
            toast({
                title: 'Title Suggested!',
                description: 'The AI has suggested a title for your donation.',
            });
        }
        setIsSuggesting(false);
    };

    function onSubmit(values: z.infer<typeof newDonationSchema>) {
        if (!user) {
            toast({ variant: "destructive", title: "You must be logged in to donate."});
            return;
        }

        const newDonation = {
            id: `donation-${new Date().getTime()}`,
            ...values,
            imageUrl: imagePreview || 'https://placehold.co/600x400',
            imageHint: values.imageHint || 'food',
            donorId: user.uid,
            donor: mockUsers.find(u => u.id === user.uid) || mockUsers.find(u => u.role === 'donor')!,
            status: 'available' as const,
            createdAt: new Date(),
            distance: Math.random() * 10,
        };

        addDonation(newDonation);
        
        toast({
            title: "Donation Listed! 🎉",
            description: "Your food donation is now visible to nearby NGOs.",
        })
        form.reset();
        setImagePreview(null);
    }

    return (
        <div className='max-w-2xl mx-auto'>
            <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
                    <ChevronLeft />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold font-headline">List a New Donation</h1>
                    <p className="text-muted-foreground">Fill in the details to make your food available.</p>
                </div>
            </div>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Food Details</CardTitle>
                        <CardDescription>Describe the food you are donating. Be as specific as possible.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Donation Image</FormLabel>
                                        <FormControl>
                                            <div 
                                                className="relative flex justify-center items-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50"
                                                onClick={() => fileInputRef.current?.click()}
                                            >
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                />
                                                {imagePreview ? (
                                                    <Image src={imagePreview} alt="Selected donation" fill className="object-contain rounded-lg" />
                                                ) : (
                                                    <div className="text-center text-muted-foreground">
                                                        <Upload className="mx-auto h-8 w-8 mb-2"/>
                                                        <p>Click to upload an image</p>
                                                        <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
                                                    </div>
                                                )}
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="e.g., Unopened bags of basmati rice, sealed boxes of whole-wheat pasta..." {...field} rows={3} />
                                        </FormControl>
                                         <FormDescription>
                                            Provide details like brand, condition, and any dietary information.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex justify-between items-center">
                                            <FormLabel>Listing Title</FormLabel>
                                            <Button type="button" variant="outline" size="sm" onClick={handleGenerateTitles} disabled={isSuggesting}>
                                                {isSuggesting ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Sparkles className="mr-2 h-4 w-4" />}
                                                Suggest with AI
                                            </Button>
                                        </div>
                                        <FormControl>
                                            <Input placeholder="e.g., 'Bulk Pantry Staples - Rice & Pasta'" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Food Type</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a food category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Pantry">Pantry Staples</SelectItem>
                                                    <SelectItem value="Produce">Fresh Produce</SelectItem>
                                                    <SelectItem value="Baked Goods">Baked Goods</SelectItem>
                                                    <SelectItem value="Dairy">Dairy & Eggs</SelectItem>
                                                    <SelectItem value="Prepared Meal">Prepared Meals</SelectItem>
                                                    <SelectItem value="Canned Goods">Canned Goods</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="quantity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Quantity</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., '10 kg' or '2 boxes'" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Pickup & Logistics</CardTitle>
                        <CardDescription>Provide details for where and when the food can be collected.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <FormField
                            control={form.control}
                            name="pickupDeadline"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                <FormLabel>Pickup Deadline</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full pl-3 text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                        )}
                                        >
                                        {field.value ? (
                                            format(field.value, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date < new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                    </PopoverContent>
                                </Popover>
                                 <FormDescription>
                                    The last day this donation should be picked up.
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pickup Location</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Full address for pickup" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                 </Card>
                
                <Button type="submit" size="lg" className="w-full">List Donation</Button>
            </form>
            </Form>
        </div>
    );
}
