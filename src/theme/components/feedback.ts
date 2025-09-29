// Feedback component overrides
export const feedbackOverrides = {
  MuiAlert: {
    styleOverrides: {
      root: {
        '& .MuiAlertTitle-root': {
          fontFamily: 'Alexandria, Helvetica, Arial, sans-serif',
          fontWeight: 500,
          fontSize: 16,
          lineHeight: 1.5,
          letterSpacing: '0.0094em',
        },
        '& .MuiAlert-message': {
          fontFamily: 'Noto Kufi Arabic, Helvetica, Arial, sans-serif',
          fontWeight: 500,
          fontSize: 14,
          lineHeight: 1.43,
          letterSpacing: '0.0107em',
        },
      },
      standardWarning: ({ theme }: { theme: any }) => ({
        backgroundColor: theme.palette.components?.alert.warning.background,
        color: theme.palette.components?.alert.warning.color,
      }),
      standardInfo: ({ theme }: { theme: any }) => ({
        backgroundColor: theme.palette.components?.alert.info.background,
        color: theme.palette.components?.alert.info.color,
      }),
      standardSuccess: ({ theme }: { theme: any }) => ({
        backgroundColor: theme.palette.components?.alert.success.background,
        color: theme.palette.components?.alert.success.color,
      }),
      standardError: ({ theme }: { theme: any }) => ({
        backgroundColor: theme.palette.components?.alert.error.background,
        color: theme.palette.components?.alert.error.color,
      }),
    },
  },
  MuiFab: {
    styleOverrides: {
      root: {
        boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: ({ theme }: { theme: any }) => ({
        backgroundColor: theme.palette.components?.tooltip.fill,
        color: theme.palette.primary.contrastText,
        fontFamily: 'Noto Kufi Arabic, Helvetica, Arial, sans-serif',
        fontWeight: 500,
        fontSize: 10,
        lineHeight: 1.4,
        letterSpacing: '0em',
        borderRadius: 4,
        padding: '8px 12px',
        maxWidth: 300,
      }),
      arrow: ({ theme }: { theme: any }) => ({
        color: theme.palette.components?.tooltip.fill,
      }),
    },
  },
};