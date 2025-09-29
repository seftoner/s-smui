import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

// Figma Design System Color Palette - Light Mode
const lightPalette = {
  primary: {
    main: '#3b6bf6',
    dark: '#163bf5',
    light: '#6196f8',
    contrastText: '#f7f7f7',
    // State colors from Figma
    states: {
      hover: '#286cff0f',
      selected: '#286cff1a',
      focus: '#286cff1f',
      focusVisible: '#286cff80',
      outlinedBorder: '#286cff80',
    },
  },
  secondary: {
    main: '#232528',
    dark: '#1b1d21',
    light: '#3e4045',
    contrastText: '#ffffff',
    // State colors from Figma
    states: {
      hover: '#2325280f',
      selected: '#23252814',
      focus: '#23252814',
      focusVisible: '#23252880',
      outlinedBorder: '#8a8b8d',
    },
  },
  error: {
    main: '#d83731',
    dark: '#95231f',
    light: '#f47a75',
    contrastText: '#ffffff',
    // State colors from Figma
    states: {
      hover: '#d32f2f0a',
      selected: '#d32f2f14',
      focusVisible: '#d32f2f4d',
      outlinedBorder: '#d32f2f80',
    },
  },
  warning: {
    main: '#ef6c00',
    dark: '#e65100',
    light: '#ff9800',
    contrastText: '#ffffff',
    // State colors from Figma
    states: {
      hover: '#ef6c000a',
      selected: '#ef6c0014',
      focusVisible: '#ef6c004d',
      outlinedBorder: '#ef6c0080',
    },
  },
  info: {
    main: '#0073ab',
    dark: '#224f71',
    light: '#00abeb',
    contrastText: '#ffffff',
    // State colors from Figma
    states: {
      hover: '#0288d10a',
      selected: '#0288d114',
      focusVisible: '#0288d14d',
      outlinedBorder: '#0288d180',
    },
  },
  success: {
    main: '#3f8e50',
    dark: '#24432b',
    light: '#a0d5ab',
    contrastText: '#ffffff',
    // State colors from Figma
    states: {
      hover: '#2e7d320a',
      selected: '#2e7d3214',
      focusVisible: '#2e7d324d',
      outlinedBorder: '#2e7d3280',
    },
  },
  background: {
    default: '#ffffff',
    paper: '#ffffff',
    surface_0: '#f2f2f2',
    surface_1: '#f7f7f7',
    surface_2: '#fcfcfc',
    surface_3: '#ffffff',
    surface_ai_1: '#ffffff',
    surface_ai_2: '#f9f9f9',
    // Background state colors from Figma
    states: {
      selected: '#c1e8fd',
      hover: '#def3ff',
      focusOutlined: '#def3ff',
      disabled: '#e1e3e5',
    },
  },
  text: {
    primary: '#1b1d21',
    secondary: '#1b1d21b2',
    disabled: '#1b1d214d',
    link: '#3b6bf6',
    // Text state colors from Figma
    states: {
      hover: '#1b1d210a',
      selected: '#1b1d2114',
      focus: '#1b1d211f',
      focusVisible: '#1b1d214d',
    },
  },
  divider: '#1b1d211f',
    
  action: {
    active: '#0e0f1299',
    hover: '#0e0f120d',
    hoverOpacity: 0.08,
    selected: '#0e0f1226',
    selectedOpacity: 0.15,
    disabled: '#0e0f1261',
    disabledOpacity: 0.38,
    disabledBackground: '#0e0f121a',
    focus: '#0e0f1233',
    focusOpacity: 0.20,
    activatedOpacity: 0.60,
  },
  
  // Component-specific colors from Figma tokens
  components: {
    listItem: {
      iconEnabled: '#4c4f57',
      iconDisabled: '#c3c6ca',
    },
    chip: {
      hover: '#effaff',
      focused: '#def3ff',
      disabled: '#f7f7f7',
      pressed: '#def3ff',
      filled: {
        default: '#e1e3e5',
        hovered: '#effaff',
        focus: '#effaff',
      },
      outline: {
        enabled: '#c3c6ca',
        hovered: '#2ccaff',
        focused: '#3b6bf6',
        disabled: '#f7f7f7',
        pressed: '#0090d4',
      },
      workStatus: {
        todo: '#e1e3e5',
        inProgress: '#f1ecd2',
      },
      filterOperator: {
        or: '#ffcc80',
        and: '#c1e8fd',
      },
    },
    alert: {
      warning: {
        color: '#6c4527',
        background: '#f9f7ee',
      },
      info: {
        color: '#224f71',
        background: '#def3ff',
      },
      success: {
        color: '#24432b',
        background: '#e4f4e7',
      },
      error: {
        color: '#95231f',
        background: '#fef2f2',
      },
    },
    avatar: {
      fill: '#7a7e85',
      error: {
        color: '#95231f',
        background: '#fdeded',
      },
    },
    input: {
      enabled: '#e1e3e5',
      hover: '#6196f8',
      background: '#ffffff',
    },
    switch: {
      knobFillEnabled: '#f7f7f7',
      slideFill: '#000000',
      knobFillDisabled: '#e1e3e5',
    },
    fab: {
      activeStroke: '#00000061',
    },
    rating: {
      enabled: '#0000003b',
      active: '#ffb400',
    },
    snackbar: {
      fill: '#3e4045',
    },
    tooltip: {
      fill: '#3e4045',
    },
    backdrop: {
      fill: '#00000080',
    },
    appbar: {
      default: '#e1e3e5',
    },
    breadcrumbs: {
      collapse: '#e1e3e5',
    },
    stepper: {
      connector: '#7a7e85',
    },
    taskCard: {
      enabled: '#e1e3e5',
    },
    icon: {
      default: '#232528',
    },
    attachmentCard: {
      hover: '#286cff0f',
      selected: '#286cff1a',
    },
    scrollbar: {
      default: '#c3c6ca',
      hover: '#7a7e85',
    },
    elevation: {
      outlined: '#e0e0e0',
      inputShadow: '#9670261f',
      inputShadow2: '#a67e301a',
      inputShadow3: '#644b1b14',
    },
  },
  
  // Common color states from Figma
  common: {
    black: {
      main: '#000000',
    },
    white: {
      main: '#ffffff',
    },
  },

};

