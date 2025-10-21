'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';

const mealTypes = [
    { name: 'Breakfast', imageUrl: 'https://picsum.photos/seed/breakfast/200/200', imageHint: 'breakfast food' },
    { name: 'Lunch', imageUrl: 'https://picsum.photos/seed/lunch/200/200', imageHint: 'lunch food' },
    { name: 'Dinner', imageUrl: 'https://picsum.photos/seed/dinner/200/200', imageHint: 'dinner food' },
]

const formSchema = z.object({
  diet: z.enum(['veg', 'non-veg']),
  mealType: z.string().min(1, 'Please select a meal type.'),
  quantity: z.number().min(1, 'Quantity must be at least 1.'),
  preparedAt: z.number().min(0).max(12),
});

export function NewDonationForm() {
  const [selectedMeal, setSelectedMeal] = useState('');
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      diet: 'veg',
      mealType: '',
      quantity: 10,
      preparedAt: 3,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
        title: "Donation Posted! 🎉",
        description: `Your ${values.mealType} donation is now listed.`,
    })
    form.reset();
    setSelectedMeal('');
  }

  return (
    <div className='max-w-md mx-auto'>
        <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
                <ChevronLeft />
            </Button>
            <h1 className="text-2xl font-bold font-headline">Donate Food</h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="diet"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Meal type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="veg" />
                        </FormControl>
                        <FormLabel className="font-normal">Veg</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="non-veg" />
                        </FormControl>
                        <FormLabel className="font-normal">Non-veg</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="mealType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                    <div className="flex justify-around text-center">
                        {mealTypes.map(meal => (
                            <div key={meal.name} onClick={() => {
                                field.onChange(meal.name);
                                setSelectedMeal(meal.name);
                            }}>
                                <Image 
                                    src={meal.imageUrl}
                                    alt={meal.name}
                                    width={80}
                                    height={80}
                                    data-ai-hint={meal.imageHint}
                                    className={cn('rounded-full object-cover aspect-square transition-all', selectedMeal === meal.name ? 'ring-4 ring-primary' : 'ring-2 ring-transparent')}
                                />
                                <FormLabel className={cn("font-normal mt-2 block", selectedMeal === meal.name && "text-primary")}>{meal.name}</FormLabel>
                            </div>
                        ))}
                    </div>
                  <FormMessage className="text-center" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity (person)</FormLabel>
                  <div className="flex items-center gap-4">
                     <span className="text-sm font-medium">{field.value}</span>
                    <Slider
                      min={0}
                      max={60}
                      step={1}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preparedAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>When was the meal prepared (Hrs)</FormLabel>
                   <div className="flex items-center gap-4">
                     <span className="text-sm font-medium">{field.value}</span>
                        <Slider
                        min={0}
                        max={12}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" size="lg" className="w-full">Post</Button>
          </form>
        </Form>
    </div>
  );
}
