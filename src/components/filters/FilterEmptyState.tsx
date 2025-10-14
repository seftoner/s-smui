import React from 'react';
import { Box, Typography } from '@mui/material';

interface FilterEmptyStateProps {
    title?: string;
    subtitle?: string;
}

export const FilterEmptyState: React.FC<FilterEmptyStateProps> = ({
    title = "No filters added yet",
    subtitle
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
            }}
        >
            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: subtitle ? 1 : 0 }}
            >
                {title}
            </Typography>
            {subtitle && (
                <Typography
                    variant="caption"
                    color="text.disabled"
                    sx={{ maxWidth: 200, lineHeight: 1.4 }}
                >
                    {subtitle}
                </Typography>
            )}
        </Box>
    );
};