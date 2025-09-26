import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { surfaceColors } from '../theme';

interface AppTheme {
    sidebarBackgroundColor: string;
    pageBackgroundColor: string;
    isSpecialTheme: boolean;
}

interface AppThemeContextType {
    currentTheme: AppTheme;
}

const AppThemeContext = createContext<AppThemeContextType | undefined>(undefined);

// App-specific theme configurations
const APP_THEMES: Record<string, AppTheme> = {
    '/chat': {
        sidebarBackgroundColor: surfaceColors.surface.ai_2,
        pageBackgroundColor: surfaceColors.surface.ai_1,
        isSpecialTheme: true,
    },
    // Default theme for all other apps
    default: {
        sidebarBackgroundColor: surfaceColors.surface[2],
        pageBackgroundColor: surfaceColors.surface[0],
        isSpecialTheme: false,
    },
};

interface AppThemeProviderProps {
    children: ReactNode;
}

export const AppThemeProvider: React.FC<AppThemeProviderProps> = ({ children }) => {
    const location = useLocation();

    // Determine current theme based on route
    const currentTheme = APP_THEMES[location.pathname] || APP_THEMES.default;

    // Debug: Log current route and theme
    console.log('Current pathname:', location.pathname);
    console.log('Current theme:', currentTheme);
    console.log('Available themes:', Object.keys(APP_THEMES));

    return (
        <AppThemeContext.Provider value={{ currentTheme }}>
            {children}
        </AppThemeContext.Provider>
    );
};

export const useAppTheme = (): AppThemeContextType => {
    const context = useContext(AppThemeContext);
    if (!context) {
        throw new Error('useAppTheme must be used within an AppThemeProvider');
    }
    return context;
};