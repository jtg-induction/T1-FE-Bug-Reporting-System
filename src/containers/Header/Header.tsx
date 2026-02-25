import { useState } from 'react';

import { publicPaths } from 'constant/paths';
import { NavLink, useNavigate } from 'react-router-dom';
import { useGetMeQuery, useLogoutUserMutation } from 'redux/apiSlice';
import { logout } from 'redux/features/authSlice';
import { useAppDispatch } from 'redux/store';

import { Box, Button, Stack, Toolbar, Typography } from '@mui/material';

import { Avatar } from '@components/Avatar';
import { Popover } from '@components/Popover';
import { PopoverContentProps } from '@components/Popover/Popover.props';

import { StyledAppBar } from './Header.styles';

export const Header = () => {
    const { data: user } = useGetMeQuery();
    const [logoutUser] = useLogoutUserMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await logoutUser();
        dispatch(logout());
        setAnchorEl(null);
        navigate(publicPaths.login);
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
                    <Box
                        component="img"
                        src=""
                        alt="LOGO"
                        onClick={() => void navigate('/')}
                    />
                    <Stack>
                        <Avatar
                            src=""
                            name={
                                user
                                    ? user.first_name + ' ' + user.last_name
                                    : 'Anonymous'
                            }
                            handleClick={handleProfileClick}
                            toolTipContent={
                                user ? (
                                    <Typography variant="h4">
                                        {user.email}
                                    </Typography>
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
                                        handleLogout={handleLogout}
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

const PopoverContent = ({
    user,
    handleClose,
    handleLogout,
}: PopoverContentProps) => (
    <Stack gap={4}>
        <Typography variant="h4">
            {user.first_name + ' ' + user.last_name}
        </Typography>
        <Typography variant="h5">{user.email}</Typography>
        <Stack
            direction={{ xs: 'column', md: 'row' }}
            gap={2}
            justifyContent="space-between"
        >
            <Button
                variant="contained"
                component={NavLink}
                to={`/profile/${user.id}`}
                onClick={handleClose}
            >
                View Profile
            </Button>
            <Button variant="contained" onClick={(e) => void handleLogout?.(e)}>
                Logout
            </Button>
        </Stack>
    </Stack>
);
