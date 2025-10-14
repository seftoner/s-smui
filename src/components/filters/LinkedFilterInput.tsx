import React from 'react';
import { Box, Icon } from '@mui/material';
import { LinkSimple } from '@phosphor-icons/react';
import { FilterInput } from './FilterInput';
import type { ActiveFilter, FilterDefinition } from './types';
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
    const primaryFilterDef = getFilterDefinition(primaryFilter.filterId);
    const linkedFilterDef = getFilterDefinition(linkedFilter.filterId);

    if (!primaryFilterDef || !linkedFilterDef) {
        return null;
    }

    // Get available options for linked filter based on primary filter value
    const getLinkedFilterOptions = () => {
        if (!primaryFilterDef.linkedFilter || !primaryFilter.value) {
            return [];
        }

        const parentValue = primaryFilter.value as string;
        const availableOptionIds = primaryFilterDef.linkedFilter.parentValueMap[parentValue] || [];

        return linkedFilterDef.options?.filter(opt => availableOptionIds.includes(opt.id)) || [];
    };

    // Check if linked filter should be enabled (primary has value selected)
    const isLinkedFilterEnabled = Boolean(primaryFilter.value && primaryFilter.enabled);

    // Create modified linked filter definition with filtered options
    const modifiedLinkedFilterDef: FilterDefinition = {
        ...linkedFilterDef,
        options: getLinkedFilterOptions(),
    };

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
                gap: 1,
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

            {/* Chain Icon */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 0.5,
                }}
            >
                <Icon
                    sx={{
                        color: isLinkedFilterEnabled ? 'primary.main' : 'action.disabled',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'color 0.2s',
                    }}
                >
                    <LinkSimple size={20} weight="bold" />
                </Icon>
            </Box>

            {/* Linked Filter */}
            <Box
                sx={{
                    pl: 4, // Indent linked filter
                }}
            >
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
    );
};
