import React from 'react';
import { Box } from '@mui/material';
import { FilterInput } from './FilterInput';
import { LinkedFilterInput } from './LinkedFilterInput';
import { FilterOperator } from './FilterOperator';
import type { ActiveFilter, FilterDefinition } from './types';

interface FilterGroup {
    primary: ActiveFilter;
    linked?: ActiveFilter;
}

interface FilterListProps {
    filterGroups: FilterGroup[];
    primaryFilters: FilterDefinition[];
    logicalOperator: 'and' | 'or';
    onPrimaryChange: (id: string, filter: ActiveFilter) => void;
    onLinkedChange: (id: string, filter: ActiveFilter) => void;
    onDelete: (id: string) => void;
    onToggleEnabled: (id: string) => void;
    onToggleLogicalOperator: () => void;
    onFilterTypeChange: (id: string, oldFilterId: string, newFilterId: string) => void;
}

export const FilterList: React.FC<FilterListProps> = ({
    filterGroups,
    primaryFilters,
    logicalOperator,
    onPrimaryChange,
    onLinkedChange,
    onDelete,
    onToggleEnabled,
    onToggleLogicalOperator,
    onFilterTypeChange,
}) => {
    return (
        <>
            {filterGroups.map((group, index) => {
                const isLastGroup = index === filterGroups.length - 1;
                const { primary, linked } = group;

                return (
                    <React.Fragment key={primary.id}>
                        <Box
                            sx={{
                                pr: 2,
                                pl: 4,
                                py: 1,
                            }}
                        >
                            {linked ? (
                                <LinkedFilterInput
                                    primaryFilter={primary}
                                    linkedFilter={linked}
                                    availableFilters={primaryFilters}
                                    onPrimaryChange={(updated) => onPrimaryChange(primary.id, updated)}
                                    onLinkedChange={(updated) => onLinkedChange(linked.id, updated)}
                                    onDelete={() => onDelete(primary.id)}
                                    onTogglePrimaryEnabled={() => onToggleEnabled(primary.id)}
                                    onFilterTypeChange={(oldFilterId, newFilterId) => onFilterTypeChange(primary.id, oldFilterId, newFilterId)}
                                />
                            ) : (
                                <FilterInput
                                    filter={primary}
                                    availableFilters={primaryFilters}
                                    onChange={(updated) => onPrimaryChange(primary.id, updated)}
                                    onDelete={() => onDelete(primary.id)}
                                    onToggleEnabled={() => onToggleEnabled(primary.id)}
                                    onFilterTypeChange={(oldFilterId, newFilterId) => onFilterTypeChange(primary.id, oldFilterId, newFilterId)}
                                />
                            )}
                        </Box>

                        {!isLastGroup && (
                            <FilterOperator
                                operator={logicalOperator}
                                onClick={onToggleLogicalOperator}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </>
    );
};