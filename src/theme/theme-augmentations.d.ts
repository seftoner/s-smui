// Import to make this file a module
import type { ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

// Augment MUI theme types to include our custom properties

// Augment IconButton to support our custom xsmall size
declare module '@mui/material/IconButton' {
  interface IconButtonPropsSizeOverrides {
    xsmall: true;
  }
}

// Augment Chip to support our custom selected variant
declare module '@mui/material/Chip' {
  interface ChipPropsVariantOverrides {
    selected: true;
  }
}

/* declare module '@mui/material/styles' {
  interface Palette {
    // Custom component colors that we use in our theme
    components?: {
      listItem?: {
        iconEnabled?: string;
        iconDisabled?: string;
      };
      chip?: {
        hover?: string;
        focused?: string;
        disabled?: string;
        pressed?: string;
        filled?: {
          default?: string;
          hovered?: string;
          focus?: string;
        };
        outline?: {
          enabled?: string;
          hovered?: string;
          focused?: string;
          disabled?: string;
          pressed?: string;
        };
        workStatus?: {
          todo?: string;
          inProgress?: string;
        };
        filterOperator?: {
          or?: string;
          and?: string;
        };
      };
      alert?: {
        warning?: {
          color?: string;
          background?: string;
        };
        info?: {
          color?: string;
          background?: string;
        };
        success?: {
          color?: string;
          background?: string;
        };
        error?: {
          color?: string;
          background?: string;
        };
      };
      avatar?: {
        fill?: string;
        error?: {
          color?: string;
          background?: string;
        };
      };
      input?: {
        enabled?: string;
        hover?: string;
        background?: string;
      };
      switch?: {
        knobFillEnabled?: string;
        slideFill?: string;
        knobFillDisabled?: string;
      };
      fab?: {
        activeStroke?: string;
      };
      rating?: {
        enabled?: string;
        active?: string;
      };
      snackbar?: {
        fill?: string;
      };
      tooltip?: {
        fill?: string;
      };
      backdrop?: {
        fill?: string;
      };
      appbar?: {
        default?: string;
      };
      breadcrumbs?: {
        collapse?: string;
      };
      stepper?: {
        connector?: string;
      };
      taskCard?: {
        enabled?: string;
      };
      icon?: {
        default?: string;
      };
      attachmentCard?: {
        hover?: string;
        selected?: string;
      };
      scrollbar?: {
        default?: string;
        hover?: string;
      };
      elevation?: {
        outlined?: string;
        inputShadow?: string;
        inputShadow2?: string;
        inputShadow3?: string;
      };
    };
  }

  interface PaletteOptions {
    components?: {
      listItem?: {
        iconEnabled?: string;
        iconDisabled?: string;
      };
      chip?: {
        hover?: string;
        focused?: string;
        disabled?: string;
        pressed?: string;
        filled?: {
          default?: string;
          hovered?: string;
          focus?: string;
        };
        outline?: {
          enabled?: string;
          hovered?: string;
          focused?: string;
          disabled?: string;
          pressed?: string;
        };
        workStatus?: {
          todo?: string;
          inProgress?: string;
        };
        filterOperator?: {
          or?: string;
          and?: string;
        };
      };
      alert?: {
        warning?: {
          color?: string;
          background?: string;
        };
        info?: {
          color?: string;
          background?: string;
        };
        success?: {
          color?: string;
          background?: string;
        };
        error?: {
          color?: string;
          background?: string;
        };
      };
      avatar?: {
        fill?: string;
        error?: {
          color?: string;
          background?: string;
        };
      };
      input?: {
        enabled?: string;
        hover?: string;
        background?: string;
      };
      switch?: {
        knobFillEnabled?: string;
        slideFill?: string;
        knobFillDisabled?: string;
      };
      fab?: {
        activeStroke?: string;
      };
      rating?: {
        enabled?: string;
        active?: string;
      };
      snackbar?: {
        fill?: string;
      };
      tooltip?: {
        fill?: string;
      };
      backdrop?: {
        fill?: string;
      };
      appbar?: {
        default?: string;
      };
      breadcrumbs?: {
        collapse?: string;
      };
      stepper?: {
        connector?: string;
      };
      taskCard?: {
        enabled?: string;
      };
      icon?: {
        default?: string;
      };
      attachmentCard?: {
        hover?: string;
        selected?: string;
      };
      scrollbar?: {
        default?: string;
        hover?: string;
      };
      elevation?: {
        outlined?: string;
        inputShadow?: string;
        inputShadow2?: string;
        inputShadow3?: string;
      };
    };
  }
} */

