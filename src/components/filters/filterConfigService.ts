import type { FilterDefinition, OperatorConfig } from './types';

// Mock filter configurations that would normally come from the server
const filterDefinitions: FilterDefinition[] = [
    {
        id: 'nationality',
        name: 'Nationality',
        valueType: 'single-select',
        operators: [
            { id: 'equals', label: 'Is', color: 'primary' },
            { id: 'not-equals', label: 'Is not', color: 'error' },
        ],
        options: [
            { id: 'us', label: 'United States' },
            { id: 'uk', label: 'United Kingdom' },
            { id: 'ca', label: 'Canada' },
            { id: 'au', label: 'Australia' },
            { id: 'de', label: 'Germany' },
            { id: 'fr', label: 'France' },
            { id: 'jp', label: 'Japan' },
            { id: 'cn', label: 'China' },
        ],
    },
    {
        id: 'name',
        name: 'Name',
        valueType: 'text',
        operators: [
            { id: 'equals', label: 'Equals', color: 'primary' },
            { id: 'not-equals', label: 'Not equals', color: 'error' },
            { id: 'contains', label: 'Contains', color: 'info' },
            { id: 'not-contains', label: 'Not contains', color: 'warning' },
            { id: 'starts-with', label: 'Starts with', color: 'success' },
            { id: 'ends-with', label: 'Ends with', color: 'secondary' },
        ],
        placeholder: 'Enter name...',
    },
    {
        id: 'status',
        name: 'Status',
        valueType: 'multi-select',
        operators: [
            { id: 'in', label: 'In', color: 'primary' },
            { id: 'not-in', label: 'Not in', color: 'error' },
        ],
        options: [
            { id: 'active', label: 'Active' },
            { id: 'inactive', label: 'Inactive' },
            { id: 'pending', label: 'Pending' },
            { id: 'archived', label: 'Archived' },
        ],
    },
    {
        id: 'age',
        name: 'Age',
        valueType: 'text',
        operators: [
            { id: 'equals', label: 'Equals', color: 'primary' },
            { id: 'not-equals', label: 'Not equals', color: 'error' },
            { id: 'greater-than', label: 'Greater than', color: 'success' },
            { id: 'less-than', label: 'Less than', color: 'warning' },
        ],
        placeholder: 'Enter age...',
    },
    {
        id: 'category',
        name: 'Category',
        valueType: 'multi-select',
        operators: [
            { id: 'in', label: 'In', color: 'primary' },
            { id: 'not-in', label: 'Not in', color: 'error' },
        ],
        options: [
            { id: 'electronics', label: 'Electronics' },
            { id: 'clothing', label: 'Clothing' },
            { id: 'food', label: 'Food' },
            { id: 'books', label: 'Books' },
            { id: 'toys', label: 'Toys' },
        ],
    },
];

// Simulate async fetch from server
export const fetchFilterDefinitions = async (): Promise<FilterDefinition[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return filterDefinitions;
};

// Get a specific filter definition by ID
export const getFilterDefinition = (filterId: string): FilterDefinition | undefined => {
    return filterDefinitions.find(def => def.id === filterId);
};

// Get default operator for a filter
export const getDefaultOperator = (filterId: string): OperatorConfig | undefined => {
    const definition = getFilterDefinition(filterId);
    return definition?.operators[0];
};
