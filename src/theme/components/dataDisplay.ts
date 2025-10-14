import type {} from '@mui/material/themeCssVarsAugmentation';

// Data display component overrides
export const dataDisplayOverrides = {
  MuiChip: {
    styleOverrides: {
      root: ({ theme }: { theme: any }) => ({
        borderRadius: 16, // cornerRadius-3
        fontFamily: 'Noto Kufi Arabic, Helvetica, Arial, sans-serif',
        '&.Mui-focusVisible': {
          backgroundColor: theme.vars.palette.components?.chip?.focused,
        },
        '&.Mui-disabled': {
          backgroundColor: theme.vars.palette.components?.chip?.disabled,
        },
      }),
    },
    variants: [
      {
        props: { variant: 'selected' as any },
        style: ({ theme }: { theme: any }) => ({
          backgroundColor: theme.vars.palette.primary.main,
          border: `1px solid ${theme.vars.palette.primary.main}`, // Use shorthand to ensure consistency
          color: theme.vars.palette.primary.contrastText,
          // Force same spacing as outlined variant
          '& .MuiChip-label': {
            paddingLeft: '7px',
            paddingRight: '7px',
          },
          '& .MuiChip-icon': {
            color: theme.vars.palette.primary.contrastText,
            marginLeft: '2px',
          },
          '&:hover': {
            backgroundColor: theme.vars.palette.primary.dark,
            borderColor: theme.vars.palette.primary.dark,
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