export type FilterValueType = 'text' | 'single-select' | 'multi-select';

export type OperatorType = 
    | 'equals' 
    | 'not-equals' 
    | 'contains' 
    | 'not-contains'
    | 'starts-with' 
    | 'ends-with'
    | 'greater-than'
    | 'less-than'
    | 'in'
    | 'not-in';

export interface OperatorConfig {
    id: OperatorType;
    label: string;
    color: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
}

export interface FilterOption {
    id: string;
    label: string;
}

export interface LinkedFilterDefinition {
    filterId: string; // The linked filter definition ID
    parentValueMap: Record<string, string[]>; // Maps parent value to available child options
}

export interface FilterDefinition {
    id: string;
    name: string;
    valueType: FilterValueType;
    operators: OperatorConfig[];
    options?: FilterOption[]; // For single-select and multi-select
    placeholder?: string; // For text input
    linkedFilter?: LinkedFilterDefinition; // Optional linked filter
}

export interface ActiveFilter {
    id: string; // Unique instance ID
    filterId: string; // Reference to FilterDefinition
    operator: OperatorType;
    value: string | string[]; // string for text/single-select, string[] for multi-select
    enabled: boolean;
    linkedFilterId?: string; // Reference to linked ActiveFilter ID if this has a linked filter
}

export interface ActiveLinkedFilterGroup {
    id: string; // Group ID
    primaryFilter: ActiveFilter;
    linkedFilter: ActiveFilter;
}

export interface FilterState {
    filters: ActiveFilter[];
}
