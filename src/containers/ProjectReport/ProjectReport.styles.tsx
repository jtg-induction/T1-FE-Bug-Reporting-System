import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StatsGrid = styled('div')(
    ({
        theme: {
            typography: { pxToRem },
            breakpoints,
        },
    }) => ({
        display: 'grid',
        width: '100%',
        gridTemplateColumns: 'repeat(1, 1fr)',
        gap: pxToRem(24),
        [breakpoints.up('md')]: {
            gridTemplateColumns: 'repeat(2, 1fr)',
        },

        [breakpoints.up('xl')]: {
            gridTemplateColumns: 'repeat(4, 1fr)',
        },
    }),
);

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
