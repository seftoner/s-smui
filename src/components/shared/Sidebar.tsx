import React from 'react';
import { Box, Avatar, Tooltip } from '@mui/material';
import { NavigationItems } from './NavigationItems';
import { useAppTheme } from '../../contexts';

export const Sidebar: React.FC = () => {
    const { currentTheme } = useAppTheme();

    return (
        <Box
            sx={{
                width: 64,
                height: '100%',
                backgroundColor: currentTheme.sidebarBackgroundColor,
                borderRadius: (theme) => theme.shape.borderRadius,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                py: 4,
                pb: 4,
                zIndex: 1200,
                transition: 'background-color 0.6s ease-in-out',
            }}
        >
            {/* Logo/Brand */}
            <Box sx={{ mb: 3 }}>
                <Avatar
                    sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: 'primary.main',
                        fontSize: '1.2rem',
                        fontWeight: 'bold'
                    }}
                >
                    W
                </Avatar>
            </Box>

            {/* Navigation Items */}
            <NavigationItems />

            {/* User Profile at bottom */}
            <Box sx={{ mt: 'auto' }}>
                <Tooltip title="Profile" placement="right">
                    <Avatar
                        sx={{
                            width: 40,
                            height: 40,
                            cursor: 'pointer',
                            '&:hover': {
                                transform: 'scale(1.05)',
                            },
                            transition: 'transform 0.2s ease-in-out',
                        }}
                        src="/api/placeholder/40/40"
                    >
                        U
                    </Avatar>
                </Tooltip>
            </Box>
        </Box>
    );
};