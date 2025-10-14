import type { FilterDefinition, OperatorConfig } from './types';

// Mock filter configurations that would normally come from the server
const filterDefinitions: FilterDefinition[] = [
    {
        id: 'country',
        name: 'Country',
        valueType: 'single-select',
        operators: [
            { id: 'equals', label: 'Is', color: 'primary' },
            { id: 'not-equals', label: 'Is not', color: 'error' },
        ],
        options: [
            { id: 'uae', label: 'UAE' },
            { id: 'usa', label: 'USA' },
            { id: 'uk', label: 'United Kingdom' },
            { id: 'canada', label: 'Canada' },
        ],
        linkedFilter: {
            filterId: 'sub-country',
            parentValueMap: {
                'uae': ['dubai', 'abu-dhabi', 'sharjah', 'ajman'],
                'usa': ['california', 'texas', 'new-york', 'florida'],
                'uk': ['england', 'scotland', 'wales', 'northern-ireland'],
                'canada': ['ontario', 'quebec', 'british-columbia', 'alberta'],
            },
        },
    },
    {
        id: 'sub-country',
        name: 'Sub-Country',
        valueType: 'multi-select',
        operators: [
            { id: 'in', label: 'In', color: 'primary' },
            { id: 'not-in', label: 'Not in', color: 'error' },
        ],
        options: [
            // UAE
            { id: 'dubai', label: 'Dubai' },
            { id: 'abu-dhabi', label: 'Abu Dhabi' },
            { id: 'sharjah', label: 'Sharjah' },
            { id: 'ajman', label: 'Ajman' },
            // USA
            { id: 'california', label: 'California' },
            { id: 'texas', label: 'Texas' },
            { id: 'new-york', label: 'New York' },
            { id: 'florida', label: 'Florida' },
            // UK
            { id: 'england', label: 'England' },
            { id: 'scotland', label: 'Scotland' },
            { id: 'wales', label: 'Wales' },
            { id: 'northern-ireland', label: 'Northern Ireland' },
            // Canada
            { id: 'ontario', label: 'Ontario' },
            { id: 'quebec', label: 'Quebec' },
            { id: 'british-columbia', label: 'British Columbia' },
            { id: 'alberta', label: 'Alberta' },
        ],
    },
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

// Get only primary filters (filters without linked filters and not linked themselves)
export const getPrimaryFilterDefinitions = (): FilterDefinition[] => {
    const linkedFilterIds = new Set(
        filterDefinitions
            .filter(def => def.linkedFilter)
            .map(def => def.linkedFilter!.filterId)
    );
    
    return filterDefinitions.filter(def => !linkedFilterIds.has(def.id));
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
