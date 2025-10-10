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