// Figma Design System Color Palette - Dark Mode
export const darkPalette = {
  primary: {
    main: '#81c1ff',
    dark: '#6196f8',
    light: '#d8ecfd',
    contrastText: '#1b1d21',
    // State colors from Figma
    states: {
      hover: '#6196f80f',
      selected: '#6196f829',
      focus: '#6196f81f',
      focusVisible: '#6196f880',
      outlinedBorder: '#6196f880',
    },
  },
  secondary: {
    main: '#c3c6ca',
    dark: '#9fa2a8',
    light: '#f7f7f7',
    contrastText: '#000000',
    // State colors from Figma
    states: {
      hover: '#6196f80f',
      selected: '#89acff29',
      focus: '#89acff14',
      focusVisible: '#6b6c70',
      outlinedBorder: '#6b6c70',
    },
  },
  error: {
    main: '#d83731',
    dark: '#b52520',
    light: '#faaaa7',
    contrastText: '#ffffff',
    // State colors from Figma
    states: {
      hover: '#f4433614',
      selected: '#f4433629',
      focusVisible: '#f443364d',
      outlinedBorder: '#f4433680',
    },
  },
  warning: {
    main: '#e65100',
    dark: '#e65100',
    light: '#ffb74d',
    contrastText: '#ffffff',
    // State colors from Figma
    states: {
      hover: '#ffa72614',
      selected: '#ffa72629',
      focusVisible: '#ffa7264d',
      outlinedBorder: '#ffa72680',
    },
  },
  info: {
    main: '#00608d',
    dark: '#14324b',
    light: '#2ccaff',
    contrastText: '#ffffff',
    // State colors from Figma
    states: {
      hover: '#29b6f614',
      selected: '#29b6f629',
      focusVisible: '#29b6f64d',
      outlinedBorder: '#29b6f680',
    },
  },
  success: {
    main: '#3f8e50',
    dark: '#24432b',
    light: '#a0d5ab',
    contrastText: '#ffffff',
    // State colors from Figma
    states: {
      hover: '#66bb6a14',
      selected: '#66bb6a29',
      focusVisible: '#66bb6a4d',
      outlinedBorder: '#66bb6a80',
    },
  },
  background: {
    default: '#232529',
    paper: '#232529',
    surface_0: '#121317',
    surface_1: '#131416',
    surface_2: '#1c1e21',
    surface_3: '#232529',
    surface_ai_1: '#212121',
    surface_ai_2: '#181818',
    // Background state colors from Figma
    states: {
      selected: '#5d3b26',
      hover: '#6c4527',
      focusOutlined: '#232528',
      disabled: '#232528',
    },
  },
  text: {
    primary: '#f7f7f7',
    secondary: '#f7f7f7b2',
    disabled: '#f7f7f761',
    link: '#81c1ff',
    // Text state colors from Figma
    states: {
      hover: '#f7f7f714',
      selected: '#f7f7f729',
      focus: '#f7f7f71f',
      focusVisible: '#f7f7f74d',
    },
  },
  divider: '#ffffff1f',
  action: {
    active: '#ffffff99',
    hover: '#ffffff0d',
    selected: '#ffffff26',
    focus: '#ffffff33',
    focusStroke: '#ffffff33',
    disabled: '#ffffff61',
    disabledBackground: '#ffffff1a',
  },
  
  // Component-specific colors from Figma tokens - Dark Mode
  components: {
    listItem: {
      iconEnabled: '#c3c6ca',
      iconDisabled: '#4c4f57',
    },
    chip: {
      hover: '#3e4045',
      focused: '#3e4045',
      disabled: '#4c4f57',
      pressed: '#232528',
      filled: {
        default: '#4c4f57',
        hovered: '#ffffff33',
        focus: '#ffffff40',
      },
      outline: {
        enabled: '#7a7e85',
        hovered: '#163bf5',
        focused: '#81c1ff',
        disabled: '#4c4f57',
        pressed: '#60646c',
      },
      workStatus: {
        todo: '#3e4045',
        inProgress: '#5d3b26',
      },
      filterOperator: {
        or: '#6f3a1a',
        and: '#00608d',
      },
    },
    alert: {
      warning: {
        color: '#e2c58c',
        background: '#361e12',
      },
      info: {
        color: '#c1e8fd',
        background: '#14324b',
      },
      success: {
        color: '#cae8cf',
        background: '#0f2415',
      },
      error: {
        color: '#faaaa7',
        background: '#430e0c',
      },
    },
    avatar: {
      fill: '#4c4f57',
      error: {
        color: '#f4c7c7',
        background: '#160b0b',
      },
    },
    input: {
      enabled: '#60646c',
      hover: '#d8ecfd',
      background: '#232529',
    },
    switch: {
      knobFillEnabled: '#9fa2a8',
      slideFill: '#ffffff61',
      knobFillDisabled: '#4c4f57',
    },
    fab: {
      activeStroke: '#9fa2a8',
    },
    rating: {
      enabled: '#ffffff3b',
      active: '#ffb400',
    },
    snackbar: {
      fill: '#2c2c2c',
    },
    tooltip: {
      fill: '#f7f7f7',
    },
    backdrop: {
      fill: '#00000080',
    },
    appbar: {
      default: '#131416',
    },
    breadcrumbs: {
      collapse: '#4c4f57',
    },
    stepper: {
      connector: '#4c4f57',
    },
    taskCard: {
      enabled: '#232528',
    },
    icon: {
      default: '#f7f7f7',
    },
    attachmentCard: {
      hover: '#ffffff0d',
      selected: '#6196f829',
    },
    scrollbar: {
      default: '#60646c',
      hover: '#9fa2a8',
    },
    elevation: {
      outlined: '#ffffff1f',
      inputShadow: '#05063680',
      inputShadow2: '#08112780',
      inputShadow3: '#00000014',
    },
  },
  
  // Common color states from Figma - Dark Mode
  common: {
    black: {
      main: '#000000',
      states: {
        hover: '#00000014',
        selected: '#00000029',
        focus: '#0000001f',
        focusVisible: '#0000004d',
        outlinedBorder: '#00000080',
      },
    },
    white: {
      main: '#ffffff',
      states: {
        hover: '#ffffff14',
        selected: '#ffffff29',
        focus: '#ffffff1f',
        focusVisible: '#ffffff4d',
        outlinedBorder: '#ffffff80',
      },
    },
  },
};