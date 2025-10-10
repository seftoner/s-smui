import React from 'react';
import { Box, Typography } from '@mui/material';
import type { LogicalOperator } from './filterPanelMachine';
import { ArrowsCounterClockwiseIcon } from '@phosphor-icons/react';

interface FilterOperatorProps {
    operator: LogicalOperator;
    onClick: () => void;
}

export const FilterOperator: React.FC<FilterOperatorProps> = ({ operator, onClick }) => {
    return (
        <Box
            onClick={onClick}
            sx={(theme) => ({
                minHeight: 30,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                px: 6,
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                '&:hover': {
                    bgcolor: theme.vars.palette.action.hover,
                    '& .filter-operator-icon': {
                        opacity: 1,
                    },
                },
                '& .filter-operator-icon': {
                    opacity: 0,
                    transition: 'opacity 0.2s',
                },
            })}
        >
            <Typography
                variant="caption"
                color='text.secondary'
                width={30}
            >
                {operator}
            </Typography>

            <ArrowsCounterClockwiseIcon
                className="filter-operator-icon"
                color="currentColor"
                style={{ color: 'var(--mui-palette-action-active)' }}
            />
        </Box>
    );
};
