/**
 * Color palette used in the application.
 * @constant
 */
export const COLORS = {
  PRIMARY: {
    MAIN: "#F9FAFB",
  },
  ERROR: {
    MAIN: "#9B1C1C",
    LIGHT: "#FBD5D5",
  },
  INFO: {
    MAIN: "#1E429F",
    LIGHT: "#E1EFFE",
  },
  SUCCESS: {
    MAIN: "#0E9F6E",
    LIGHT: "#DEF7EC",
    DARK: "#03543F",
  },
  COMMON: {
    WHITE: "#FFFFFF",
  },
  TEXT: {
    PRIMARY: "#111827",
    SECONDARY: "#6B7280",
  },
  GREY: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    500: "#6B7280",
    600: "#4B5563",
    900: "#111827",
  },
};

/**
 * Base font size in pixels.
 * @constant
 */
export const HTML_FONT_SIZE = 10;

/**
 * Scaling factor used for spacing.
 * @constant
 */
export const SCALING_FACTOR = 4;

/**
 * Constant values used for specific properties.
 * @constant
 */
export const BOXSHADOW = {
  primary: `0px 2px 4px ${COLORS.GREY[500]}`,
  secondary: `0px 2px 8px ${COLORS.GREY[200]}`,
};

export const COMPONENTWIDTH = {
  drawer: 240,
};
