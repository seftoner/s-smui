import React from 'react';
import { Box, Avatar, Tooltip, Menu, MenuItem, ListItemIcon, Typography } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import BrightnessAutoIcon from '@mui/icons-material/BrightnessAuto';
import { NavigationItems } from './NavigationItems';
import { useAppTheme } from '../../contexts';
import { useColorScheme } from '@mui/material/styles';

export const Sidebar: React.FC = () => {
    const { currentTheme } = useAppTheme();
    const { mode, setMode } = useColorScheme();

    // Menu state for the profile/avatar menu
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSetMode = (value: 'light' | 'dark' | 'system') => {
        // MUI v7 useColorScheme expects 'light' | 'dark' | 'system'
        setMode(value);
        handleClose();
    };

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
                        onClick={handleOpen}
                        aria-controls={open ? 'profile-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        U
                    </Avatar>
                </Tooltip>

                <Menu
                    id="profile-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                    transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    MenuListProps={{ 'aria-labelledby': 'profile-button' }}
                >
                    <MenuItem onClick={() => handleSetMode('light')} selected={mode === 'light'}>
                        <ListItemIcon>
                            <LightModeIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="body2">Light</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => handleSetMode('dark')} selected={mode === 'dark'}>
                        <ListItemIcon>
                            <DarkModeIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="body2">Dark</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => handleSetMode('system')} selected={mode === 'system'}>
                        <ListItemIcon>
                            <BrightnessAutoIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="body2">System</Typography>
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
    );
};