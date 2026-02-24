import { Drawer, styled } from '@mui/material';

export const StyledDrawer = styled(Drawer)(({ theme }) => {
    const {
        componentWidth: { drawer },
    } = theme;
    return {
        '& .MuiPaper-root': {
            width: drawer,
        },
    };
});
