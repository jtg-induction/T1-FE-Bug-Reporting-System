import { Outlet } from 'react-router-dom';
import { hideSnackbar } from 'redux/features/profileSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';

import { Box, Toolbar } from '@mui/material';

import { Snackbar } from '@components';
import { Header } from '@containers';
import { useGetMeQuery } from '@service';

import { StyledMain } from './Layout.styles';

export const Layout = () => {
    useGetMeQuery();
    const dispatch = useAppDispatch();
    const snackbar = useAppSelector((state) => state.profile.snackbar);
    return (
        <Box>
            <StyledMain>
                <Header />
                <Toolbar />
                <Outlet />
            </StyledMain>
            <Snackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                actionLabel={snackbar.actionLabel}
                actionUrl={snackbar.actionUrl}
                onClose={() => dispatch(hideSnackbar())}
            />
        </Box>
    );
};
