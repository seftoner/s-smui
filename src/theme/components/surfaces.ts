import type {} from '@mui/material/themeCssVarsAugmentation';

// Surface component overrides
export const surfaceOverrides = {
  MuiCard: {
    styleOverrides: {
      root: ({ theme }: { theme: any }) => ({
        borderRadius: 16, // cornerRadius-3
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)',
        border: `1px solid ${theme.vars.palette.divider}`,
        backgroundColor: theme.vars.palette.background.paper,
      }),
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: ({ theme }: { theme: any }) => ({
        borderRadius: 8, // cornerRadius-2
        backgroundColor: theme.vars.palette.background.paper,
      }),
      outlined: ({ theme }: { theme: any }) => ({
        borderColor: theme.vars.palette.divider,
      }),
    },
  },
};