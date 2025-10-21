// @/app/actions.ts
'use server';

import {
  suggestFoodListingTitles,
  type SuggestFoodListingTitlesInput,
} from '@/ai/flows/suggest-food-listing-titles';
import {
  matchFoodDonationsWithNGOs
} from '@/ai/flows/match-food-donations-with-ngos';
import type { Ngo } from '@/lib/types';

export async function suggestTitlesAction(
  input: SuggestFoodListingTitlesInput
): Promise<{ suggestions?: string[]; error?: string }> {
  try {
    const result = await suggestFoodListingTitles(input);
    if (result.suggestedTitles.length === 0) {
        return { suggestions: ["No safe/valid titles could be generated. Please check your input."] };
    }
    return { suggestions: result.suggestedTitles };
  } catch (error) {
    console.error('Error suggesting titles:', error);
    return { error: 'Failed to suggest titles due to an internal error.' };
  }
}

export async function generateMatchesAction(): Promise<{ matches?: Ngo[]; error?: string; }> {
    try {
        // This input is more realistic for a smart matching scenario.
        const realisticInput = {
            foodListingDetails: '25 kg of fresh, mixed organic vegetables (carrots, bell peppers, spinach). Best if used within 3 days. Ready for immediate pickup.',
            ngoRequirements: '1. Urban Food Bank: Requires fresh produce for their soup kitchen, serves 200 meals daily. Located at 456 Main St. 2. St. Jude\'s Shelter: Needs vegetables for family meal boxes, pickup required. Find them at 789 Oak Ave. 3. City Harvest Collective: Accepts bulk produce, has refrigerated trucks for transport. Based at 101 Pine Ln.',
            donorLocation: 'Greenleaf Organics, 123 Market St, Springfield',
        };
        const result = await matchFoodDonationsWithNGOs(realisticInput);
        
        // Add a unique ID to each match for React keys, as the AI won't provide one.
        const matchesWithIds = result.map((match, index) => ({
            ...match,
            id: `match-${index}-${new Date().getTime()}`
        }));

        return { matches: matchesWithIds };

    } catch (error) {
        console.error('Error generating matches:', error);
        return { error: 'Failed to generate matches due to an internal error.' };
    }
}
