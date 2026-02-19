import { Button, Toolbar } from '@mui/material';

import { StyledAppBar } from './Header.styled';

export const Header = ({
    sidebarOpen,
    toggleSidebar,
}: {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
}) => (
    <StyledAppBar
        sx={(theme) => ({
            paddingLeft: sidebarOpen ? `${theme.componentWidth.drawer}px` : 0,
        })}
        elevation={1}
    >
        <Toolbar>
            <Button onClick={toggleSidebar} sx={{ color: 'black' }}>
                SB
            </Button>
        </Toolbar>
    </StyledAppBar>
);
