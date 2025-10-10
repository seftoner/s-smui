import { setup, assign } from 'xstate';
import type { ActiveFilter } from './types';

export type LogicalOperator = 'and' | 'or';

interface FilterPanelContext {
    filters: ActiveFilter[];
    logicalOperator: LogicalOperator;
    canApply: boolean;
}

type FilterPanelEvent =
    | { type: 'ADD_FILTER'; filter: ActiveFilter }
    | { type: 'UPDATE_FILTER'; id: string; filter: ActiveFilter }
    | { type: 'DELETE_FILTER'; id: string }
    | { type: 'TOGGLE_FILTER_ENABLED'; id: string }
    | { type: 'TOGGLE_LOGICAL_OPERATOR' }
    | { type: 'APPLY_FILTERS' }
    | { type: 'CLEAR_FILTERS' };

// Helper function to calculate if filters can be applied
const calculateCanApply = (filters: ActiveFilter[]): boolean => {
    return filters.some(f => {
        if (!f.enabled) return false;
        if (Array.isArray(f.value)) {
            return f.value.length > 0;
        }
        return Boolean(f.value);
    });
};

export const filterPanelMachine = setup({
    types: {
        context: {} as FilterPanelContext,
        events: {} as FilterPanelEvent,
    },
    guards: {
        hasFilters: ({ context }) => context.filters.length > 0,
        hasValidFilters: ({ context }) => calculateCanApply(context.filters),
    },
}).createMachine({
    id: 'filterPanel',
    initial: 'idle',
    context: {
        filters: [],
        logicalOperator: 'and',
        canApply: false,
    },
    states: {
        idle: {
            on: {
                ADD_FILTER: {
                    actions: assign({
                        filters: ({ context, event }) => [...context.filters, event.filter],
                        canApply: ({ context, event }) => calculateCanApply([...context.filters, event.filter]),
                    }),
                },
                UPDATE_FILTER: {
                    actions: assign({
                        filters: ({ context, event }) =>
                            context.filters.map(f => f.id === event.id ? event.filter : f),
                        canApply: ({ context, event }) => {
                            const updatedFilters = context.filters.map(f => f.id === event.id ? event.filter : f);
                            return calculateCanApply(updatedFilters);
                        },
                    }),
                },
                DELETE_FILTER: {
                    actions: assign({
                        filters: ({ context, event }) =>
                            context.filters.filter(f => f.id !== event.id),
                        canApply: ({ context, event }) => {
                            const updatedFilters = context.filters.filter(f => f.id !== event.id);
                            return calculateCanApply(updatedFilters);
                        },
                    }),
                },
                TOGGLE_FILTER_ENABLED: {
                    actions: assign({
                        filters: ({ context, event }) =>
                            context.filters.map(f =>
                                f.id === event.id ? { ...f, enabled: !f.enabled } : f
                            ),
                        canApply: ({ context, event }) => {
                            const updatedFilters = context.filters.map(f =>
                                f.id === event.id ? { ...f, enabled: !f.enabled } : f
                            );
                            return calculateCanApply(updatedFilters);
                        },
                    }),
                },
                TOGGLE_LOGICAL_OPERATOR: {
                    actions: assign({
                        logicalOperator: ({ context }) => context.logicalOperator === 'and' ? 'or' : 'and',
                    }),
                },
                APPLY_FILTERS: {
                    target: 'applying',
                    guard: 'hasValidFilters',
                },
                CLEAR_FILTERS: {
                    actions: assign({
                        filters: [],
                        logicalOperator: 'and',
                        canApply: false,
                    }),
                },
            },
        },
        applying: {
            after: {
                100: {
                    target: 'idle',
                },
            },
        },
    },
});
