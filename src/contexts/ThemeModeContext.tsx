import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider, CssBaseline, useColorScheme } from '@mui/material';
import { theme } from '../theme';

type ThemeMode = 'light' | 'dark';

interface ThemeModeContextValue {
    mode: ThemeMode;
    setMode: (m: ThemeMode) => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(undefined);

// Inner component that uses useColorScheme hook (must be inside ThemeProvider)
const ThemeModeProviderInner: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { mode, setMode: setColorScheme } = useColorScheme();

    const setMode = React.useCallback((newMode: ThemeMode) => {
        setColorScheme(newMode);
    }, [setColorScheme]);

    const contextValue = React.useMemo(() => ({
        mode: (mode || 'light') as ThemeMode,
        setMode,
    }), [mode, setMode]);

    return (
        <ThemeModeContext.Provider value={contextValue}>
            {children}
        </ThemeModeContext.Provider>
    );
};

export const ThemeModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <ThemeProvider theme={theme} defaultMode="light">
            <CssBaseline />
            <ThemeModeProviderInner>
                {children}
            </ThemeModeProviderInner>
        </ThemeProvider>
    );
};

export const useThemeMode = () => {
    const ctx = useContext(ThemeModeContext);
    if (!ctx) throw new Error('useThemeMode must be used inside ThemeModeProvider');
    return ctx;
};
