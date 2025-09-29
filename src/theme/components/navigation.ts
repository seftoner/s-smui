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