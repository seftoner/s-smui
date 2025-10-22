import type {} from '@mui/material/themeCssVarsAugmentation';

// Button component overrides

export const buttonOverrides = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8, // cornerRadius-2
        textTransform: 'none' as const,
        fontSize: 14,
        lineHeight: 1.714,
      },
      sizeLarge: {
        fontSize: 15, 
        lineHeight: 1.733,
        height: 48,
        padding: '8px 22px',
      },
      sizeMedium: {
        fontSize: 14,
        lineHeight: 1.714,
        height: 40,
        padding: '4px 16px',
      },
      sizeSmall: {
        fontSize: 13,
        lineHeight: 1.692,        
        height: 22,
        padding: '16px 12px',
        borderRadius: 4,
      },
      contained: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: '0px 2px 4px rgba(59, 107, 246, 0.12)',
        },
      },
      outlined: ({ theme }: { theme: any }) => ({
        borderColor: `rgba(${theme.vars.palette.primary.mainChannel} / 0.5)`,
        '&:hover': {
          borderColor: theme.vars.palette.primary.main,
          backgroundColor: `rgba(${theme.vars.palette.primary.mainChannel} / 0.06)`,
        },
      }),
    },
  },
  MuiIconButton: {
    defaultProps: {
      TouchRippleProps: {
        center: false,
      },
    },
    variants: [
      {
        props: { size: 'xsmall' as const },
        style: {
          width: 24,
          height: 24,
          padding: 0,
           borderRadius: 4,
          '& .MuiSvgIcon-root': {
            fontSize: 16,
          },
        },
      },
    ],
    styleOverrides: {
      root: ({ theme }: { theme: any }) => ({
        borderRadius: 8,
        padding: 12, // Default padding for large
        '&:hover': {
          backgroundColor: theme.vars.palette.action.hover,
        },
        '&.Mui-focusVisible': {
          backgroundColor: theme.vars.palette.action.focus,
        },
        '&.Mui-disabled': {
          backgroundColor: 'transparent',
          color: theme.vars.palette.action.disabled,
        },
      }),
      sizeLarge: {
        width: 48,
        height: 48,
        padding: 12, // (48 - 24) / 2 = 12px padding for 24px icon
        '& .MuiSvgIcon-root': {
          fontSize: 24,
        },
      },
      sizeMedium: {
        width: 40,
        height: 40,
        padding: 8, // (40 - 24) / 2 = 8px padding for 24px icon
        '& .MuiSvgIcon-root': {
          fontSize: 24,
        },
      },
      sizeSmall: {
        width: 32,
        height: 32,
        padding: 4, 
        '& .MuiSvgIcon-root': {
          fontSize: 20,
        },
      },
      // Color variants
      colorPrimary: ({ theme }: { theme: any }) => ({
        backgroundColor: theme.vars.palette.primary.main,
        color: theme.vars.palette.primary.contrastText,
        borderRadius: '50%', 
        '&:hover': {
          backgroundColor: theme.vars.palette.primary.dark,
        },
        '&.Mui-focusVisible': {
          backgroundColor: theme.vars.palette.primary.main,
          outline: `2px solid ${theme.vars.palette.primary.light}`,
        },
        '&:active': {
          backgroundColor: theme.vars.palette.primary.dark,
        },
        '&.Mui-disabled': {
          backgroundColor: theme.vars.palette.action.disabledBackground,
          color: theme.vars.palette.action.disabled,
        },
      }),

      colorError: ({ theme }: { theme: any }) => ({
        backgroundColor: theme.vars.palette.error.main,
        color: theme.vars.palette.error.contrastText,
        borderRadius: '50%',
        '&:hover': {
          backgroundColor: theme.vars.palette.error.dark,
        },
        '&.Mui-focusVisible': {
          backgroundColor: theme.vars.palette.error.main,
          outline: `2px solid ${theme.vars.palette.error.light}`,
        },
        '&:active': {
          backgroundColor: theme.vars.palette.error.dark,
        },
      }),
    },
  },
};