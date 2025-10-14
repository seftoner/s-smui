import React from 'react';
import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';

interface FilterSectionProps {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    isClickable?: boolean;
    sx?: SxProps<Theme>;
}

/**
 * Reusable clickable section component with consistent hover effects
 * Used for filter name, operator, and value sections in FilterInput
 */
export const FilterSection: React.FC<FilterSectionProps> = ({
    children,
    onClick,
    isClickable = true,
    sx = {},
}) => {
    return (
        <Box
            onClick={isClickable ? onClick : undefined}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 2,
                py: 1,
                cursor: isClickable ? 'pointer' : 'default',
                '&:hover': isClickable ? {
                    bgcolor: 'action.hover',
                } : {},
                ...sx,
            }}
        >
            {children}
        </Box>
    );
};