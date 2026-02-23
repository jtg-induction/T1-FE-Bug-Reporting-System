import type { PaletteOptions } from "@mui/material/styles";

import { COLORS } from "@constant";

/* Custom Palette */
export const palette: PaletteOptions = {
  primary: {
    main: COLORS.PRIMARY.MAIN,
  },
  error: {
    main: COLORS.ERROR.LIGHT,
    contrastText: COLORS.ERROR.MAIN,
  },
  info: {
    contrastText: COLORS.INFO.MAIN,
    main: COLORS.INFO.LIGHT,
  },
  success: {
    contrastText: COLORS.SUCCESS.MAIN,
    main: COLORS.SUCCESS.LIGHT,
    dark: COLORS.SUCCESS.DARK,
  },
  common: {
    white: COLORS.COMMON.WHITE,
  },
  text: {
    primary: COLORS.TEXT.PRIMARY,
    secondary: COLORS.TEXT.SECONDARY,
  },
  grey: {
    50: COLORS.GREY[50],
    100: COLORS.GREY[100],
    200: COLORS.GREY[200],
    500: COLORS.GREY[500],
    600: COLORS.GREY[600],
    900: COLORS.GREY[900],
  },
};
