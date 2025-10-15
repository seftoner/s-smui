import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { FilterInput } from './FilterInput';
import type { ActiveFilter, FilterDefinition, FilterOption } from './types';
import { getFilterDefinition } from './filterConfigService';

interface LinkedFilterInputProps {
    primaryFilter: ActiveFilter;
    linkedFilter: ActiveFilter;
    availableFilters: FilterDefinition[];
    onPrimaryChange: (filter: ActiveFilter) => void;
    onLinkedChange: (filter: ActiveFilter) => void;
    onDelete: () => void;
    onTogglePrimaryEnabled: () => void;
    onFilterTypeChange?: (oldFilterId: string, newFilterId: string) => void;
}

export const LinkedFilterInput: React.FC<LinkedFilterInputProps> = ({
    primaryFilter,
    linkedFilter,
    availableFilters,
    onPrimaryChange,
    onLinkedChange,
    onDelete,
    onTogglePrimaryEnabled,
    onFilterTypeChange,
}) => {
    const primaryFilterDef = getFilterDefinition(primaryFilter.filterId!);
    const linkedFilterDef = getFilterDefinition(linkedFilter.filterId!);

    if (!primaryFilterDef || !linkedFilterDef) {
        return null;
    }

    const linkedOptionsById = useMemo(() => {
        const optionEntries = linkedFilterDef.options ?? [];
        return optionEntries.reduce<Map<string, FilterOption>>((acc, option) => {
            acc.set(option.id, option);
            return acc;
        }, new Map());
    }, [linkedFilterDef.options]);

    const filteredLinkedOptions = useMemo(() => {
        if (!primaryFilterDef.linkedFilter) {
            return [];
        }

        const rawParentValue = primaryFilter.value;
        if (Array.isArray(rawParentValue) || !rawParentValue) {
            return [];
        }

        const parentValue = rawParentValue as string;
        const availableOptionIds = primaryFilterDef.linkedFilter.parentValueMap[parentValue] || [];
        if (!availableOptionIds.length) {
            return [];
        }

        return availableOptionIds.reduce<FilterOption[]>((acc, optionId) => {
            const option = linkedOptionsById.get(optionId);
            if (option) {
                acc.push(option);
            }
            return acc;
        }, []);
    }, [primaryFilter.value, primaryFilterDef.linkedFilter, linkedOptionsById]);

    // Check if linked filter should be enabled (primary has value selected)
    const isLinkedFilterEnabled = Boolean(primaryFilter.value && primaryFilter.enabled);

    // Create modified linked filter definition with filtered options
    const modifiedLinkedFilterDef: FilterDefinition = useMemo(() => ({
        ...linkedFilterDef,
        options: filteredLinkedOptions,
    }), [filteredLinkedOptions, linkedFilterDef]);

    // Handle primary filter change - reset linked filter value if primary changes
    const handlePrimaryChange = (updatedPrimary: ActiveFilter) => {
        onPrimaryChange(updatedPrimary);

        // Reset linked filter value if primary value changed
        if (updatedPrimary.value !== primaryFilter.value) {
            onLinkedChange({
                ...linkedFilter,
                value: linkedFilterDef.valueType === 'multi-select' ? [] : '',
            });
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
            }}
        >
            {/* Primary Filter */}
            <FilterInput
                filter={primaryFilter}
                availableFilters={availableFilters}
                onChange={handlePrimaryChange}
                onDelete={onDelete}
                onToggleEnabled={onTogglePrimaryEnabled}
                onFilterTypeChange={onFilterTypeChange}
            />

            {/* Linked Filter with Tree Branch */}
            <Box
                sx={{
                    display: 'flex',
                    mt: 4,
                }}
            >
                {/* Tree Branch Line */}
                <Box
                    sx={{
                        width: 18,
                        height: 32,
                        mr: 2,
                        borderBottom: '1px solid',
                        borderLeft: '1px solid',
                        borderColor: 'divider',
                        borderRadius: '0 0 0 8px',
                        mt: '-4px',
                    }}
                />

                {/* Linked Filter */}
                <Box sx={{ flex: 1 }}>
                    <FilterInput
                        filter={{
                            ...linkedFilter,
                            enabled: isLinkedFilterEnabled,
                        }}
                        availableFilters={[modifiedLinkedFilterDef]}
                        onChange={onLinkedChange}
                        onDelete={() => { }} // Linked filter cannot be deleted independently
                        onToggleEnabled={() => { }} // Linked filter cannot be toggled independently
                        isLinked={true}
                        isLinkedEnabled={isLinkedFilterEnabled}
                    />
                </Box>
            </Box>
        </Box>
    );
};
