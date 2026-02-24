import { Stack, styled } from "@mui/material";

export const StyledSection = styled(Stack)(({ theme }) => {
  const {
    spacing,
    typography: { pxToRem },
  } = theme;
  return {
    padding: spacing(4),
    gap: pxToRem(16),
    border: "1px solid black",
  };
});
