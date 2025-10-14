import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton, Typography, Paper, Menu, MenuItem } from '@mui/material';
import { PlusIcon, TextIndentIcon, TrashIcon } from '@phosphor-icons/react';
import { useMachine } from '@xstate/react';
import { FilterInput } from './FilterInput';
import { LinkedFilterInput } from './LinkedFilterInput';
import { FilterOperator } from './FilterOperator';
import { FilterEmptyState } from './FilterEmptyState';
import type { ActiveFilter, FilterDefinition } from './types';
import { fetchFilterDefinitions, getDefaultOperator, getPrimaryFilterDefinitions, getFilterDefinition } from './filterConfigService';
import { filterPanelMachine } from './filterPanelMachine';
import { calculateCanApply } from './filterUtils';

interface FilterBarProps {
    onApply?: (filters: ActiveFilter[], operator: 'and' | 'or') => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ onApply }) => {
    const [primaryFilters, setPrimaryFilters] = useState<FilterDefinition[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [state, send] = useMachine(filterPanelMachine);
    const [addFilterAnchor, setAddFilterAnchor] = useState<null | HTMLElement>(null);
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

    const handleAddFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAddFilterAnchor(event.currentTarget);
    };

    const handleAddFilterClose = () => {
        setAddFilterAnchor(null);
    };

    const handleAddFilter = (filterDef: FilterDefinition) => {
        const defaultOperator = getDefaultOperator(filterDef.id);

        if (!defaultOperator) return;

        const newFilter: ActiveFilter = {
            id: `filter-${Date.now()}`,
            filterId: filterDef.id,
            operator: defaultOperator.id,
            value: filterDef.valueType === 'multi-select' ? [] : '',
            enabled: true,
        };

        // If this filter has a linked filter, also create the linked filter
        if (filterDef.linkedFilter) {
            const linkedFilterDef = getFilterDefinition(filterDef.linkedFilter.filterId);
            if (linkedFilterDef) {
                const linkedDefaultOperator = getDefaultOperator(linkedFilterDef.id);
                if (linkedDefaultOperator) {
                    const linkedFilter: ActiveFilter = {
                        id: `filter-${Date.now()}-linked`,
                        filterId: linkedFilterDef.id,
                        operator: linkedDefaultOperator.id,
                        value: linkedFilterDef.valueType === 'multi-select' ? [] : '',
                        enabled: false, // Start disabled until primary has value
                    };

                    // Set the link between filters
                    newFilter.linkedFilterId = linkedFilter.id;

                    // Add both filters
                    send({ type: 'ADD_FILTER', filter: newFilter });
                    send({ type: 'ADD_FILTER', filter: linkedFilter });
                    handleAddFilterClose();
                    return;
                }
            }
        }

        send({ type: 'ADD_FILTER', filter: newFilter });
        handleAddFilterClose();
    };

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

        const oldFilterDef = getFilterDefinition(oldFilterId);
        const newFilterDef = getFilterDefinition(newFilterId);

        if (!newFilterDef) return;

        // Check if we're switching from a filter with linked to one without, or vice versa
        const hadLinkedFilter = oldFilterDef?.linkedFilter !== undefined;
        const hasLinkedFilter = newFilterDef.linkedFilter !== undefined;

        // Case 1: Old filter had a linked filter, new one doesn't - delete the linked filter
        if (hadLinkedFilter && !hasLinkedFilter && filter.linkedFilterId) {
            send({ type: 'DELETE_FILTER', id: filter.linkedFilterId });
        }

        // Case 2: New filter has a linked filter but old one didn't - create the linked filter
        else if (!hadLinkedFilter && hasLinkedFilter && newFilterDef.linkedFilter) {
            const linkedFilterDef = getFilterDefinition(newFilterDef.linkedFilter.filterId);
            if (linkedFilterDef) {
                const linkedDefaultOperator = getDefaultOperator(linkedFilterDef.id);
                if (linkedDefaultOperator) {
                    const linkedFilter: ActiveFilter = {
                        id: `filter-${Date.now()}-linked`,
                        filterId: linkedFilterDef.id,
                        operator: linkedDefaultOperator.id,
                        value: linkedFilterDef.valueType === 'multi-select' ? [] : '',
                        enabled: false, // Start disabled until primary has value
                    };

                    // Add the linked filter
                    send({ type: 'ADD_FILTER', filter: linkedFilter });

                    // Store pending update to link the filters
                    pendingLinkedFilterRef.current = {
                        filterId,
                        linkedFilterId: linkedFilter.id
                    };
                }
            }
        }

        // Case 3: Both have linked filters - replace the old linked filter with a new one
        else if (hadLinkedFilter && hasLinkedFilter && filter.linkedFilterId && newFilterDef.linkedFilter) {
            const oldLinkedFilterId = filter.linkedFilterId;

            // Delete old linked filter
            send({ type: 'DELETE_FILTER', id: oldLinkedFilterId });

            // Create new linked filter
            const linkedFilterDef = getFilterDefinition(newFilterDef.linkedFilter.filterId);
            if (linkedFilterDef) {
                const linkedDefaultOperator = getDefaultOperator(linkedFilterDef.id);
                if (linkedDefaultOperator) {
                    const linkedFilter: ActiveFilter = {
                        id: `filter-${Date.now()}-linked`,
                        filterId: linkedFilterDef.id,
                        operator: linkedDefaultOperator.id,
                        value: linkedFilterDef.valueType === 'multi-select' ? [] : '',
                        enabled: false,
                    };

                    // Add the new linked filter
                    send({ type: 'ADD_FILTER', filter: linkedFilter });

                    // Store pending update to link the filters
                    pendingLinkedFilterRef.current = {
                        filterId,
                        linkedFilterId: linkedFilter.id
                    };
                }
            }
        }
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
                {state.context.filters.map((filter, index) => {
                    // Skip if this is a linked filter (it will be rendered with its primary)
                    const isLinkedFilter = state.context.filters.some(f => f.linkedFilterId === filter.id);
                    if (isLinkedFilter) return null;

                    const hasLinkedFilter = filter.linkedFilterId !== undefined;
                    const linkedFilter = hasLinkedFilter
                        ? state.context.filters.find(f => f.id === filter.linkedFilterId)
                        : undefined;

                    // Calculate if we need an operator after this filter group
                    const nextNonLinkedFilterIndex = state.context.filters.findIndex(
                        (f, i) => i > index && !state.context.filters.some(parent => parent.linkedFilterId === f.id)
                    );
                    const needsOperator = nextNonLinkedFilterIndex !== -1;

                    return (
                        <React.Fragment key={filter.id}>
                            {/* Filter Item or Linked Filter Group */}
                            <Box
                                sx={{
                                    pr: 2,
                                    pl: 4,
                                    py: 1,
                                }}
                            >
                                {hasLinkedFilter && linkedFilter ? (
                                    <LinkedFilterInput
                                        primaryFilter={filter}
                                        linkedFilter={linkedFilter}
                                        availableFilters={primaryFilters}
                                        onPrimaryChange={(updated) => send({ type: 'UPDATE_FILTER', id: filter.id, filter: updated })}
                                        onLinkedChange={(updated) => send({ type: 'UPDATE_FILTER', id: linkedFilter.id, filter: updated })}
                                        onDelete={() => handleDeleteFilter(filter.id)}
                                        onTogglePrimaryEnabled={() => send({ type: 'TOGGLE_FILTER_ENABLED', id: filter.id })}
                                        onFilterTypeChange={(oldFilterId, newFilterId) => handleFilterTypeChange(filter.id, oldFilterId, newFilterId)}
                                    />
                                ) : (
                                    <FilterInput
                                        filter={filter}
                                        availableFilters={primaryFilters}
                                        onChange={(updated) => send({ type: 'UPDATE_FILTER', id: filter.id, filter: updated })}
                                        onDelete={() => handleDeleteFilter(filter.id)}
                                        onToggleEnabled={() => send({ type: 'TOGGLE_FILTER_ENABLED', id: filter.id })}
                                        onFilterTypeChange={(oldFilterId, newFilterId) => handleFilterTypeChange(filter.id, oldFilterId, newFilterId)}
                                    />
                                )}
                            </Box>

                            {/* Filter Operator (between filter groups) */}
                            {needsOperator && (
                                <FilterOperator
                                    operator={state.context.logicalOperator}
                                    onClick={() => send({ type: 'TOGGLE_LOGICAL_OPERATOR' })}
                                />
                            )}
                        </React.Fragment>
                    );
                })}
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
                    onClick={handleAddFilterClick}
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

            {/* Add Filter Menu */}
            <Menu
                anchorEl={addFilterAnchor}
                open={Boolean(addFilterAnchor)}
                onClose={handleAddFilterClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                {primaryFilters.map((filterDef) => (
                    <MenuItem
                        key={filterDef.id}
                        onClick={() => handleAddFilter(filterDef)}
                    >
                        {filterDef.name}
                    </MenuItem>
                ))}
            </Menu>

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
