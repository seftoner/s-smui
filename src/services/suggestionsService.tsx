/**
 * Suggestions Service
 * Mock repository for suggestion chips that will be replaced with API calls
 */

import {
    PencilCircleIcon,
    CheckCircleIcon,
    FileTextIcon,
} from '@phosphor-icons/react';
import type { SuggestionChip } from '../components/ai-chat/types';

// Mock data - in production this would come from an API
const MOCK_SUGGESTIONS: SuggestionChip[] = [
    {
        id: 'improving-writing',
        label: 'Improving writing',
        icon: <PencilCircleIcon size={20} />,
        systemPrompt: 'You are a writing assistant focused on improving text quality, grammar, and style.'
    },
    {
        id: 'auto-correction',
        label: 'Auto-correction',
        icon: <CheckCircleIcon size={20} />,
        systemPrompt: 'You are a proofreading assistant that corrects spelling, grammar, and punctuation errors.'
    },
    {
        id: 'text-summarisation',
        label: 'Text summarisation',
        icon: <FileTextIcon size={20} />,
        systemPrompt: 'You are a summarization assistant that creates concise summaries of provided text.'
    }
];

/**
 * Fetch available suggestion chips for the landing page
 * In production, this would make an API call to the backend
 * 
 * @returns Promise resolving to array of suggestion chips
 */
export const fetchSuggestions = async (): Promise<SuggestionChip[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return MOCK_SUGGESTIONS;
};

/**
 * Get suggestions synchronously from cache
 * Used when suggestions are already loaded
 * 
 * @returns Array of suggestion chips
 */
export const getSuggestions = (): SuggestionChip[] => {
    return MOCK_SUGGESTIONS;
};

/**
 * Get a specific suggestion by ID
 * 
 * @param id - The suggestion chip ID
 * @returns The suggestion chip or undefined if not found
 */
export const getSuggestionById = (id: string): SuggestionChip | undefined => {
    return MOCK_SUGGESTIONS.find(suggestion => suggestion.id === id);
};
