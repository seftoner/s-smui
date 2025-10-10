import React from 'react';
import { Box, Typography } from '@mui/material';

interface FilterEmptyStateProps {
    title?: string;
    subtitle?: string;
}

export const FilterEmptyState: React.FC<FilterEmptyStateProps> = ({
    title = "No filters added yet",
    subtitle = "Add filters to refine your search results"
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                px: 3,
                py: 4,
                textAlign: 'center',
            }}
        >
            <Typography
                variant="body2"
                sx={{
                    color: 'text.secondary',
                    mb: 1,
                    fontSize: '14px',
                    fontWeight: 400,
                }}
            >
                {title}
            </Typography>
            <Typography
                variant="caption"
                sx={{
                    color: 'text.disabled',
                    fontSize: '12px',
                    maxWidth: 200,
                    lineHeight: 1.4,
                }}
            >
                {subtitle}
            </Typography>
        </Box>
    );
};