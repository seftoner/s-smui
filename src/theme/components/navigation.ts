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
  MuiListItem: {
    styleOverrides: {
      root: ({ theme }: { theme: any }) => ({
        borderRadius: 8, // cornerRadius-2
        '&:hover': {
          backgroundColor: theme.vars.palette.action.hover,
        },
        '&.Mui-selected': {
          backgroundColor: theme.vars.palette.action.selected,
          '&:hover': {
            backgroundColor: theme.vars.palette.action.selected,
          },
        },
        '&.Mui-focusVisible': {
          backgroundColor: theme.vars.palette.action.focus,
          outline: `2px solid ${theme.vars.palette.primary.main}`,
        },
        '&.Mui-disabled': {
          backgroundColor: theme.vars.palette.action.disabledBackground,
          color: theme.vars.palette.action.disabled,
        },
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
  MuiMenuItem: {
    styleOverrides: {
      root: {
        fontFamily: 'Noto Kufi Arabic, Helvetica, Arial, sans-serif',
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 1.5,
        letterSpacing: '0.0094em',
      },
      dense: {
        fontFamily: 'Noto Kufi Arabic, Helvetica, Arial, sans-serif',
        fontWeight: 400,
        fontSize: 14,
        lineHeight: 1.714,
        letterSpacing: '0.0121em',
      },
    },
  },
};