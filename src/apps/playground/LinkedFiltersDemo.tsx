import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { FilterBar } from '../../components/filters';

/**
 * Demo page showing the Linked Filters feature
 * 
 * Try this:
 * 1. Click "Add filter"
 * 2. Notice that both "Country" and "Sub-Country" are added together
 * 3. Select a country (e.g., "UAE")
 * 4. The Sub-Country filter becomes enabled with filtered options
 * 5. Try deleting - only the Country filter has a delete button
 */
export const LinkedFiltersDemo: React.FC = () => {
    const handleApplyFilters = (filters: any[], operator: 'and' | 'or') => {
        console.log('Applied filters:', { filters, operator });
    };

    return (
        <Box sx={{ p: 4, height: '100vh', display: 'flex', gap: 4 }}>
            {/* Left side - Filter Bar */}
            <Box sx={{ width: 400, height: '100%' }}>
                <FilterBar onApply={handleApplyFilters} />
            </Box>

            {/* Right side - Instructions */}
            <Box sx={{ flex: 1 }}>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h5" gutterBottom>
                        Linked Filters Demo
                    </Typography>
                    
                    <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
                        How it works:
                    </Typography>
                    
                    <Typography component="div" variant="body1" sx={{ mb: 2 }}>
                        <ol>
                            <li>Click <strong>"Add filter"</strong> button</li>
                            <li>Both <strong>Country</strong> and <strong>Sub-Country</strong> filters are added automatically</li>
                            <li>Notice the <strong>🔗 chain icon</strong> between them</li>
                            <li>Sub-Country filter is <strong>disabled</strong> (grayed out) initially</li>
                            <li>Select a country value (e.g., "UAE")</li>
                            <li>Sub-Country becomes <strong>enabled</strong> and shows only relevant options</li>
                            <li>Select sub-countries (e.g., "Dubai, Abu Dhabi")</li>
                            <li>Try changing the country - Sub-Country value resets</li>
                        </ol>
                    </Typography>

                    <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
                        Features:
                    </Typography>
                    
                    <Typography component="div" variant="body1">
                        <ul>
                            <li>✅ <strong>Automatic linking</strong>: Adding Country auto-adds Sub-Country</li>
                            <li>✅ <strong>Dynamic filtering</strong>: Sub-Country options filtered by Country selection</li>
                            <li>✅ <strong>Visual indication</strong>: Chain icon shows the relationship</li>
                            <li>✅ <strong>Smart deletion</strong>: Deleting Country removes both filters</li>
                            <li>✅ <strong>Protected child</strong>: Sub-Country cannot be deleted independently</li>
                            <li>✅ <strong>Value reset</strong>: Changing Country resets Sub-Country selection</li>
                            <li>✅ <strong>State management</strong>: Sub-Country disabled until Country has value</li>
                        </ul>
                    </Typography>

                    <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
                        Available Countries & Sub-Countries:
                    </Typography>
                    
                    <Typography component="div" variant="body2" sx={{ fontFamily: 'monospace' }}>
                        <ul>
                            <li><strong>UAE</strong>: Dubai, Abu Dhabi, Sharjah, Ajman</li>
                            <li><strong>USA</strong>: California, Texas, New York, Florida</li>
                            <li><strong>United Kingdom</strong>: England, Scotland, Wales, Northern Ireland</li>
                            <li><strong>Canada</strong>: Ontario, Quebec, British Columbia, Alberta</li>
                        </ul>
                    </Typography>
                </Paper>
            </Box>
        </Box>
    );
};
