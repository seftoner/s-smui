// Figma Design System Color Palette - Light Mode
export const lightPalette = {
  primary: {
    main: '#3b6bf6',
    dark: '#163bf5',
    light: '#6196f8',
    contrastText: '#f7f7f7',
    // State colors from Figma
    states: {
      hover: '#286cff0f',
      selected: '#286cff1a',
      focus: '#286cff1f',
      focusVisible: '#286cff80',
      outlinedBorder: '#286cff80',
    },
  },
  secondary: {
    main: '#232528',
    dark: '#1b1d21',
    light: '#3e4045',
    contrastText: '#ffffff',
    // State colors from Figma
    states: {
      hover: '#2325280f',
      selected: '#23252814',
      focus: '#23252814',
      focusVisible: '#23252880',
      outlinedBorder: '#8a8b8d',
    },
  },
  error: {
    main: '#d83731',
    dark: '#95231f',
    light: '#f47a75',
    contrastText: '#ffffff',
    // State colors from Figma
    states: {
      hover: '#d32f2f0a',
      selected: '#d32f2f14',
      focusVisible: '#d32f2f4d',
      outlinedBorder: '#d32f2f80',
    },
  },
  warning: {
    main: '#ef6c00',
    dark: '#e65100',
    light: '#ff9800',
    contrastText: '#ffffff',
    // State colors from Figma
    states: {
      hover: '#ef6c000a',
      selected: '#ef6c0014',
      focusVisible: '#ef6c004d',
      outlinedBorder: '#ef6c0080',
    },
  },
  info: {
    main: '#0073ab',
    dark: '#224f71',
    light: '#00abeb',
    contrastText: '#ffffff',
    // State colors from Figma
    states: {
      hover: '#0288d10a',
      selected: '#0288d114',
      focusVisible: '#0288d14d',
      outlinedBorder: '#0288d180',
    },
  },
  success: {
    main: '#3f8e50',
    dark: '#24432b',
    light: '#a0d5ab',
    contrastText: '#ffffff',
    // State colors from Figma
    states: {
      hover: '#2e7d320a',
      selected: '#2e7d3214',
      focusVisible: '#2e7d324d',
      outlinedBorder: '#2e7d3280',
    },
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
    // Background state colors from Figma
    states: {
      selected: '#c1e8fd',
      hover: '#def3ff',
      focusOutlined: '#def3ff',
      disabled: '#e1e3e5',
    },
  },
  text: {
    primary: '#1b1d21',
    secondary: '#1b1d21b2',
    disabled: '#1b1d214d',
    link: '#3b6bf6',
    // Text state colors from Figma
    states: {
      hover: '#1b1d210a',
      selected: '#1b1d2114',
      focus: '#1b1d211f',
      focusVisible: '#1b1d214d',
    },
  },
  divider: '#1b1d211f',
    
  action: {
    active: '#0e0f1299',
    hover: '#0e0f120d',
    hoverOpacity: 0.08,
    selected: '#0e0f1226',
    selectedOpacity: 0.15,
    disabled: '#0e0f1261',
    disabledOpacity: 0.38,
    disabledBackground: '#0e0f121a',
    focus: '#0e0f1233',
    focusOpacity: 0.20,
    activatedOpacity: 0.60,
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
      fill: '#00000080',
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
  
  // Common color states from Figma
  common: {
    black: {
      main: '#000000',
    },
    white: {
      main: '#ffffff',
    },
  },
};