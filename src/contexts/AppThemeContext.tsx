import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

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
    const theme = useTheme();

    // App-specific theme configurations using theme palette directly
    const APP_THEMES: Record<string, AppTheme> = {
        '/chat': {
            sidebarBackgroundColor: (theme.palette as any).background.surface_ai_2,
            pageBackgroundColor: (theme.palette as any).background.surface_ai_1,
            isSpecialTheme: true,
        },
        // Default theme for all other apps
        default: {
            sidebarBackgroundColor: (theme.palette as any).background.surface_2,
            pageBackgroundColor: (theme.palette as any).background.surface_0,
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