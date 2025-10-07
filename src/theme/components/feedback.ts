import type {} from '@mui/material/themeCssVarsAugmentation';
import type { Theme } from '@mui/material/styles';

// Feedback component overrides
export const feedbackOverrides = {
  MuiAlert: {
    styleOverrides: {
      root: {
        '& .MuiAlertTitle-root': {
          fontFamily: 'Alexandria, Helvetica, Arial, sans-serif',
          fontWeight: 500,
          fontSize: 16,
          lineHeight: 1.5,
          letterSpacing: '0.0094em',
        },
        '& .MuiAlertTitle-root + .MuiAlert-message': {
          paddingTop: 0,
        },
        '& .MuiAlert-message': {
          fontFamily: 'Alexandria, Helvetica, Arial, sans-serif',
          fontWeight: 500,
          fontSize: 14,
          lineHeight: 1.43,
          letterSpacing: '0.0107em',
        },
      },
      standardWarning: () => ({
        backgroundColor: 'var(--mui-palette-components-alert-warning-background)',
        color: 'var(--mui-palette-components-alert-warning-color)',
      }),
      standardInfo: () => ({
        backgroundColor: 'var(--mui-palette-components-alert-info-background)',
        color: 'var(--mui-palette-components-alert-info-color)',
      }),
      standardSuccess: () => ({
        backgroundColor: 'var(--mui-palette-components-alert-success-background)',
        color: 'var(--mui-palette-components-alert-success-color)',
      }),
      standardError: () => ({
        backgroundColor: 'var(--mui-palette-components-alert-error-background)',
        color: 'var(--mui-palette-components-alert-error-color)',
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
      tooltip: ({ theme }: { theme: Theme }) => ({
        backgroundColor: 'var(--mui-palette-components-tooltip-fill)',
        color: theme.vars.palette.primary.contrastText,
        fontFamily: 'Noto Kufi Arabic, Helvetica, Arial, sans-serif',
        fontWeight: 500,
        fontSize: 10,
        lineHeight: 1.4,
        letterSpacing: '0em',
        borderRadius: 4,
        padding: '8px 12px',
        maxWidth: 300,
      }),
      arrow: () => ({
        color: 'var(--mui-palette-components-tooltip-fill)',
      }),
    },
  },
};