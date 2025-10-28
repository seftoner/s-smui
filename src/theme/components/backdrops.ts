import type {} from '@mui/material/themeCssVarsAugmentation';

export const backdropsOverrides = {
MuiBackdrop: {
      styleOverrides: {
        root: ({ theme }: { theme: any }) => ({
          backgroundColor: theme.vars.palette.components.backdrop.default,
        //   backdropFilter: 'blur(1px)',
        }),
      },
    },
}