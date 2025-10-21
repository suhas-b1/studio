// @/app/actions.ts
'use server';

import {
  suggestFoodListingTitles,
  type SuggestFoodListingTitlesInput,
} from '@/ai/flows/suggest-food-listing-titles';
import {
  matchFoodDonationsWithNGOs
} from '@/ai/flows/match-food-donations-with-ngos';

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

export async function generateMatchesAction() {
    try {
        const mockInput = {
            foodListingDetails: '15 boxes of assorted fresh vegetables including lettuce, tomatoes, and cucumbers. Available for immediate pickup.',
            ngoRequirements: 'Community Kitchen needs fresh produce for their daily meal service. Shelter of Hope requires any non-perishable items. The Food Bank is looking for bulk donations.',
            donorLocation: 'Downtown, Springfield',
        };
        const result = await matchFoodDonationsWithNGOs(mockInput);
        return { matches: result };
    } catch (error) {
        console.error('Error generating matches:', error);
        return { error: 'Failed to generate matches due to an internal error.' };
    }
}
