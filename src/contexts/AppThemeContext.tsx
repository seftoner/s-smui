import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface AppTheme {
    sidebarBackgroundColor: string;
    pageBackgroundColor: string;
    isSpecialTheme: boolean;
}

interface AppThemeContextType {
    currentTheme: AppTheme;
}

const AppThemeContext = createContext<AppThemeContextType | undefined>(undefined);

interface AppThemeProviderProps {
    children: ReactNode;
}

export function AppThemeProvider({ children }: AppThemeProviderProps) {
    const location = useLocation();
    // App-specific theme configurations using CSS variables for instant theme switching
    const APP_THEMES: Record<string, AppTheme> = {
        '/chat': {
            // Prefer channel-aware background vars where available; fall back to surface tokens
            sidebarBackgroundColor: 'var(--mui-palette-background-surface_ai_2)',
            pageBackgroundColor: 'var(--mui-palette-background-surface_ai_1)',
            isSpecialTheme: true,
        },
        // Default theme for all other apps
        default: {
            sidebarBackgroundColor: 'var(--mui-palette-background-surface_2)',
            pageBackgroundColor: 'var(--mui-palette-background-surface_0)',
            isSpecialTheme: false,
        },
    };

    // Determine current theme based on route
    const currentTheme = APP_THEMES[location.pathname] || APP_THEMES.default;

    return (
        <AppThemeContext.Provider value={{ currentTheme }}>
            {children}
        </AppThemeContext.Provider>
    );
}

export const useAppTheme = (): AppThemeContextType => {
    const context = useContext(AppThemeContext);
    if (!context) {
        throw new Error('useAppTheme must be used within an AppThemeProvider');
    }
    return context;
};