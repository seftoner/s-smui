import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

// Figma Design System Color Palette - Light Mode
const lightPalette = {
  primary: {
    main: '#92722A',
    dark: '#6C4527',
    light: '#CBA344',
    contrastText: '#F7F7F7',
  },
  secondary: {
    main: '#232528',
    dark: '#1B1D21',
    light: '#3E4045',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#D83731',
    dark: '#95231F',
    light: '#F47A75',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#EF6C00',
    contrastText: '#FFFFFF',
  },
  info: {
    main: '#0073AB',
    dark: '#224F71',
    light: '#00ABEB',
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#3F8E50',
    dark: '#24432B',
    light: '#A0D5AB',
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#F2F2F2', // surface_0
    paper: '#FFFFFF',    // surface_3
  },
  text: {
    primary: '#1B1D21',
    secondary: 'rgba(27, 29, 33, 0.7)',
    disabled: 'rgba(27, 29, 33, 0.3)',
  },
  divider: 'rgba(27, 29, 33, 0.12)',
  action: {
    active: 'rgba(14, 15, 18, 0.6)',
    hover: 'rgba(14, 15, 18, 0.05)',
    selected: 'rgba(14, 15, 18, 0.15)',
    focus: 'rgba(14, 15, 18, 0.2)',
    disabled: 'rgba(14, 15, 18, 0.38)',
    disabledBackground: 'rgba(14, 15, 18, 0.1)',
  },
};

// Custom Surface Colors System
const surfaceColors = {
  surface: {
    0: '#F2F2F2', // surface_0 - Default background (lightest)
    1: '#F7F7F7', // surface_1 - Slightly elevated
    2: '#FCFCFC', // surface_2 - More elevated
    3: '#FFFFFF', // surface_3 - Highest elevation (paper)
    4: '#131416', // surface_4 - Dark elevated (for dark mode compatibility)
    5: '#121317', // surface_5 - Darkest surface
    ai_1: '#FFFFFF', // surface_ai_1 - AI specific surface 1
    ai_2: '#F9F9F9', // surface_ai_2 - AI specific surface 2
  },
};

// Figma Design System Typography
const typography = {
  fontFamily: [
    'Noto Kufi Arabic',
    'Helvetica',
    'Arial',
    'sans-serif',
  ].join(','),
  h1: {
    fontFamily: 'Alexandria, Helvetica, Arial, sans-serif',
    fontWeight: 700,
    fontSize: '2.5rem',
    lineHeight: 1.2,
  },
  h2: {
    fontFamily: 'Alexandria, Helvetica, Arial, sans-serif',
    fontWeight: 700,
    fontSize: '2rem',
    lineHeight: 1.3,
  },
  h3: {
    fontFamily: 'Alexandria, Helvetica, Arial, sans-serif',
    fontWeight: 700,
    fontSize: '1.75rem',
    lineHeight: 1.4,
  },
  h4: {
    fontFamily: 'Alexandria, Helvetica, Arial, sans-serif',
    fontWeight: 700,
    fontSize: '1.5rem',
    lineHeight: 1.4,
  },
  h5: {
    fontFamily: 'Alexandria, Helvetica, Arial, sans-serif',
    fontWeight: 700,
    fontSize: '1.25rem',
    lineHeight: 1.5,
  },
  h6: {
    fontFamily: 'Alexandria, Helvetica, Arial, sans-serif',
    fontWeight: 600,
    fontSize: '1.125rem',
    lineHeight: 1.5,
  },
  subtitle1: {
    fontFamily: 'Noto Kufi Arabic, Helvetica, Arial, sans-serif',
    fontWeight: 600,
    fontSize: '1rem',
    lineHeight: 1.75,
  },
  subtitle2: {
    fontFamily: 'Noto Kufi Arabic, Helvetica, Arial, sans-serif',
    fontWeight: 600,
    fontSize: '0.875rem',
    lineHeight: 1.57,
  },
  body1: {
    fontFamily: 'Noto Kufi Arabic, Helvetica, Arial, sans-serif',
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.75, // 175% from Figma
  },
  body2: {
    fontFamily: 'Noto Kufi Arabic, Helvetica, Arial, sans-serif',
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.7, // 170% from Figma
  },
  button: {
    fontFamily: 'Noto Kufi Arabic, Helvetica, Arial, sans-serif',
    fontWeight: 600,
    fontSize: '0.875rem',
    lineHeight: 1.75,
    textTransform: 'none' as const,
  },
  caption: {
    fontFamily: 'Noto Kufi Arabic, Helvetica, Arial, sans-serif',
    fontSize: '0.75rem',
    lineHeight: 1.5, // 150% from Figma
  },
  overline: {
    fontFamily: 'Noto Kufi Arabic, Helvetica, Arial, sans-serif',
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 2.66,
    textTransform: 'uppercase' as const,
  },
};

