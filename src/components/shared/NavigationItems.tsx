import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { HouseIcon, MagnifyingGlassIcon, ClipboardTextIcon, FileIcon, ChartBarIcon, ChatCircleIcon, DotsNineIcon } from '@phosphor-icons/react';
import { useNavigate, useLocation } from 'react-router-dom';

const navigationItems = [
    { text: 'Home', icon: <HouseIcon size={24} />, path: '/' },
    { text: 'Search', icon: <MagnifyingGlassIcon size={24} />, path: '/search' },
    { text: 'Task Management', icon: <ClipboardTextIcon size={24} />, path: '/tasks' },
    { text: 'Documents', icon: <FileIcon size={24} />, path: '/documents' },
    { text: 'Variation Centre', icon: <ChartBarIcon size={24} />, path: '/variation' },
    { text: 'AI Chat', icon: <ChatCircleIcon size={24} />, path: '/chat' },
    { text: 'More Apps', icon: <DotsNineIcon size={24} />, path: '/more-apps' },
];

export const NavigationItems: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
            {navigationItems.map((item) => (
                <Tooltip key={item.path} title={item.text} placement="right">
                    <IconButton
                        onClick={() => handleNavigation(item.path)}
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            backgroundColor: isActive(item.path) ? 'primary.main' : 'transparent',
                            color: isActive(item.path) ? 'primary.contrastText' : 'text.primary',
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                backgroundColor: isActive(item.path)
                                    ? 'primary.dark'
                                    : 'action.hover',
                                transform: 'scale(1.05)',
                            },
                            '&:active': {
                                transform: 'scale(0.95)',
                            },
                            ...(isActive(item.path) && {
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            }),
                        }}
                    >
                        {item.icon}
                    </IconButton>
                </Tooltip>
            ))}
        </Box>
    );
};