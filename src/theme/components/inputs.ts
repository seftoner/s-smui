// Input and form component overrides
export const inputOverrides = {
  MuiTextField: {
    styleOverrides: {
      root: () => ({
        '& .MuiOutlinedInput-root': {
          borderRadius: 8, // cornerRadius-2
          backgroundColor: 'var(--mui-palette-components-input-background, var(--mui-palette-background-surface-3, var(--mui-palette-background-paper)))',
          boxShadow: 'var(--mui-shadows-1, none)',
          '& fieldset': {
            borderColor: 'var(--mui-palette-components-input-enabled)',
          },
          '&:hover fieldset': {
            borderColor: 'var(--mui-palette-primary-light)'
          },
          '&.Mui-focused fieldset': {
            borderColor: 'var(--mui-palette-primary-main)',
          },
          '&.Mui-disabled fieldset': {
            borderColor: 'var(--mui-palette-action-disabled)',
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