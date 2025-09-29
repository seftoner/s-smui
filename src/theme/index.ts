// Main theme exports
export { default as theme, createAppTheme } from './theme';
export type { Theme } from '@mui/material/styles';

// Export modular theme parts for advanced usage
export { lightPalette, darkPalette } from './colors';
export { typography } from './typography';
export { components } from './components';

// Import theme augmentations to ensure they are applied
import './theme-augmentations.d.ts';