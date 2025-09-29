// Data display component overrides
export const dataDisplayOverrides = {
  MuiChip: {
    styleOverrides: {
      root: ({ theme }: { theme: any }) => ({
        borderRadius: 16, // cornerRadius-3
        fontFamily: 'Noto Kufi Arabic, Helvetica, Arial, sans-serif',
        fontWeight: 400,
        fontSize: 13,
        lineHeight: 1.385,
        letterSpacing: '0.0123em',
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
  MuiBadge: {
    styleOverrides: {
      badge: {
        fontFamily: 'Noto Kufi Arabic, Helvetica, Arial, sans-serif',
        fontWeight: 500,
        fontSize: 12,
        lineHeight: 1.667,
        letterSpacing: '0.0117em',
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      head: {
        fontFamily: 'Alexandria, Helvetica, Arial, sans-serif',
        fontWeight: 500,
        fontSize: 14,
        lineHeight: 1.714,
        letterSpacing: '0.0121em',
      },
    },
  },
};