import { useState } from 'react';

import { PRIVATE_PATHS, PUBLIC_PATHS } from 'constant/paths';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from 'redux/features/authSlice';
import { useAppDispatch } from 'redux/store';

import { Box, Button, Divider,Stack, Toolbar, Typography } from '@mui/material';

import { Avatar } from '@components/Avatar';
import { Popover } from '@components/Popover';
import { PopoverContentProps } from '@components/Popover/Popover.props';
import { useGetMeQuery, useLogoutUserMutation } from '@service';

import { StyledAppBar } from './Header.styles';

export const Header = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const { data: user } = useGetMeQuery();
    const [logoutUser] = useLogoutUserMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await logoutUser();
        dispatch(logout());
        setAnchorEl(null);
        navigate(PUBLIC_PATHS.LOGIN);
    };

    const fullName = user ? `${user.first_name} ${user.last_name}` : 'Anonymous';

    return (
        <StyledAppBar elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
            <Toolbar>
                <Stack
                    width="100%"
                    alignItems="center"
                    justifyContent="space-between"
                    direction="row"
                >
                    <Box
                        component="img"
                        src="/logo.svg"
                        alt="LOGO"
                        onClick={void navigate(PRIVATE_PATHS.DASHBOARD)}
                        sx={{ 
                            height: 32, 
                            cursor: 'pointer',
                            transition: 'opacity 0.2s',
                            '&:hover': { opacity: 0.8 } 
                        }}
                    />
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar
                            src={""}
                            name={fullName}
                            handleClick={handleProfileClick}
                            toolTipContent={user?.email || 'Guest'}
                        />
                        {user && (
                            <Popover
                                anchorEl={anchorEl}
                                handleClose={handlePopoverClose}
                                PopoverContent={
                                    <PopoverContent
                                        user={user}
                                        handleClose={handlePopoverClose}
                                        handleLogout={handleLogout}
                                    />
                                }
                            />
                        )}
                    </Stack>
                </Stack>
            </Toolbar>
        </StyledAppBar>
    );
};

/**
 * Internal content for the user profile popover.
 * Enhanced with better typography and action hierarchy.
 */
const PopoverContent = ({
    user,
    handleClose,
    handleLogout,
}: PopoverContentProps) => (
    <Stack sx={{ p: 2, minWidth: 240 }}>
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="600" lineHeight={1.2}>
                {`${user.first_name} ${user.last_name}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {user.email}
            </Typography>
        </Box>
        
        <Divider sx={{ my: 1.5 }} />

        <Stack gap={1}>
            <Button
                fullWidth
                variant="contained"
                disableElevation
                component={NavLink}
                to={`${PRIVATE_PATHS.PROFILE}/${user.id}`}
                onClick={handleClose}
                sx={{ textTransform: 'none' }}
            >
                View Profile
            </Button>
            <Button 
                fullWidth
                variant="outlined" 
                color="error"
                onClick={void handleLogout()}
                sx={{ textTransform: 'none' }}
            >
                Logout
            </Button>
        </Stack>
    </Stack>
);