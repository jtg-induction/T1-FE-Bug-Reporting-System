import { useState } from 'react';

import { Outlet } from 'react-router-dom';

import { Box, Toolbar } from '@mui/material';

import { Header, Sidebar } from '@containers';

import { StyledMain } from './Layout.style';

export const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <Box>
            <Sidebar open={sidebarOpen} />
            <StyledMain
                sx={(theme) => ({
                    marginLeft: sidebarOpen
                        ? `${theme.componentWidth.drawer}px`
                        : 0,
                })}
            >
                <Header
                    sidebarOpen={sidebarOpen}
                    toggleSidebar={toggleSidebar}
                />
                <Toolbar />
                <Outlet />
            </StyledMain>
        </Box>
    );
};
