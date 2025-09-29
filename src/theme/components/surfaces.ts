// Surface and layout component overrides
export const surfaceOverrides = {
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 16, // cornerRadius-3
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)',
        border: '1px solid #E1E3E5',
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 8, // cornerRadius-2
      },
      outlined: {
        borderColor: 'rgba(27, 29, 33, 0.12)',
      },
    },
  },
};