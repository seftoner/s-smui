import React from 'react';
import { Box } from '@mui/material';
import { Sidebar } from './Sidebar';
import { useAppTheme } from '../../contexts';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { currentTheme } = useAppTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                width: '100vw',
                backgroundColor: currentTheme.pageBackgroundColor,
                transition: 'background-color 0.6s ease-in-out',
                p: 2,
                boxSizing: 'border-box',
            }}
        >
            <Sidebar />

            <Box
                sx={{
                    flex: 1,
                    height: '100%',
                    ml: 2,
                    overflow: 'auto',
                    backgroundColor: 'transparent',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {children}
            </Box>
        </Box>
    );
};