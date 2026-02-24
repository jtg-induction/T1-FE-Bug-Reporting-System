import { Button, styled } from "@mui/material";

export const AvatarWrapper = styled(Button)(({ theme }) => {
  const {
    typography: { pxToRem },
    boxShadow,
  } = theme;
  return {
    minWidth: 0,
    padding: 0,
    boxShadow: boxShadow.primary,
    borderRadius: "50%",

    "& .MuiAvatar-root": {
      height: pxToRem(32),
      width: pxToRem(32),
    },
  };
});
