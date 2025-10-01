import { createTheme } from '@mui/material/styles';
import type { ThemeOptions, Theme } from '@mui/material/styles';
import { lightPalette, darkPalette } from './colors';
import { typography } from './typography';
import { components } from './components';

// Static constants that don't change between themes
const staticSpacing = [0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96];
const staticShape = { borderRadius: 3 };
const staticBreakpoints = {
  values: {
    xs: 0,
    sm: 768,
    md: 1024,
    lg: 1280,
    xl: 1600,
  },
};

// Static shadow definitions (25 entries for elevations 0..24)
const staticShadows = [
  'none',
  '0px 1px 2px rgba(16, 24, 40, 0.04), 0px 1px 3px rgba(16,24,40,0.06)',
  '0px 1px 3px rgba(16, 24, 40, 0.06), 0px 1px 2px rgba(16,24,40,0.08)',
  '0px 2px 4px rgba(16, 24, 40, 0.06), 0px 1px 6px rgba(16,24,40,0.08)',
  '0px 4px 8px rgba(16, 24, 40, 0.06), 0px 2px 6px rgba(16,24,40,0.10)',
  '0px 6px 12px rgba(16, 24, 40, 0.08), 0px 3px 8px rgba(16,24,40,0.12)',
  '0px 8px 16px rgba(16, 24, 40, 0.10), 0px 4px 12px rgba(16,24,40,0.14)',
  '0px 12px 24px rgba(16, 24, 40, 0.12), 0px 6px 16px rgba(16,24,40,0.16)',
  '0px 16px 32px rgba(16, 24, 40, 0.14), 0px 8px 20px rgba(16,24,40,0.18)',
  '0px 24px 48px rgba(16, 24, 40, 0.16), 0px 12px 24px rgba(16,24,40,0.20)',
  '0px 32px 64px rgba(16,24,40,0.18), 0px 16px 32px rgba(16,24,40,0.22)',
  '0px 40px 80px rgba(16,24,40,0.20), 0px 20px 40px rgba(16,24,40,0.24)',
  '0px 48px 96px rgba(16,24,40,0.22), 0px 24px 48px rgba(16,24,40,0.26)',
  '0px 56px 112px rgba(16,24,40,0.24), 0px 28px 56px rgba(16,24,40,0.28)',
  '0px 64px 128px rgba(16,24,40,0.26), 0px 32px 64px rgba(16,24,40,0.30)',
  '0px 72px 144px rgba(16,24,40,0.28), 0px 36px 72px rgba(16,24,40,0.32)',
  '0px 80px 160px rgba(16,24,40,0.30), 0px 40px 80px rgba(16,24,40,0.34)',
  '0px 88px 176px rgba(16,24,40,0.32), 0px 44px 88px rgba(16,24,40,0.36)',
  '0px 96px 192px rgba(16,24,40,0.34), 0px 48px 96px rgba(16,24,40,0.38)',
  '0px 104px 208px rgba(16,24,40,0.36), 0px 52px 104px rgba(16,24,40,0.40)',
  '0px 112px 224px rgba(16,24,40,0.38), 0px 56px 112px rgba(16,24,40,0.42)',
  '0px 120px 240px rgba(16,24,40,0.40), 0px 60px 120px rgba(16,24,40,0.44)',
  '0px 128px 256px rgba(16,24,40,0.42), 0px 64px 128px rgba(16,24,40,0.46)',
  '0px 136px 272px rgba(16,24,40,0.44), 0px 68px 136px rgba(16,24,40,0.48)',
  '0px 144px 288px rgba(16,24,40,0.46), 0px 72px 144px rgba(16,24,40,0.50)',
] as any;

// Theme cache to avoid recreating themes - use WeakMap for better memory management
const themeCache = new Map<'light' | 'dark', Theme>();

const themeOptions = (mode: 'light' | 'dark' = 'light'): ThemeOptions => ({
  direction: 'rtl', // Enable RTL direction
  palette: {
    ...(mode === 'light' ? lightPalette : darkPalette),
  } as any, // Type assertion to allow custom properties
  typography,
  components,
  spacing: staticSpacing,
  shape: staticShape,
  breakpoints: staticBreakpoints,
  shadows: staticShadows,
});

export const createAppTheme = (mode: 'light' | 'dark' = 'light'): Theme => {
  // Check cache first
  const cached = themeCache.get(mode);
  if (cached) {
    console.log(`[Theme] Using cached ${mode} theme`);
    return cached;
  }
  
  // Create new theme only if not cached
  console.log(`[Theme] Creating new ${mode} theme`);
  const theme = createTheme(themeOptions(mode));
  themeCache.set(mode, theme);
  return theme;
};

// Export default light theme for backwards compatibility
export const theme = createAppTheme('light');

export default theme;