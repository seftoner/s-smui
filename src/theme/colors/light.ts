// Figma Design System Color Palette - Light Mode
export const lightPalette = {
  mode: 'light' as const,
  primary: {
    main: '#3b6bf6',
    dark: '#163bf5',
    light: '#6196f8',
    contrastText: '#f7f7f7',
    
  },
  secondary: {
    main: '#232528',
    dark: '#1b1d21',
    light: '#3e4045',
    contrastText: '#ffffff',
   
  },
  error: {
    main: '#d83731',
    dark: '#95231f',
    light: '#f47a75',
    contrastText: '#ffffff',
    
  },
  warning: {
    main: '#ef6c00',
    dark: '#e65100',
    light: '#ff9800',
    contrastText: '#ffffff',
   
  },
  info: {
    main: '#0073ab',
    dark: '#224f71',
    light: '#00abeb',
    contrastText: '#ffffff',
   
  },
  success: {
    main: '#3f8e50',
    dark: '#24432b',
    light: '#a0d5ab',
    contrastText: '#ffffff',
   
  },
  background: {
    default: '#ffffff',
    paper: '#ffffff',
    surface_0: '#f2f2f2',
    surface_1: '#f7f7f7',
    surface_2: '#fcfcfc',
    surface_3: '#ffffff',
    surface_ai_1: '#ffffff',
    surface_ai_2: '#f9f9f9',
  },
  text: {
    primary: '#1b1d21',
    secondary: '#1b1d21b2',
    disabled: '#1b1d214d',
    link: '#3b6bf6',
  },
  divider: '#1b1d211f',
    
  action: {
    active: 'rgba(14, 15, 18, 0.6)',
    activatedOpacity: 0.20,
    hover: 'rgba(14, 15, 18, 0.05)',
    hoverOpacity: 0.05,
    selected: 'rgba(14, 15, 18, 0.08)',
    selectedOpacity: 0.08,
    disabled: 'rgba(14, 15, 18, 0.38)',
    disabledOpacity: 0.38,
    disabledBackground: '#0e0f121a',
    focus: 'rgba(14, 15, 18, 0.2)',
    focusOpacity: 0.15,
  },
  
  // Component-specific colors from Figma tokens
  components: {
    listItem: {
      iconEnabled: '#4c4f57',
      iconDisabled: '#c3c6ca',
    },
    chip: {
      hover: '#effaff',
      focused: '#def3ff',
      disabled: '#f7f7f7',
      pressed: '#def3ff',
      filled: {
        default: '#e1e3e5',
        hovered: '#effaff',
        focus: '#effaff',
      },
      outline: {
        enabled: '#c3c6ca',
        hovered: '#2ccaff',
        focused: '#3b6bf6',
        disabled: '#f7f7f7',
        pressed: '#0090d4',
      },
      workStatus: {
        todo: '#e1e3e5',
        inProgress: '#f1ecd2',
      },
      filterOperator: {
        or: '#ffcc80',
        and: '#c1e8fd',
      },
    },
    alert: {
      warning: {
        color: '#6c4527',
        background: '#f9f7ee',
      },
      info: {
        color: '#224f71',
        background: '#def3ff',
      },
      success: {
        color: '#24432b',
        background: '#e4f4e7',
      },
      error: {
        color: '#95231f',
        background: '#fef2f2',
      },
    },
    avatar: {
      fill: '#7a7e85',
      error: {
        color: '#95231f',
        background: '#fdeded',
      },
    },
    input: {
      enabled: '#e1e3e5',
      hover: '#6196f8',
      background: '#ffffff',
    },
    switch: {
      knobFillEnabled: '#f7f7f7',
      slideFill: '#000000',
      knobFillDisabled: '#e1e3e5',
    },
    fab: {
      activeStroke: '#00000061',
    },
    rating: {
      enabled: '#0000003b',
      active: '#ffb400',
    },
    snackbar: {
      fill: '#3e4045',
    },
    tooltip: {
      fill: '#3e4045',
    },
    backdrop: {
      default: 'rgba(0, 0, 0, 0.5)',
      attachment: 'rgba(255, 255, 255, 0.80)',
    },
    appbar: {
      default: '#e1e3e5',
    },
    breadcrumbs: {
      collapse: '#e1e3e5',
    },
    stepper: {
      connector: '#7a7e85',
    },
    taskCard: {
      enabled: '#e1e3e5',
    },
    icon: {
      default: '#232528',
    },
    attachmentCard: {
      hover: '#286cff0f',
      selected: '#286cff1a',
    },
    scrollbar: {
      default: '#c3c6ca',
      hover: '#7a7e85',
    },
    elevation: {
      outlined: '#e0e0e0',
      inputShadow: '#9670261f',
      inputShadow2: '#a67e301a',
      inputShadow3: '#644b1b14',
    },
  },
  
  common: {
      black: '#000',
      white: '#fff',
    },
};