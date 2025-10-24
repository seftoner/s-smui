export type FilterValueType = 
    | 'text' 
    | 'multi-text'
    | 'numeric'
    | 'boolean'
    | 'date-range'
    | 'single-select' 
    | 'multi-select';

export type ValueLogicOperator = 'and' | 'or';

export type OperatorType = 
    | 'equals' 
    | 'not-equals' 
    | 'contains' 
    | 'not-contains'
    | 'starts-with' 
    | 'ends-with'
    | 'greater-than'
    | 'less-than'
    | 'between';

export interface OperatorConfig {
    id: OperatorType;
    label: string;
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
    // Date range specific
    minDate?: Date;
    maxDate?: Date;
    // Numeric specific
    min?: number;
    max?: number;
    step?: number;
}

export interface DateRangeValue {
    from: Date | null;
    to: Date | null;
}

export interface ActiveFilter {
    id: string; // Unique instance ID
    filterId?: string; // Reference to FilterDefinition - optional for empty filters
    operator?: OperatorType; // Optional for empty filters
    value: string | string[] | boolean | number | DateRangeValue; // Enhanced to support all value types
    valueLogicOperator?: ValueLogicOperator; // AND/OR for multi-value filters
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
