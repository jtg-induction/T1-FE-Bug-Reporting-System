import type {
  CSSProperties,
  MixinsOptions,
} from "@mui/material/styles/createMixins";

/**
 * Creates a CSS block for clamping text to a specified number of lines
 * @param lines - Number of Lines to clamp
 * @returns Returns Line clamp CSS properties
 */
const lineClamp = (lines: number = 1): CSSProperties => ({
  display: "-webkit-box",
  overflow: "hidden",
  textOverflow: "ellipsis",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: lines,
});

const hideScrollbar = (): CSSProperties => ({
  "&::-webkit-scrollbar": {
    display: "none",
  },
  "-ms-overflow-style": "none",
});

export const mixins: MixinsOptions = {
  lineClamp,
  hideScrollbar,
};
