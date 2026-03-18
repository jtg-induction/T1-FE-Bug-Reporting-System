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
