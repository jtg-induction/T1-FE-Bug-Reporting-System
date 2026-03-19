import { Outlet } from 'react-router-dom';

import { Box, Toolbar } from '@mui/material';

import { Header } from '@containers';
import { useGetMeQuery } from '@service';

import { StyledMain } from './Layout.styles';

export const Layout = () => {
    useGetMeQuery();
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
