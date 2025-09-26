import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface EmptyStateProps {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    icon,
    title,
    description,
    action,
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '300px',
                textAlign: 'center',
                gap: 2,
                p: 3,
            }}
        >
            {icon && (
                <Box sx={{ color: 'text.secondary', mb: 2 }}>
                    {icon}
                </Box>
            )}
            <Typography variant="h6" color="text.primary" gutterBottom>
                {title}
            </Typography>
            {description && (
                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400 }}>
                    {description}
                </Typography>
            )}
            {action && (
                <Button
                    variant="contained"
                    onClick={action.onClick}
                    sx={{ mt: 2 }}
                >
                    {action.label}
                </Button>
            )}
        </Box>
    );
};

export default EmptyState;