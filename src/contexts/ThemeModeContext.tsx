import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createAppTheme } from '../theme';

type ThemeMode = 'light' | 'dark';

interface ThemeModeContextValue {
    mode: ThemeMode;
    setMode: (m: ThemeMode) => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(undefined);

export const ThemeModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<ThemeMode>(() => {
        try {
            const stored = localStorage.getItem('appThemeMode');
            return (stored as ThemeMode) || 'light';
        } catch {
            return 'light';
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('appThemeMode', mode);
        } catch { }
    }, [mode]);

    const theme = React.useMemo(() => createAppTheme(mode), [mode]);

    return (
        <ThemeModeContext.Provider value={{ mode, setMode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeModeContext.Provider>
    );
};

export const useThemeMode = () => {
    const ctx = useContext(ThemeModeContext);
    if (!ctx) throw new Error('useThemeMode must be used inside ThemeModeProvider');
    return ctx;
};
