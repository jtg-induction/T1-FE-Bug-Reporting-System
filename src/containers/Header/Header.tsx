import { useEffect, useState } from "react";

import { useGetUserProfile } from "apiService/requests";
import { NavLink } from "react-router-dom";

import { Box, Button, Stack, Toolbar, Typography } from "@mui/material";

import { Avatar } from "@components/Avatar";
import { Popover } from "@components/Popover";
import { PopoverContentProps } from "@components/Popover/Popover.props";

import { StyledAppBar } from './Header.styles';

export const Header = () => {
  const { getUserProfile, data: user } = useGetUserProfile();
  useEffect(() => {
    getUserProfile();
  }, []);
  // const navigate = useNavigate();
  const handleProfileClick = () => {
    setAnchorEl(event.currentTarget);
  };

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  return (
    <StyledAppBar elevation={1}>
      <Toolbar>
        <Stack
          width="100%"
          alignItems="center"
          justifyContent="space-between"
          direction="row"
        >
          <Box component="img" src="" alt="LOGO" />
          <Stack>
            <Avatar
              src=""
              name={user ? user.first_name + " " + user.last_name : "Anonymous"}
              handleClick={handleProfileClick}
              toolTipContent={
                user ? (
                  <Typography variant="h4">{user.email}</Typography>
                ) : (
                  <>Anonymous</>
                )
              }
            />
            {user && (
              <Popover
                PopoverContent={
                  <PopoverContent
                    user={user}
                    handleClose={handlePopoverClose}
                  />
                }
                handleClose={handlePopoverClose}
                anchorEl={anchorEl}
              />
            )}
          </Stack>
        </Stack>
      </Toolbar>
    </StyledAppBar>
  );
};

const PopoverContent = ({ user, handleClose }: PopoverContentProps) => (
  <>
    <Typography variant="h4">
      {user.first_name + " " + user.last_name}
    </Typography>
    <Typography variant="h5">{user.email}</Typography>
    <Button
      variant="contained"
      component={NavLink}
      to="/profile"
      onClick={handleClose}
    >
      View Profile
    </Button>
  </>
);
