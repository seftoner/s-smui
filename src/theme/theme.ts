import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';
import { lightPalette, darkPalette } from './colors';
import { typography } from './typography';
import { components } from './components';

const themeOptions = (mode: 'light' | 'dark' = 'light'): ThemeOptions => ({
  direction: 'rtl', // Enable RTL direction
  palette: {
    mode,
    ...(mode === 'light' ? lightPalette : darkPalette),
  } as any, // Type assertion to allow custom properties
  typography,
  components,
  spacing: [0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96],
  shape: {
    borderRadius: 3, // Default cornerRadius-2
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 1024,
      lg: 1280,
      xl: 1600,
    },
  },
});

export const createAppTheme = (mode: 'light' | 'dark' = 'light') => createTheme(themeOptions(mode));

// Export default light theme for backwards compatibility
export const theme = createAppTheme('light');

export default theme;