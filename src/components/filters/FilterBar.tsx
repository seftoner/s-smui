import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton, Typography, Paper } from '@mui/material';
import { PlusIcon, TextIndentIcon } from '@phosphor-icons/react';
import { useMachine } from '@xstate/react';
import { FilterInput } from './FilterInput';
import { FilterOperator } from './FilterOperator';
import type { ActiveFilter, FilterDefinition } from './types';
import { fetchFilterDefinitions, getDefaultOperator } from './filterConfigService';
import { filterPanelMachine } from './filterPanelMachine';

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

    const handleFilterChange = (filterId: string, updatedFilter: ActiveFilter) => {
        send({ type: 'UPDATE_FILTER', id: filterId, filter: updatedFilter });
    };

    const handleFilterDelete = (filterId: string) => {
        send({ type: 'DELETE_FILTER', id: filterId });
    };

    const handleFilterToggle = (filterId: string) => {
        send({ type: 'TOGGLE_FILTER_ENABLED', id: filterId });
    };

    const handleToggleOperator = () => {
        send({ type: 'TOGGLE_LOGICAL_OPERATOR' });
    };

    const handleApply = () => {
        send({ type: 'APPLY_FILTERS' });
        if (onApply) {
            onApply(state.context.filters, state.context.logicalOperator);
        }
    };

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
                    pl: 2,
                    pr: 1,
                    py: 1,
                    flexShrink: 0, // Don't shrink header
                }}
            >
                <Typography
                    variant="subtitle1">
                    Filters
                </Typography>
                <IconButton size="medium">
                    <TextIndentIcon />
                </IconButton>
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
                {state.context.filters.map((filter, index) => (
                    <React.Fragment key={filter.id}>
                        {/* Filter Item */}
                        <Box
                            sx={{
                                px: 2,
                                py: 1,
                            }}
                        >
                            <FilterInput
                                filter={filter}
                                availableFilters={availableFilters}
                                onChange={(updated) => handleFilterChange(filter.id, updated)}
                                onDelete={() => handleFilterDelete(filter.id)}
                                onToggleEnabled={() => handleFilterToggle(filter.id)}
                            />
                        </Box>

                        {/* Filter Operator (between filters) */}
                        {index < state.context.filters.length - 1 && (
                            <FilterOperator
                                operator={state.context.logicalOperator}
                                onClick={handleToggleOperator}
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
                    disabled={!state.context.canApply}
                    onClick={handleApply}
                    sx={{
                        textTransform: 'none',
                        fontSize: '14px',
                        fontWeight: 500,
                        lineHeight: '24px',
                        borderRadius: 2,
                        py: 1,
                        bgcolor: state.context.canApply ? 'primary.main' : 'rgba(14, 15, 18, 0.1)',
                        color: state.context.canApply ? 'white' : 'rgba(14, 15, 18, 0.38)',
                        '&:hover': {
                            bgcolor: state.context.canApply ? 'primary.dark' : 'rgba(14, 15, 18, 0.1)',
                        },
                        '&.Mui-disabled': {
                            bgcolor: 'rgba(14, 15, 18, 0.1)',
                            color: 'rgba(14, 15, 18, 0.38)',
                        },
                    }}
                >
                    Apply filter
                </Button>
            </Box>
        </Paper>
    );
};
