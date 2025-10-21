'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Wand, Loader2, Lightbulb, Image as ImageIcon } from 'lucide-react';
import { suggestTitlesAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  description: z.string().min(10, 'Description is too short.'),
  quantity: z.string().min(1, 'Quantity is required.'),
  type: z.enum(['Produce', 'Baked Goods', 'Canned Goods', 'Prepared Meal', 'Dairy', 'Pantry']),
  pickupDeadline: z.date({ required_error: 'A pickup date is required.' }),
  image: z.any().optional(),
});

function TitleSuggestion({ onSelectTitle, clearSuggestions, suggestions, isLoading }: {
  onSelectTitle: (title: string) => void,
  clearSuggestions: () => void,
  suggestions: string[],
  isLoading: boolean,
}) {
  return (
    <div>
        {isLoading && <div className="text-sm text-muted-foreground flex items-center"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating ideas...</div>}
        {suggestions.length > 0 && (
          <div className="mt-2 p-4 bg-secondary rounded-lg">
            <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold flex items-center"><Lightbulb className="w-4 h-4 mr-2 text-primary"/> AI Suggestions</h4>
                <Button variant="ghost" size="sm" onClick={clearSuggestions}>Clear</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((title, index) => (
                <Button key={index} variant="outline" size="sm" onClick={() => onSelectTitle(title)}>
                  {title}
                </Button>
              ))}
            </div>
          </div>
        )}
    </div>
  )
}

export function NewDonationForm() {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      quantity: '',
    },
  });

  async function handleSuggestTitles() {
    setIsLoading(true);
    setSuggestions([]);
    const description = form.getValues('description');
    const imageFile = form.getValues('image');

    if (!description && !imageFile) {
        toast({
            variant: "destructive",
            title: "Input needed",
            description: "Please provide a description or an image to get suggestions."
        })
        setIsLoading(false);
        return;
    }

    let photoDataUri: string | undefined;
    if (imageFile) {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        photoDataUri = await new Promise((resolve) => {
            reader.onload = () => resolve(reader.result as string);
        });
    }

    const result = await suggestTitlesAction({ description, photoDataUri });
    
    if (result.error) {
        toast({
            variant: "destructive",
            title: "AI Suggestion Error",
            description: result.error
        });
    } else if (result.suggestions) {
        setSuggestions(result.suggestions);
    }
    setIsLoading(false);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
        title: "Donation Listed! 🎉",
        description: `Your donation of "${values.title}" is now available.`,
    })
    form.reset();
    setSuggestions([]);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Create a New Donation</CardTitle>
        <CardDescription>Fill out the details below to list your surplus food.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Food Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., 10 whole wheat sandwich loaves, baked this morning." {...field} />
                    </FormControl>
                    <FormDescription>
                      Describe the item(s), including quantity and condition.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                  control={form.control}
                  name="image"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormLabel>Or/And Upload a Photo</FormLabel>
                      <FormControl>
                        <div className="relative">
                           <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
                           <Input type="file" accept="image/*" onChange={(e) => onChange(e.target.files ? e.target.files[0] : null)} className="pl-10" />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
            </div>
            
            <div className="p-4 border-dashed border-2 border-primary/50 rounded-lg bg-primary/5 space-y-4">
                 <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold">Need help with a title?</h3>
                        <p className="text-sm text-muted-foreground">Use our AI to generate a title from your description or photo.</p>
                    </div>
                    <Button type="button" onClick={handleSuggestTitles} disabled={isLoading}>
                      <Wand className="mr-2 h-4 w-4" />
                      Suggest Titles
                    </Button>
                </div>
                 <TitleSuggestion
                    onSelectTitle={(title) => form.setValue('title', title)}
                    clearSuggestions={() => setSuggestions([])}
                    suggestions={suggestions}
                    isLoading={isLoading}
                />
            </div>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Listing Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Fresh Sourdough Bread" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 2 boxes, 15 loaves" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Food Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a food type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Pantry">Pantry</SelectItem>
                        <SelectItem value="Baked Goods">Baked Goods</SelectItem>
                        <SelectItem value="Produce">Produce</SelectItem>
                        <SelectItem value="Canned Goods">Canned Goods</SelectItem>
                        <SelectItem value="Dairy">Dairy</SelectItem>
                        <SelectItem value="Prepared Meal">Prepared Meal</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                                "pl-3 text-left font-normal",
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Button type="submit" size="lg" className="w-full md:w-auto">List Donation</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
