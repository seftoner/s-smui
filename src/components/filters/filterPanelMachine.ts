import { setup, assign } from 'xstate';
import type { ActiveFilter } from './types';
import { calculateCanApply } from './filterUtils';

export type LogicalOperator = 'and' | 'or';

interface FilterPanelContext {
    filters: ActiveFilter[];
    logicalOperator: LogicalOperator;
}

type FilterPanelEvent =
    | { type: 'ADD_FILTER'; filter: ActiveFilter }
    | { type: 'UPDATE_FILTER'; id: string; filter: ActiveFilter }
    | { type: 'DELETE_FILTER'; id: string }
    | { type: 'TOGGLE_FILTER_ENABLED'; id: string }
    | { type: 'TOGGLE_LOGICAL_OPERATOR' }
    | { type: 'APPLY_FILTERS' }
    | { type: 'CLEAR_FILTERS' };

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
    },
    states: {
        idle: {
            on: {
                ADD_FILTER: {
                    actions: assign({
                        filters: ({ context, event }) => [...context.filters, event.filter],
                    }),
                },
                UPDATE_FILTER: {
                    actions: assign({
                        filters: ({ context, event }) =>
                            context.filters.map(f => f.id === event.id ? event.filter : f),
                    }),
                },
                DELETE_FILTER: {
                    actions: assign({
                        filters: ({ context, event }) =>
                            context.filters.filter(f => f.id !== event.id),
                    }),
                },
                TOGGLE_FILTER_ENABLED: {
                    actions: assign({
                        filters: ({ context, event }) =>
                            context.filters.map(f =>
                                f.id === event.id ? { ...f, enabled: !f.enabled } : f
                            ),
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
