import { Stack, styled } from '@mui/material';

export const StyledStack = styled(Stack)(
    ({
        theme: {
            typography: { pxToRem },
            breakpoints,
        },
    }) => ({
        padding: `${pxToRem(16)} ${pxToRem(160)}`,
        [breakpoints.down('md')]: {
            padding: `${pxToRem(16)} ${pxToRem(24)}`,
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
