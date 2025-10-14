import { useCallback, useRef } from 'react';
import type { ActiveFilter } from '../components/filters/types';
import { createLinkedFilterOperations } from '../components/filters/linkedFilterService';
import { getFilterDefinition } from '../components/filters/filterConfigService';

interface UseFilterActionsProps {
  send: (event: any) => void;
  filters: ActiveFilter[];
  scrollableRef: React.RefObject<HTMLDivElement | null>;
  evaluateOverflow: () => boolean;
}

export const useFilterActions = ({ send, filters, scrollableRef, evaluateOverflow }: UseFilterActionsProps) => {
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
    const filter = filters.find(f => f.id === filterId);
    if (!filter) return;

    send({ type: 'DELETE_FILTER', id: filterId });

    // If this filter has a linked filter, delete it too
    if (filter.linkedFilterId) {
      send({ type: 'DELETE_FILTER', id: filter.linkedFilterId });
    }
  }, [send, filters]);

  const handleFilterTypeChange = useCallback((filterId: string, oldFilterId: string, newFilterId: string) => {
    const filter = filters.find(f => f.id === filterId);
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
  }, [send, filters, linkedFilterOps]);

  const handleUpdateFilter = useCallback((id: string, filter: ActiveFilter) => {
    send({ type: 'UPDATE_FILTER', id, filter });
  }, [send]);

  const handleToggleFilterEnabled = useCallback((id: string) => {
    send({ type: 'TOGGLE_FILTER_ENABLED', id });
  }, [send]);

  return {
    pendingLinkedFilterRef,
    handleAddEmptyFilter,
    handleDeleteFilter,
    handleFilterTypeChange,
    handleUpdateFilter,
    handleToggleFilterEnabled,
  };
};