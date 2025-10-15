import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Box, Button, IconButton, Typography, Paper } from '@mui/material';
import { TextIndentIcon, TrashIcon, PlusIcon } from '@phosphor-icons/react';
import { useMachine } from '@xstate/react';
import { FilterList } from './FilterList';
import { FilterEmptyState } from './FilterEmptyState';
import type { ActiveFilter, FilterDefinition } from './types';
import { fetchFilterDefinitions, getPrimaryFilterDefinitions, getFilterDefinition } from './filterConfigService';
import { filterPanelMachine } from './filterPanelMachine';
import { calculateCanApply, getFilterGroups } from './filterUtils';
import { createLinkedFilterOperations } from './linkedFilterService';
import { useOverflowDetection, useAddFilterPlacement } from '../../hooks';

interface FilterBarProps {
    onApply?: (filters: ActiveFilter[], operator: 'and' | 'or') => void;
}

const AddFilterButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <Button
        startIcon={<PlusIcon size={16} />}
        onClick={onClick}
    >
        Add filter
    </Button>
);

export const FilterBar: React.FC<FilterBarProps> = ({ onApply }) => {
    const [primaryFilters, setPrimaryFilters] = useState<FilterDefinition[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [state, send] = useMachine(filterPanelMachine);

    // Use our custom hooks
    const { containerRef: scrollableRef, isOverflowing, evaluateOverflow } = useOverflowDetection();

    // Filter actions logic (moved from useFilterActions hook)
    const pendingLinkedFilterRef = useRef<{ filterId: string; linkedFilterId: string } | null>(null);
    const linkedFilterOps = createLinkedFilterOperations();

    const handleAddEmptyFilter = useCallback(() => {
        const newFilter: ActiveFilter = {
            id: `filter-${Date.now()}`,
            value: '',
            enabled: true,
        };

        send({ type: 'ADD_FILTER', filter: newFilter });

        // Auto-scroll to bottom after adding filter
        setTimeout(() => {
            const container = scrollableRef.current;
            if (!container) return;

            const shouldScroll = evaluateOverflow();
            if (shouldScroll) {
                container.scrollTo({
                    top: container.scrollHeight,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }, [send, scrollableRef, evaluateOverflow]);

    const handleDeleteFilter = useCallback((filterId: string) => {
        const filter = state.context.filters.find(f => f.id === filterId);
        if (!filter) return;

        send({ type: 'DELETE_FILTER', id: filterId });

        // If this filter has a linked filter, delete it too
        if (filter.linkedFilterId) {
            send({ type: 'DELETE_FILTER', id: filter.linkedFilterId });
        }
    }, [send, state.context.filters]);

    const handleFilterTypeChange = useCallback((filterId: string, oldFilterId: string, newFilterId: string) => {
        const filter = state.context.filters.find(f => f.id === filterId);
        if (!filter) return;

        const newFilterDef = getFilterDefinition(newFilterId);
        if (!newFilterDef) return;

        // Handle linked filter management
        if (linkedFilterOps.shouldRemoveLinkedFilter(oldFilterId || null, newFilterId) && filter.linkedFilterId) {
            send({ type: 'DELETE_FILTER', id: filter.linkedFilterId });
        }
        else if (linkedFilterOps.shouldCreateLinkedFilter(oldFilterId || null, newFilterId) && newFilterDef.linkedFilter) {
            const linkedFilter = linkedFilterOps.createLinkedFilter(newFilterDef.linkedFilter.filterId);
            if (linkedFilter) {
                send({ type: 'ADD_FILTER', filter: linkedFilter });
                pendingLinkedFilterRef.current = {
                    filterId: filter.id,
                    linkedFilterId: linkedFilter.id
                };
            }
        }
        else if (linkedFilterOps.shouldReplaceLinkedFilter(oldFilterId || null, newFilterId) && filter.linkedFilterId && newFilterDef.linkedFilter) {
            // Delete old linked filter
            send({ type: 'DELETE_FILTER', id: filter.linkedFilterId });

            // Create new linked filter
            const linkedFilter = linkedFilterOps.createLinkedFilter(newFilterDef.linkedFilter.filterId);
            if (linkedFilter) {
                send({ type: 'ADD_FILTER', filter: linkedFilter });
                pendingLinkedFilterRef.current = {
                    filterId: filter.id,
                    linkedFilterId: linkedFilter.id
                };
            }
        }
    }, [send, state.context.filters, linkedFilterOps]);

    const handleUpdateFilter = useCallback((id: string, filter: ActiveFilter) => {
        send({ type: 'UPDATE_FILTER', id, filter });
    }, [send]);

    const handleToggleFilterEnabled = useCallback((id: string) => {
        send({ type: 'TOGGLE_FILTER_ENABLED', id });
    }, [send]);

    // Fetch filter configurations on mount
    useEffect(() => {
        const loadFilters = async () => {
            try {
                await fetchFilterDefinitions();
                setPrimaryFilters(getPrimaryFilterDefinitions());
            } catch (error) {
                console.error('Failed to load filter definitions:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadFilters();
    }, []);

    // Handle pending linked filter updates
    useEffect(() => {
        if (pendingLinkedFilterRef.current) {
            const { filterId, linkedFilterId } = pendingLinkedFilterRef.current;
            const filter = state.context.filters.find(f => f.id === filterId);

            if (filter && filter.linkedFilterId !== linkedFilterId) {
                send({
                    type: 'UPDATE_FILTER',
                    id: filterId,
                    filter: { ...filter, linkedFilterId }
                });
            }

            pendingLinkedFilterRef.current = null;
        }
    }, [state.context.filters, send]);

    const filterGroups = useMemo(
        () => getFilterGroups(state.context.filters),
        [state.context.filters]
    );
    const hasFilters = filterGroups.length > 0;

    // Use add filter placement hook
    const { showInEmptyState, showInline, showSticky } = useAddFilterPlacement({
        hasFilters,
        isOverflowing
    });

    const handleApply = () => {
        send({ type: 'APPLY_FILTERS' });
        if (onApply) {
            onApply(state.context.filters, state.context.logicalOperator);
        }
    };

    const canApply = calculateCanApply(state.context.filters);

    // Check for overflow when filters change
    useEffect(() => {
        evaluateOverflow();
    }, [evaluateOverflow]);

    if (isLoading) {
        return null; // or a loading skeleton
    }

    return (
        <Paper
            elevation={0}
            sx={{
                bgcolor: 'background.surface_2',
                borderRadius: 2,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
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
                ref={scrollableRef}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    flex: 1, // Take up remaining space
                    overflowY: hasFilters ? 'auto' : 'visible', // Scroll when there are filters
                    overflowX: 'hidden',
                    minHeight: 0, // Allow shrinking
                }}
            >
                {/* Empty state with centered add button */}
                {showInEmptyState && (
                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 2,
                            py: 4
                        }}
                    >
                        <FilterEmptyState />
                        <AddFilterButton onClick={handleAddEmptyFilter} />
                    </Box>
                )}

                {/* Filter list when we have filters */}
                {hasFilters && (
                    <>
                        <FilterList
                            filterGroups={filterGroups}
                            primaryFilters={primaryFilters}
                            logicalOperator={state.context.logicalOperator}
                            onPrimaryChange={handleUpdateFilter}
                            onLinkedChange={handleUpdateFilter}
                            onDelete={handleDeleteFilter}
                            onToggleEnabled={handleToggleFilterEnabled}
                            onToggleLogicalOperator={() => send({ type: 'TOGGLE_LOGICAL_OPERATOR' })}
                            onFilterTypeChange={handleFilterTypeChange}
                        />

                        {/* Add Filter Button - Normal Addition: appears below filters when no overflow */}
                        {showInline && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', px: 2, py: 1 }}>
                                <AddFilterButton onClick={handleAddEmptyFilter} />
                            </Box>
                        )}
                    </>
                )}
            </Box>

            {/* Sticky Add Filter Button - Overflow State: always visible when overflowing */}
            {showSticky && (
                <Box sx={{ display: 'flex', justifyContent: 'center', px: 2, py: 1, flexShrink: 0 }}>
                    <AddFilterButton onClick={handleAddEmptyFilter} />
                </Box>
            )}

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
