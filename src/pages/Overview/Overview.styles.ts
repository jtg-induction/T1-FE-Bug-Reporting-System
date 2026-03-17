import { Box, styled } from '@mui/material';

export const StyledOverview = styled(Box)(({ theme }) => {
    const { spacing, breakpoints } = theme;

    return {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        overflowY: 'scroll',
        scrollbarWidth: 'none',
        padding: `${spacing(0)} ${spacing(4)} ${spacing(8)}`,
        [breakpoints.up('md')]: {
            padding: `${spacing(0)} ${spacing(8)} ${spacing(8)}`,
        },
        gap: spacing(8),
    };
});

export const StyledCustomerProductSection = styled(Box)(({ theme }) => {
    const {
        typography: { pxToRem },
        breakpoints,
    } = theme;
    return {
        width: '100%',
        display: 'flex',
        gap: pxToRem(30),
        flexDirection: 'column',

        [breakpoints.up('lg')]: {
            flexDirection: 'row',
        },
    };
});
