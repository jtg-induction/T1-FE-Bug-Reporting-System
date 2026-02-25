import { Outlet } from 'react-router-dom';
import { useGetMeQuery } from 'redux/apiSlice';

import { Box, Toolbar } from '@mui/material';

import { Header } from '@containers';

import { StyledMain } from './Layout.style';

export const Layout = () => {
    const {} = useGetMeQuery();
    return (
        <Box>
            <StyledMain>
                <Header />
                <Toolbar />
                <Outlet />
            </StyledMain>
        </Box>
    );
};
