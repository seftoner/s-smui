// Navigation and list component overrides
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
      root: {
        minWidth: 32,
        color: 'var(--mui-palette-components-listItem-iconEnabled, var(--mui-palette-text-primary))',
      },
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: {
        borderRadius: 8, // cornerRadius-2
        '&:hover': {
          backgroundColor: 'var(--mui-palette-action-hover, transparent)',
        },
        '&.Mui-selected': {
          backgroundColor: 'var(--mui-palette-action-selected, transparent)',
          '&:hover': {
            backgroundColor: 'var(--mui-palette-action-selected, transparent)',
          },
        },
        '&.Mui-focusVisible': {
          backgroundColor: 'var(--mui-palette-action-focus, transparent)',
          outline: '2px solid var(--mui-palette-primary-main, currentColor)',
        },
        '&.Mui-disabled': {
          backgroundColor: 'var(--mui-palette-action-disabledBackground, transparent)',
          color: 'var(--mui-palette-action-disabled, var(--mui-palette-text-disabled))',
        },
      },
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