// Figma Design System Color Palette - Dark Mode
const darkPalette = {
  primary: {
    main: '#81c1ff',
    dark: '#6196f8',
    light: '#d8ecfd',
    contrastText: '#1b1d21',
    // State colors from Figma
    states: {
      hover: '#6196f80f',
      selected: '#6196f829',
      focus: '#6196f81f',
      focusVisible: '#6196f880',
      outlinedBorder: '#6196f880',
    },
  },
  secondary: {
    main: '#c3c6ca',
    dark: '#9fa2a8',
    light: '#f7f7f7',
    contrastText: '#000000',
    // State colors from Figma
    states: {
      hover: '#6196f80f',
      selected: '#89acff29',
      focus: '#89acff14',
      focusVisible: '#6b6c70',
      outlinedBorder: '#6b6c70',
    },
  },
  error: {
    main: '#d83731',
    dark: '#b52520',
    light: '#faaaa7',
    contrastText: '#ffffff',
    // State colors from Figma
    states: {
      hover: '#f4433614',
      selected: '#f4433629',
      focusVisible: '#f443364d',
      outlinedBorder: '#f4433680',
    },
  },
  warning: {
    main: '#e65100',
    dark: '#e65100',
    light: '#ffb74d',
    contrastText: '#ffffff',
    // State colors from Figma
    states: {
      hover: '#ffa72614',
      selected: '#ffa72629',
      focusVisible: '#ffa7264d',
      outlinedBorder: '#ffa72680',
    },
  },
  info: {
    main: '#00608d',
    dark: '#14324b',
    light: '#2ccaff',
    contrastText: '#ffffff',
    // State colors from Figma
    states: {
      hover: '#29b6f614',
      selected: '#29b6f629',
      focusVisible: '#29b6f64d',
      outlinedBorder: '#29b6f680',
    },
  },
  success: {
    main: '#3f8e50',
    dark: '#24432b',
    light: '#a0d5ab',
    contrastText: '#ffffff',
    // State colors from Figma
    states: {
      hover: '#66bb6a14',
      selected: '#66bb6a29',
      focusVisible: '#66bb6a4d',
      outlinedBorder: '#66bb6a80',
    },
  },
  background: {
    default: '#232529',
    paper: '#232529',
    surface_0: '#121317',
    surface_1: '#131416',
    surface_2: '#1c1e21',
    surface_3: '#232529',
    surface_ai_1: '#212121',
    surface_ai_2: '#181818',
    // Background state colors from Figma
    states: {
      selected: '#5d3b26',
      hover: '#6c4527',
      focusOutlined: '#232528',
      disabled: '#232528',
    },
  },
  text: {
    primary: '#f7f7f7',
    secondary: '#f7f7f7b2',
    disabled: '#f7f7f761',
    link: '#81c1ff',
    // Text state colors from Figma
    states: {
      hover: '#f7f7f714',
      selected: '#f7f7f729',
      focus: '#f7f7f71f',
      focusVisible: '#f7f7f74d',
    },
  },
  divider: '#ffffff1f',
  action: {
    active: '#ffffff99',
    hover: '#ffffff0d',
    selected: '#ffffff26',
    focus: '#ffffff33',
    focusStroke: '#ffffff33',
    disabled: '#ffffff61',
    disabledBackground: '#ffffff1a',
  },
  
  // Component-specific colors from Figma tokens - Dark Mode
  components: {
    listItem: {
      iconEnabled: '#c3c6ca',
      iconDisabled: '#4c4f57',
    },
    chip: {
      hover: '#3e4045',
      focused: '#3e4045',
      disabled: '#4c4f57',
      pressed: '#232528',
      filled: {
        default: '#4c4f57',
        hovered: '#ffffff33',
        focus: '#ffffff40',
      },
      outline: {
        enabled: '#7a7e85',
        hovered: '#163bf5',
        focused: '#81c1ff',
        disabled: '#4c4f57',
        pressed: '#60646c',
      },
      workStatus: {
        todo: '#3e4045',
        inProgress: '#5d3b26',
      },
      filterOperator: {
        or: '#6f3a1a',
        and: '#00608d',
      },
    },
    alert: {
      warning: {
        color: '#e2c58c',
        background: '#361e12',
      },
      info: {
        color: '#c1e8fd',
        background: '#14324b',
      },
      success: {
        color: '#cae8cf',
        background: '#0f2415',
      },
      error: {
        color: '#faaaa7',
        background: '#430e0c',
      },
    },
    avatar: {
      fill: '#4c4f57',
      error: {
        color: '#f4c7c7',
        background: '#160b0b',
      },
    },
    input: {
      enabled: '#60646c',
      hover: '#d8ecfd',
      background: '#232529',
    },
    switch: {
      knobFillEnabled: '#9fa2a8',
      slideFill: '#ffffff61',
      knobFillDisabled: '#4c4f57',
    },
    fab: {
      activeStroke: '#9fa2a8',
    },
    rating: {
      enabled: '#ffffff3b',
      active: '#ffb400',
    },
    snackbar: {
      fill: '#2c2c2c',
    },
    tooltip: {
      fill: '#f7f7f7',
    },
    backdrop: {
      fill: '#00000080',
    },
    appbar: {
      default: '#131416',
    },
    breadcrumbs: {
      collapse: '#4c4f57',
    },
    stepper: {
      connector: '#4c4f57',
    },
    taskCard: {
      enabled: '#232528',
    },
    icon: {
      default: '#f7f7f7',
    },
    attachmentCard: {
      hover: '#ffffff0d',
      selected: '#6196f829',
    },
    scrollbar: {
      default: '#60646c',
      hover: '#9fa2a8',
    },
    elevation: {
      outlined: '#ffffff1f',
      inputShadow: '#05063680',
      inputShadow2: '#08112780',
      inputShadow3: '#00000014',
    },
  },
  
  // Common color states from Figma - Dark Mode
  common: {
    black: {
      main: '#000000',
      states: {
        hover: '#00000014',
        selected: '#00000029',
        focus: '#0000001f',
        focusVisible: '#0000004d',
        outlinedBorder: '#00000080',
      },
    },
    white: {
      main: '#ffffff',
      states: {
        hover: '#ffffff14',
        selected: '#ffffff29',
        focus: '#ffffff1f',
        focusVisible: '#ffffff4d',
        outlinedBorder: '#ffffff80',
      },
    },
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
          boxShadow: '0px 2px 4px rgba(59, 107, 246, 0.12)',
        },
      },
      outlined: {
        borderColor: 'rgba(59, 107, 246, 0.5)',
        '&:hover': {
          borderColor: '#3b6bf6',
          backgroundColor: 'rgba(59, 107, 246, 0.06)',
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
      root: ({ theme }: { theme: any }) => ({
        '& .MuiOutlinedInput-root': {
          borderRadius: 8, // cornerRadius-2
          '& fieldset': {
            borderColor: theme.palette.components?.input.enabled,
          },
          '&:hover fieldset': {
            borderColor: theme.palette.primary.light
          },
          '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
          },
          '&.Mui-disabled fieldset': {
            borderColor: theme.palette.action.disabled,
          },
        },
      }),
    },
  },
  MuiChip: {
    styleOverrides: {
      root: ({ theme }: { theme: any }) => ({
        borderRadius: 16, // cornerRadius-3
        fontSize: '0.875rem',
        height: 32,
        '&:hover': {
          backgroundColor: theme.palette.components?.chip.hover,
        },
        '&.Mui-focusVisible': {
          backgroundColor: theme.palette.components?.chip.focused,
        },
        '&.Mui-disabled': {
          backgroundColor: theme.palette.components?.chip.disabled,
        },
      }),
      filled: ({ theme }: { theme: any }) => ({
        backgroundColor: theme.palette.grey[300],
        '&:hover': {
          backgroundColor: theme.palette.components?.chip.filled.hovered,
        },
        '&.Mui-focusVisible': {
          backgroundColor: theme.palette.components?.chip.filled.focus,
        },
      }),
      outlined: ({ theme }: { theme: any }) => ({
        borderColor: theme.palette.components?.chip.outline.enabled,
        '&:hover': {
          borderColor: theme.palette.components?.chip.outline.hovered,
        },
        '&.Mui-focusVisible': {
          borderColor: theme.palette.components?.chip.outline.focused,
        },
        '&.Mui-disabled': {
          borderColor: theme.palette.components?.chip.outline.disabled,
        },
      }),
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: ({ theme }: { theme: any }) => ({
        minWidth: 32,
        color: theme.palette.components?.listItem.iconEnabled,
      }),
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: ({ theme }: { theme: any }) => ({
        borderRadius: 8, // cornerRadius-2
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
        '&.Mui-selected': {
          backgroundColor: theme.palette.action.selected,
          '&:hover': {
            backgroundColor: theme.palette.action.selected,
          },
        },
        '&.Mui-focusVisible': {
          backgroundColor: theme.palette.action.focus,
          outline: `2px solid ${theme.palette.primary.main}`,
        },
        '&.Mui-disabled': {
          backgroundColor: theme.palette.action.disabledBackground,
          color: theme.palette.action.disabled,
        },
      }),
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
      standardWarning: ({ theme }: { theme: any }) => ({
        backgroundColor: theme.palette.components?.alert.warning.background,
        color: theme.palette.components?.alert.warning.color,
      }),
      standardInfo: ({ theme }: { theme: any }) => ({
        backgroundColor: theme.palette.components?.alert.info.background,
        color: theme.palette.components?.alert.info.color,
      }),
      standardSuccess: ({ theme }: { theme: any }) => ({
        backgroundColor: theme.palette.components?.alert.success.background,
        color: theme.palette.components?.alert.success.color,
      }),
      standardError: ({ theme }: { theme: any }) => ({
        backgroundColor: theme.palette.components?.alert.error.background,
        color: theme.palette.components?.alert.error.color,
      }),
    },
  },
  MuiFab: {
    styleOverrides: {
      root: {
        boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: ({ theme }: { theme: any }) => ({
        backgroundColor: theme.palette.components?.tooltip.fill,
        color: theme.palette.primary.contrastText,
      }),
      arrow: ({ theme }: { theme: any }) => ({
        color: theme.palette.components?.tooltip.fill,
      }),
    },
  },
};

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