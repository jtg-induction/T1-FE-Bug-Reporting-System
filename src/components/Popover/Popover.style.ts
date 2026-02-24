import { Popover, styled } from "@mui/material";

export const StyledPopover = styled(Popover)(({ theme }) => {
  const {
    typography: { pxToRem },
  } = theme;
  return {
    "& .MuiPopover-paper": {
      padding: pxToRem(30),
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: pxToRem(10),
    },
  };
});
