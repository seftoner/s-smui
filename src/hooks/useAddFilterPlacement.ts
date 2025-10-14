import { useMemo } from 'react';

export type AddFilterPlacement = 'empty-state' | 'inline' | 'sticky';

interface UseAddFilterPlacementProps {
  hasFilters: boolean;
  isOverflowing: boolean;
}

export const useAddFilterPlacement = ({ hasFilters, isOverflowing }: UseAddFilterPlacementProps) => {
  const placement = useMemo((): AddFilterPlacement => {
    if (!hasFilters) return 'empty-state';
    if (isOverflowing) return 'sticky';
    return 'inline';
  }, [hasFilters, isOverflowing]);

  return {
    placement,
    showInEmptyState: placement === 'empty-state',
    showInline: placement === 'inline',
    showSticky: placement === 'sticky',
  };
};