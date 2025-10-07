import type {} from '@mui/material/themeCssVarsAugmentation';

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
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: theme.vars.palette.components?.chip?.hover,
          transform: 'translateY(-1px)',
        },
        '&.Mui-focusVisible': {
          backgroundColor: theme.vars.palette.components?.chip?.focused,
        },
        '&.Mui-disabled': {
          backgroundColor: theme.vars.palette.components?.chip?.disabled,
        },
      }),
      filled: ({ theme }: { theme: any }) => ({
        backgroundColor: theme.vars.palette.grey?.[300],
        '&:hover': {
          backgroundColor: theme.vars.palette.components?.chip?.filled?.hovered,
        },
        '&.Mui-focusVisible': {
          backgroundColor: theme.vars.palette.components?.chip?.filled?.focus,
        },
      }),
      outlined: ({ theme }: { theme: any }) => ({
        borderColor: theme.vars.palette.components?.chip?.outline?.enabled,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          borderColor: theme.vars.palette.primary.light,
          transform: 'translateY(-1px)',
        },
        '&.Mui-focusVisible': {
          borderColor: theme.vars.palette.primary.main,
        },
        '&.Mui-disabled': {
          borderColor: theme.vars.palette.components?.chip?.outline?.disabled,
        },
      }),
    },
    variants: [
      {
        props: { variant: 'selected' as any },
        style: ({ theme }: { theme: any }) => ({
          backgroundColor: theme.vars.palette.primary.main,
          borderColor: theme.vars.palette.primary.main,
          color: theme.vars.palette.primary.contrastText,
          transition: 'all 0.2s ease-in-out',
          '& .MuiChip-icon': {
            color: theme.vars.palette.primary.contrastText,
            transition: 'color 0.2s ease-in-out',
          },
          '&:hover': {
            backgroundColor: theme.vars.palette.primary.dark,
            borderColor: theme.vars.palette.primary.dark,
            transform: 'translateY(-1px)',
          },
          '&.Mui-focusVisible': {
            backgroundColor: theme.vars.palette.primary.dark,
            borderColor: theme.vars.palette.primary.dark,
          },
        }),
      },
    ],
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