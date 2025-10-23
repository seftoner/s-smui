import type {} from '@mui/material/themeCssVarsAugmentation';

// Navigation component overrides
export const navigationOverrides = {
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
        color: theme.vars.palette.components?.listItem?.iconEnabled || theme.vars.palette.text.primary,
      }),
    },
  },
  MuiListSubheader: {
    styleOverrides: {
      root: {
        backgroundColor: 'transparent',
        textAlign: 'left' as const,
        fontFamily: 'Noto Kufi Arabic, Helvetica, Arial, sans-serif',
        fontWeight: 500,
        fontSize: 14,
        lineHeight: 3.429,
        letterSpacing: '0.0071em',
      },
    },
  },
};