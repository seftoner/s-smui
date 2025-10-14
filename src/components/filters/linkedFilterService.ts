import type { ActiveFilter } from './types';
import { getFilterDefinition, getDefaultOperator } from './filterConfigService';

export interface LinkedFilterOperations {
  createLinkedFilter: (linkedFilterTargetId: string) => ActiveFilter | null;
  shouldCreateLinkedFilter: (oldFilterId: string | null, newFilterId: string) => boolean;
  shouldRemoveLinkedFilter: (oldFilterId: string | null, newFilterId: string) => boolean;
  shouldReplaceLinkedFilter: (oldFilterId: string | null, newFilterId: string) => boolean;
}

export const createLinkedFilterOperations = (): LinkedFilterOperations => {
  const createLinkedFilter = (linkedFilterTargetId: string): ActiveFilter | null => {
    const linkedFilterDef = getFilterDefinition(linkedFilterTargetId);
    if (!linkedFilterDef) return null;

    const linkedDefaultOperator = getDefaultOperator(linkedFilterDef.id);
    if (!linkedDefaultOperator) return null;

    return {
      id: `filter-${Date.now()}-linked`,
      filterId: linkedFilterDef.id,
      operator: linkedDefaultOperator.id,
      value: linkedFilterDef.valueType === 'multi-select' ? [] : '',
      enabled: false, // Start disabled until primary has value
    };
  };

  const shouldCreateLinkedFilter = (oldFilterId: string | null, newFilterId: string): boolean => {
    const oldFilterDef = oldFilterId ? getFilterDefinition(oldFilterId) : null;
    const newFilterDef = getFilterDefinition(newFilterId);
    
    const hadLinkedFilter = oldFilterDef?.linkedFilter !== undefined;
    const hasLinkedFilter = newFilterDef?.linkedFilter !== undefined;
    
    return !hadLinkedFilter && hasLinkedFilter;
  };

  const shouldRemoveLinkedFilter = (oldFilterId: string | null, newFilterId: string): boolean => {
    const oldFilterDef = oldFilterId ? getFilterDefinition(oldFilterId) : null;
    const newFilterDef = getFilterDefinition(newFilterId);
    
    const hadLinkedFilter = oldFilterDef?.linkedFilter !== undefined;
    const hasLinkedFilter = newFilterDef?.linkedFilter !== undefined;
    
    return hadLinkedFilter && !hasLinkedFilter;
  };

  const shouldReplaceLinkedFilter = (oldFilterId: string | null, newFilterId: string): boolean => {
    const oldFilterDef = oldFilterId ? getFilterDefinition(oldFilterId) : null;
    const newFilterDef = getFilterDefinition(newFilterId);
    
    const hadLinkedFilter = oldFilterDef?.linkedFilter !== undefined;
    const hasLinkedFilter = newFilterDef?.linkedFilter !== undefined;
    
    return hadLinkedFilter && hasLinkedFilter;
  };

  return {
    createLinkedFilter,
    shouldCreateLinkedFilter,
    shouldRemoveLinkedFilter,
    shouldReplaceLinkedFilter,
  };
};