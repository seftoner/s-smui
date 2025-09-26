import { Theme as MUITheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    surface: {
      0: string;
      1: string;
      2: string;
      3: string;
      4: string;
      5: string;
      ai_1: string;
      ai_2: string;
    };
  }

  interface PaletteOptions {
    surface?: {
      0?: string;
      1?: string;
      2?: string;
      3?: string;
      4?: string;
      5?: string;
      ai_1?: string;
      ai_2?: string;
    };
  }
}

// Extend the Theme interface for better TypeScript support
declare module '@mui/material/styles/createTheme' {
  interface Theme {
    palette: {
      surface: {
        0: string;
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        ai_1: string;
        ai_2: string;
      };
    } & MUITheme['palette'];
  }
}