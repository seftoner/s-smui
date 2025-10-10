import React from 'react';
import { Box } from '@mui/material';
import { FilterBar } from '../../components';
import type { ActiveFilter } from '../../components/filters/types';

export const SearchApp: React.FC = () => {
    const handleApplyFilters = (filters: ActiveFilter[], operator: 'and' | 'or') => {
        console.log('Applying filters:', filters, 'with operator:', operator);
        // Here you would apply the filters to your search results
    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                p: 2,
                width: 400
            }}
        >
            <FilterBar onApply={handleApplyFilters} />
        </Box>
    );
};

export default SearchApp;