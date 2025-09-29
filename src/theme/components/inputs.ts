// Input and form component overrides
export const inputOverrides = {
  MuiTextField: {
    styleOverrides: {
      root: ({ theme }: { theme: any }) => ({
        '& .MuiOutlinedInput-root': {
          borderRadius: 8, // cornerRadius-2
          '& fieldset': {
            borderColor: theme.palette.components?.input.enabled,
          },
          '&:hover fieldset': {
            borderColor: theme.palette.primary.light
          },
          '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
          },
          '&.Mui-disabled fieldset': {
            borderColor: theme.palette.action.disabled,
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
        fontSize: 10,
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