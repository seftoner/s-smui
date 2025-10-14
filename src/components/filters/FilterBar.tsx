import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Box, Button, IconButton, Typography, Paper } from '@mui/material';
import { TextIndentIcon, TrashIcon, PlusIcon } from '@phosphor-icons/react';
import { useMachine } from '@xstate/react';
import { FilterInput } from './FilterInput';
import { LinkedFilterInput } from './LinkedFilterInput';
import { FilterOperator } from './FilterOperator';
import { FilterEmptyState } from './FilterEmptyState';
import type { ActiveFilter, FilterDefinition } from './types';
import { fetchFilterDefinitions, getDefaultOperator, getPrimaryFilterDefinitions, getFilterDefinition } from './filterConfigService';
import { filterPanelMachine } from './filterPanelMachine';
import { calculateCanApply, getFilterGroups } from './filterUtils';
import { useOverflowDetection } from '../../hooks/useOverflowDetection';

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
    const pendingLinkedFilterRef = React.useRef<{ filterId: string; linkedFilterId: string } | null>(null);

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

    const { containerRef: scrollableRef, isOverflowing, evaluateOverflow } = useOverflowDetection();

    // New function to handle adding an empty filter (for button click)
    const handleAddEmptyFilter = useCallback(() => {
        const newFilter: ActiveFilter = {
            id: `filter-${Date.now()}`,
            value: '',
            enabled: true,
        };

        send({ type: 'ADD_FILTER', filter: newFilter });

        // Auto-scroll to bottom after adding filter (with slight delay to ensure DOM update)
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
    }, [send, evaluateOverflow]);

    const handleDeleteFilter = (filterId: string) => {
        const filter = state.context.filters.find(f => f.id === filterId);
        if (!filter) return;

        // Delete the filter
        send({ type: 'DELETE_FILTER', id: filterId });

        // If this filter has a linked filter, delete it too
        if (filter.linkedFilterId) {
            send({ type: 'DELETE_FILTER', id: filter.linkedFilterId });
        }
    };

    const handleFilterTypeChange = (filterId: string, oldFilterId: string, newFilterId: string) => {
        const filter = state.context.filters.find(f => f.id === filterId);
        if (!filter) return;

        const oldFilterDef = oldFilterId ? getFilterDefinition(oldFilterId) : null;
        const newFilterDef = getFilterDefinition(newFilterId);

        if (!newFilterDef) return;

        const removeLinkedFilter = (linkedFilterId?: string) => {
            if (!linkedFilterId) return;
            send({ type: 'DELETE_FILTER', id: linkedFilterId });
        };

        const createAndAttachLinkedFilter = (primaryId: string, linkedFilterTargetId: string) => {
            const linkedFilterDef = getFilterDefinition(linkedFilterTargetId);
            if (!linkedFilterDef) {
                return;
            }

            const linkedDefaultOperator = getDefaultOperator(linkedFilterDef.id);
            if (!linkedDefaultOperator) {
                return;
            }

            const linkedFilter: ActiveFilter = {
                id: `filter-${Date.now()}-linked`,
                filterId: linkedFilterDef.id,
                operator: linkedDefaultOperator.id,
                value: linkedFilterDef.valueType === 'multi-select' ? [] : '',
                enabled: false, // Start disabled until primary has value
            };

            send({ type: 'ADD_FILTER', filter: linkedFilter });
            pendingLinkedFilterRef.current = {
                filterId: primaryId,
                linkedFilterId: linkedFilter.id
            };
        };

        // Check if we're switching from a filter with linked to one without, or vice versa
        const hadLinkedFilter = oldFilterDef?.linkedFilter !== undefined;
        const hasLinkedFilter = newFilterDef.linkedFilter !== undefined;

        // Case 1: Old filter had a linked filter, new one doesn't - delete the linked filter
        if (hadLinkedFilter && !hasLinkedFilter && filter.linkedFilterId) {
            removeLinkedFilter(filter.linkedFilterId);
        }

        // Case 2: New filter has a linked filter but old one didn't (including empty filters) - create the linked filter
        else if (!hadLinkedFilter && hasLinkedFilter && newFilterDef.linkedFilter) {
            createAndAttachLinkedFilter(filter.id, newFilterDef.linkedFilter.filterId);
        }

        // Case 3: Both have linked filters - replace the old linked filter with a new one
        else if (hadLinkedFilter && hasLinkedFilter && filter.linkedFilterId && newFilterDef.linkedFilter) {
            const oldLinkedFilterId = filter.linkedFilterId;

            // Delete old linked filter
            removeLinkedFilter(oldLinkedFilterId);
            createAndAttachLinkedFilter(filter.id, newFilterDef.linkedFilter.filterId);
        }
    };

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
                {!hasFilters && (
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
                                                onPrimaryChange={(updated) => send({ type: 'UPDATE_FILTER', id: primary.id, filter: updated })}
                                                onLinkedChange={(updated) => send({ type: 'UPDATE_FILTER', id: linked.id, filter: updated })}
                                                onDelete={() => handleDeleteFilter(primary.id)}
                                                onTogglePrimaryEnabled={() => send({ type: 'TOGGLE_FILTER_ENABLED', id: primary.id })}
                                                onFilterTypeChange={(oldFilterId, newFilterId) => handleFilterTypeChange(primary.id, oldFilterId, newFilterId)}
                                            />
                                        ) : (
                                            <FilterInput
                                                filter={primary}
                                                availableFilters={primaryFilters}
                                                onChange={(updated) => send({ type: 'UPDATE_FILTER', id: primary.id, filter: updated })}
                                                onDelete={() => handleDeleteFilter(primary.id)}
                                                onToggleEnabled={() => send({ type: 'TOGGLE_FILTER_ENABLED', id: primary.id })}
                                                onFilterTypeChange={(oldFilterId, newFilterId) => handleFilterTypeChange(primary.id, oldFilterId, newFilterId)}
                                            />
                                        )}
                                    </Box>

                                    {!isLastGroup && (
                                        <FilterOperator
                                            operator={state.context.logicalOperator}
                                            onClick={() => send({ type: 'TOGGLE_LOGICAL_OPERATOR' })}
                                        />
                                    )}
                                </React.Fragment>
                            );
                        })}

                        {/* Add Filter Button - Normal Addition: appears below filters when no overflow */}
                        {!isOverflowing && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', px: 2, py: 1 }}>
                                <AddFilterButton onClick={handleAddEmptyFilter} />
                            </Box>
                        )}
                    </>
                )}
            </Box>

            {/* Sticky Add Filter Button - Overflow State: always visible when overflowing */}
            {hasFilters && isOverflowing && (
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
