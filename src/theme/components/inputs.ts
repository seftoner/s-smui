import type {} from '@mui/material/themeCssVarsAugmentation';

// Input component overrides
export const inputOverrides = {
  MuiTextField: {
    styleOverrides: {
      root: ({ theme }: { theme: any }) => ({
        '& .MuiOutlinedInput-root': {
          borderRadius: 8, // cornerRadius-2
          backgroundColor: theme.vars.palette.components?.input?.background || theme.vars.palette.background.paper,
          boxShadow: theme.vars.shadows?.[1] || 'none',
          '& fieldset': {
            borderColor: theme.vars.palette.components?.input?.enabled || theme.vars.palette.divider,
          },
          '&:hover fieldset': {
            borderColor: theme.vars.palette.primary.light
          },
          '&.Mui-focused fieldset': {
            borderColor: theme.vars.palette.primary.main,
          },
          '&.Mui-disabled fieldset': {
            borderColor: theme.vars.palette.action.disabled,
          },
        },
      }),
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        fontFamily: 'Noto Kufi Arabic, Helvetica, Arial, sans-serif',
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 1.5,
        letterSpacing: '0.015em',
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      input: {
        fontFamily: 'Noto Kufi Arabic, Helvetica, Arial, sans-serif',
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 1.5,
        letterSpacing: '0.0094em',
      },
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        fontFamily: 'Noto Kufi Arabic, Helvetica, Arial, sans-serif',
        fontWeight: 400,
        fontSize: 12,
        lineHeight: 1.66,
        letterSpacing: '0.0333em',
      },
    },
  },
};