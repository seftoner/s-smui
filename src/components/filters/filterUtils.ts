import type { ActiveFilter } from './types';

/**
 * Calculates whether filters can be applied based on their enabled state and values.
 * 
 * @param filters - Array of active filters to validate
 * @returns true if at least one filter is enabled
 */
export const calculateCanApply = (filters: ActiveFilter[]): boolean => {
    return filters.some(filter => filter.enabled);
};

/**
 * Validates if a single filter has a valid value
 * 
 * @param filter - The filter to validate
 * @returns true if the filter has a valid value
 */
export const isFilterValid = (filter: ActiveFilter): boolean => {
    if (Array.isArray(filter.value)) {
        return filter.value.length > 0;
    }
    return Boolean(filter.value);
};

/**
 * Gets the count of enabled filters
 * 
 * @param filters - Array of filters to count
 * @returns number of enabled filters
 */
export const getEnabledFiltersCount = (filters: ActiveFilter[]): number => {
    return filters.filter(f => f.enabled).length;
};

/**
 * Gets the count of valid (enabled with values) filters
 * 
 * @param filters - Array of filters to count
 * @returns number of valid filters
 */
export const getValidFiltersCount = (filters: ActiveFilter[]): number => {
    return filters.filter(f => f.enabled && isFilterValid(f)).length;
};

/**
 * Checks if a filter is a linked (child) filter
 * 
 * @param filter - The filter to check
 * @param allFilters - All filters in the current state
 * @returns true if this filter is linked to another filter
 */
export const isLinkedFilter = (filter: ActiveFilter, allFilters: ActiveFilter[]): boolean => {
    return allFilters.some(f => f.linkedFilterId === filter.id);
};

/**
 * Gets the linked filter for a primary filter
 * 
 * @param primaryFilter - The primary filter
 * @param allFilters - All filters in the current state
 * @returns The linked filter if it exists, undefined otherwise
 */
export const getLinkedFilter = (
    primaryFilter: ActiveFilter,
    allFilters: ActiveFilter[]
): ActiveFilter | undefined => {
    if (!primaryFilter.linkedFilterId) return undefined;
    return allFilters.find(f => f.id === primaryFilter.linkedFilterId);
};

/**
 * Gets all primary filters (filters that are not linked to another filter)
 * 
 * @param filters - All filters in the current state
 * @returns Array of primary filters
 */
export const getPrimaryFilters = (filters: ActiveFilter[]): ActiveFilter[] => {
    return filters.filter(filter => !isLinkedFilter(filter, filters));
};

/**
 * Gets all filter groups (primary filters with their linked filters)
 * 
 * @param filters - All filters in the current state
 * @returns Array of filter groups
 */
export const getFilterGroups = (filters: ActiveFilter[]): Array<{
    primary: ActiveFilter;
    linked?: ActiveFilter;
}> => {
    return getPrimaryFilters(filters).map(primary => ({
        primary,
        linked: getLinkedFilter(primary, filters),
    }));
};
