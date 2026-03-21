import { Stack, styled } from '@mui/material';

export const StyledStack = styled(Stack)(
    ({ theme: { breakpoints, spacing } }) => ({
        padding: spacing(4, 40),
        [breakpoints.down('md')]: {
            padding: spacing(4, 6),
        },
    }),
);

export const GridContainer = styled('div')(
    ({
        theme: {
            typography: { pxToRem },
            breakpoints,
        },
    }) => ({
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        gap: pxToRem(56),
        width: '100%',
        [breakpoints.up('lg')]: {
            gridTemplateColumns: 'repeat(2, 1fr)',
        },
    }),
);
