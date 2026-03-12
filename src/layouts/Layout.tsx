import { Outlet } from 'react-router-dom';

import { Box, Toolbar } from '@mui/material';

import { Header } from '@containers';

import { StyledMain } from './Layout.style';

export const Layout = () => (
    <Box>
        <StyledMain>
            <Header />
            <Toolbar />
            <Outlet />
        </StyledMain>
    </Box>
);
