import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton, Typography, Paper } from '@mui/material';
import { PlusIcon, TextIndentIcon, TrashIcon } from '@phosphor-icons/react';
import { useMachine } from '@xstate/react';
import { FilterInput } from './FilterInput';
import { FilterOperator } from './FilterOperator';
import { FilterEmptyState } from './FilterEmptyState';
import type { ActiveFilter, FilterDefinition } from './types';
import { fetchFilterDefinitions, getDefaultOperator } from './filterConfigService';
import { filterPanelMachine } from './filterPanelMachine';
import { calculateCanApply } from './filterUtils';

interface FilterBarProps {
    onApply?: (filters: ActiveFilter[], operator: 'and' | 'or') => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ onApply }) => {
    const [availableFilters, setAvailableFilters] = useState<FilterDefinition[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [state, send] = useMachine(filterPanelMachine);

    // Fetch filter configurations on mount
    useEffect(() => {
        const loadFilters = async () => {
            try {
                const definitions = await fetchFilterDefinitions();
                setAvailableFilters(definitions);
            } catch (error) {
                console.error('Failed to load filter definitions:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadFilters();
    }, []);

    const handleAddFilter = () => {
        if (availableFilters.length === 0) return;

        const firstFilter = availableFilters[0];
        const defaultOperator = getDefaultOperator(firstFilter.id);

        if (!defaultOperator) return;

        const newFilter: ActiveFilter = {
            id: `filter-${Date.now()}`,
            filterId: firstFilter.id,
            operator: defaultOperator.id,
            value: firstFilter.valueType === 'multi-select' ? [] : '',
            enabled: true,
        };

        send({ type: 'ADD_FILTER', filter: newFilter });
    };

    const handleApply = () => {
        send({ type: 'APPLY_FILTERS' });
        if (onApply) {
            onApply(state.context.filters, state.context.logicalOperator);
        }
    };

    const canApply = calculateCanApply(state.context.filters);

    if (isLoading) {
        return null; // or a loading skeleton
    }

    return (
        <Paper
            elevation={0}
            sx={{
                bgcolor: (theme) => theme.palette.background.surface_2,
                borderRadius: 2,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                pb: 2,
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    pl: 4,
                    pr: 1,
                    py: 1,
                    flexShrink: 0, // Don't shrink header
                }}
            >
                <Typography
                    variant="subtitle1">
                    Filters
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {state.context.filters.length > 0 && (
                        <Button
                            size="small"
                            onClick={() => send({ type: 'CLEAR_FILTERS' })}
                            startIcon={<TrashIcon />}
                            variant='text'
                            color='error'
                        >
                            Reset
                        </Button>
                    )}
                    <IconButton size="medium">
                        <TextIndentIcon />
                    </IconButton>
                </Box>
            </Box>

            {/* Scrollable Filters List */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    flex: 1, // Take up remaining space
                    overflowY: 'auto', // Make scrollable
                    overflowX: 'hidden',
                    minHeight: 0, // Allow shrinking
                }}
            >
                {/* Empty state */}
                {state.context.filters.length === 0 && <FilterEmptyState />}

                {/* Filter list */}
                {state.context.filters.map((filter, index) => (
                    <React.Fragment key={filter.id}>
                        {/* Filter Item */}
                        <Box
                            sx={{
                                pr: 2,
                                pl: 4,
                                py: 1,
                            }}
                        >
                            <FilterInput
                                filter={filter}
                                availableFilters={availableFilters}
                                onChange={(updated) => send({ type: 'UPDATE_FILTER', id: filter.id, filter: updated })}
                                onDelete={() => send({ type: 'DELETE_FILTER', id: filter.id })}
                                onToggleEnabled={() => send({ type: 'TOGGLE_FILTER_ENABLED', id: filter.id })}
                            />
                        </Box>

                        {/* Filter Operator (between filters) */}
                        {index < state.context.filters.length - 1 && (
                            <FilterOperator
                                operator={state.context.logicalOperator}
                                onClick={() => send({ type: 'TOGGLE_LOGICAL_OPERATOR' })}
                            />
                        )}
                    </React.Fragment>
                ))}
            </Box>

            {/* Fixed Footer with Add Filter Button */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    px: 2,
                    py: 1,
                    flexShrink: 0,
                }}
            >
                <Button
                    startIcon={<PlusIcon size={16} />}
                    onClick={handleAddFilter}
                    sx={{
                        textTransform: 'none',
                        fontSize: '14px',
                        fontWeight: 500,
                        lineHeight: '24px',
                        color: 'primary.main',
                        py: 1,
                        px: 1,
                        borderRadius: 2,
                        '&:hover': {
                            bgcolor: 'action.hover',
                        },
                    }}
                >
                    Add filter
                </Button>
            </Box>

            {/* Fixed Apply Button */}
            <Box
                sx={{
                    px: 2,
                    py: 2,
                    flexShrink: 0, // Don't shrink apply button
                }}
            >
                <Button
                    fullWidth
                    variant="contained"
                    disabled={!canApply}
                    onClick={handleApply}
                >
                    Apply filter
                </Button>
            </Box>
        </Paper>
    );
};
