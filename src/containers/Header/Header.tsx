import { useState } from 'react';

import { PRIVATE_PATHS, PUBLIC_PATHS } from 'constant/paths';
import { useNavigate } from 'react-router-dom';
import { logout } from 'redux/features/authSlice';
import { useAppDispatch } from 'redux/store';

import { Box, Stack, Toolbar } from '@mui/material';

import Logo from '@assets/images/logo-detail.png';
import { Avatar } from '@components/Avatar';
import { Popover } from '@components/Popover';
import { UserMenu } from '@containers/UserMenu';
import { useGetMeQuery, useLogoutUserMutation } from '@service';
import { baseApi } from '@service';

import { StyledAppBar } from './Header.styles';

export const Header = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

    const { data: response } = useGetMeQuery();
    const user = response?.data;
    const [logoutUser] = useLogoutUserMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleProfileClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await logoutUser();
        dispatch(logout());
        dispatch(baseApi.util.resetApiState());
        setAnchorEl(null);
        navigate(PUBLIC_PATHS.LOGIN);
    };

    const fullName = user
        ? `${user.first_name} ${user.last_name}`
        : 'Anonymous';

    return (
        <StyledAppBar
            elevation={0}
            sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
        >
            <Toolbar>
                <Stack
                    width="100%"
                    alignItems="center"
                    justifyContent="space-between"
                    direction="row"
                >
                    <Box
                        component="img"
                        src={Logo}
                        alt="Redirect to Dashboard"
                        onClick={() => void navigate(PRIVATE_PATHS.DASHBOARD)}
                        sx={{
                            height: 32,
                            cursor: 'pointer',
                            transition: 'opacity 0.2s',
                            '&:hover': { opacity: 0.8 },
                        }}
                    />
                    {user && (
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar
                                name={fullName}
                                handleClick={handleProfileClick}
                                toolTipContent={user.email || 'Guest'}
                            />

                            <Popover
                                anchorEl={anchorEl}
                                handleClose={handlePopoverClose}
                                PopoverContent={
                                    <UserMenu
                                        user={user}
                                        handleClose={handlePopoverClose}
                                        handleLogout={handleLogout}
                                    />
                                }
                            />
                        </Stack>
                    )}
                </Stack>
            </Toolbar>
        </StyledAppBar>
    );
};
