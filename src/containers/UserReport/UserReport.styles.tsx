import { Box, styled } from '@mui/material';

export const HeaderContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
}));

export const TitleWrapper = styled(Box)({
    order: 1,
});

export const FilterWrapper = styled(Box)(({ theme }) => ({
    order: 3,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    [theme.breakpoints.up('lg')]: {
        order: 2,
        width: 'auto',
        flex: 1,
        justifyContent: 'flex-end',
        paddingRight: theme.spacing(2),
    },
}));

export const ActionWrapper = styled(Box)(({ theme }) => ({
    order: 2,
    [theme.breakpoints.up('lg')]: {
        order: 3,
    },
}));