// Figma Design System Component Overrides
const components = {
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        height: '100%',
        width: '100%',
      },
      body: {
        height: '100%',
        width: '100%',
        margin: 0,
        padding: 0,
      },
      '#root': {
        height: '100%',
        width: '100%',
        display: 'flex',
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8, // cornerRadius-2
        textTransform: 'none' as const,
        fontWeight: 600,
        padding: '12px 24px',
        fontSize: '0.875rem',
      },
      contained: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: '0px 2px 4px rgba(146, 114, 42, 0.12)',
        },
      },
      outlined: {
        borderColor: 'rgba(146, 114, 42, 0.5)',
        '&:hover': {
          borderColor: '#92722A',
          backgroundColor: 'rgba(146, 114, 42, 0.06)',
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 16, // cornerRadius-3
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)',
        border: '1px solid #E1E3E5',
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 8, // cornerRadius-2
      },
      outlined: {
        borderColor: 'rgba(27, 29, 33, 0.12)',
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 8, // cornerRadius-2
          '& fieldset': {
            borderColor: '#E1E3E5',
          },
          '&:hover fieldset': {
            borderColor: '#CBA344',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#92722A',
          },
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 16, // cornerRadius-3
        fontSize: '0.875rem',
        height: 32,
      },
      outlined: {
        borderColor: '#C3C6CA',
        '&:hover': {
          borderColor: '#CBA344',
        },
      },
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: {
        borderRadius: 8, // cornerRadius-2
        '&:hover': {
          backgroundColor: '#F9F7EE',
        },
        '&.Mui-selected': {
          backgroundColor: '#F1ECD2',
          '&:hover': {
            backgroundColor: '#F1ECD2',
          },
        },
      },
    },
  },
  MuiListSubheader: {
    styleOverrides: {
      root: {
        backgroundColor: 'transparent',
        textAlign: 'left' as const,
      },
    },
  },
  MuiAlert: {
    styleOverrides: {
      standardWarning: {
        backgroundColor: '#F9F7EE',
        color: '#6C4527',
      },
      standardInfo: {
        backgroundColor: '#DEF3FF',
        color: '#224F71',
      },
      standardSuccess: {
        backgroundColor: '#E4F4E7',
        color: '#24432B',
      },
      standardError: {
        backgroundColor: '#FEF2F2',
        color: '#95231F',
      },
    },
  },
  MuiFab: {
    styleOverrides: {
      root: {
        boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
      },
    },
  },
};

const themeOptions: ThemeOptions = {
  direction: 'rtl', // Enable RTL direction
  palette: {
    ...lightPalette,
    // Extend palette with custom surface colors
    background: {
      default: surfaceColors.surface[0], // surface_0
      paper: surfaceColors.surface[3],   // surface_3
    },
    // Add surface colors directly to palette
    surface: surfaceColors.surface,
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
};

export const theme = createTheme(themeOptions);

// Export surface colors for direct usage
export { surfaceColors };

export default theme;